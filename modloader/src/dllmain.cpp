#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <MinHook.h>   // from vcpkg
#include <stdint.h>

// --- Helpers --------------------------------------------------------------
static void Log(const char* s) { OutputDebugStringA(s); }

// Hook TextOutA to prove the loader + MinHook works. See in DebugView or a log.

typedef BOOL (WINAPI *TextOutA_t)(HDC, int, int, LPCSTR, int);
static TextOutA_t  s_TextOutA_Orig = nullptr;

static BOOL WINAPI TextOutA_Detour(HDC hdc, int x, int y, LPCSTR str, int cch)
{
    Log("[asi] TextOutA hooked\n");
    return s_TextOutA_Orig(hdc, x, y, str, cch);
}

// --- RVA HOOKS ------------------------------------------------------------
// The game exe is fixed and not compiled with /DYNAMICBASE, so
// you can compute the absolute address as base + (RVA - ImageBase).
// Assume __thiscall: ecx = this. In MSVC, implement detour as __fastcall
// so ecx becomes first param (and edx is second).

static const uintptr_t kIDA_IMAGEBASE = 0x400000;
static const uintptr_t kCalcTextDims_RVA = 0x49A070;

typedef void (__thiscall *CalcTextDims_t)(void* self, void* dimsOut, const char* text);
// In MSVC 32-bit, declare detour as __fastcall to receive ECX in 'self'
static CalcTextDims_t s_CalcTextDims_Orig = nullptr;

static void __fastcall CalcTextDims_Detour(void* self, void* /*edx*/, void* dimsOut, const char* text)
{
    // Mimic your Frida logic: tweak this[9] (base_width) to 8 while we run, then restore.
    int* pMonospaceWidth  = reinterpret_cast<int*>((uint8_t*)self + 9 * 4);
    int currentWidth = *pMonospaceWidth ;

    int  saved     = *pMonospaceWidth ;
    if (saved > 0 && saved < 100 && saved != 8) {
        *pMonospaceWidth  = 8;
    }

    s_CalcTextDims_Orig(self, dimsOut, text);

    // Don't restore the value to keep the changes. Tested working.
    /* if (saved > 0 && saved < 100 && saved != 8) {
        *pMonospaceWidth  = saved;
    } */
}

// --- Init/Shutdown --------------------------------------------------------
static void CreateHooks()
{
    if (MH_Initialize() != MH_OK) {
        Log("[asi] MH_Initialize failed\n");
        return;
    }
    // 1) Hook GDI32!TextOutA for proof-of-life
    HMODULE gdi = GetModuleHandleA("gdi32.dll");
    if (gdi) {
        auto pTextOutA = reinterpret_cast<LPVOID>(GetProcAddress(gdi, "TextOutA"));
        if (pTextOutA && MH_CreateHook(pTextOutA, TextOutA_Detour, reinterpret_cast<LPVOID*>(&s_TextOutA_Orig)) == MH_OK) {
            MH_EnableHook(pTextOutA);
        }
    }

    // 2) Hook game RVA (kCalcTextDims_RVA) if module is loaded
    HMODULE hGame = GetModuleHandleA("Game_v1020.exe");
    if (hGame) {
        auto base = reinterpret_cast<uintptr_t>(hGame);
        auto target = reinterpret_cast<LPVOID>(base + (kCalcTextDims_RVA - kIDA_IMAGEBASE));
        if (MH_CreateHook(target, CalcTextDims_Detour, reinterpret_cast<LPVOID*>(&s_CalcTextDims_Orig)) == MH_OK) {
            MH_EnableHook(target);
            Log("[asi] CalcTextDims hook enabled\n");
        } else {
            Log("[asi] CalcTextDims MH_CreateHook failed\n");
        }
    } else {
        Log("[asi] Game module not found yet (load-order). Consider delayed init.\n");
    }
}

static void RemoveHooks()
{
    MH_DisableHook(MH_ALL_HOOKS);
    MH_Uninitialize();
}

BOOL APIENTRY DllMain(HINSTANCE hInst, DWORD reason, LPVOID)
{
    if (reason == DLL_PROCESS_ATTACH) {
        DisableThreadLibraryCalls(hInst);
        CreateHooks();
    } else if (reason == DLL_PROCESS_DETACH) {
        RemoveHooks();
    }
    return TRUE;
}

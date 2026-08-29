#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <d3d9.h>
#include <stdio.h>

static const char *kClassName = "ActionEditor4";
static HANDLE gReport = INVALID_HANDLE_VALUE;
static IDirect3D9 *gD3d = 0;
static IDirect3DDevice9 *gDevice = 0;
static D3DPRESENT_PARAMETERS gPresent;

static void LogLine(const char *text)
{
    if (gReport == INVALID_HANDLE_VALUE) return;
    DWORD wrote = 0;
    WriteFile(gReport, text, lstrlenA(text), &wrote, 0);
    WriteFile(gReport, "\r\n", 2, &wrote, 0);
}

static void LogFmt(const char *fmt, DWORD a, DWORD b)
{
    char line[256];
    wsprintfA(line, fmt, a, b);
    LogLine(line);
}

static void ReleaseD3d()
{
    if (gDevice) {
        gDevice->Release();
        gDevice = 0;
    }
    if (gD3d) {
        gD3d->Release();
        gD3d = 0;
    }
}

static HRESULT InitD3d(HWND hwnd)
{
    ZeroMemory(&gPresent, sizeof(gPresent));
    gPresent.BackBufferWidth = 640;
    gPresent.BackBufferHeight = 480;
    gPresent.BackBufferFormat = D3DFMT_X8R8G8B8;
    gPresent.BackBufferCount = 1;
    gPresent.MultiSampleType = D3DMULTISAMPLE_NONE;
    gPresent.SwapEffect = D3DSWAPEFFECT_DISCARD;
    gPresent.hDeviceWindow = hwnd;
    gPresent.Windowed = TRUE;
    gPresent.EnableAutoDepthStencil = FALSE;
    gPresent.PresentationInterval = D3DPRESENT_INTERVAL_IMMEDIATE;

    gD3d = Direct3DCreate9(D3D_SDK_VERSION);
    if (!gD3d) {
        LogLine("Direct3DCreate9 failed");
        return E_FAIL;
    }

    D3DDISPLAYMODE mode;
    ZeroMemory(&mode, sizeof(mode));
    HRESULT hr = gD3d->GetAdapterDisplayMode(D3DADAPTER_DEFAULT, &mode);
    LogFmt("GetAdapterDisplayMode hr=0x%08X fmt=0x%08X", (DWORD)hr, (DWORD)mode.Format);

    hr = gD3d->CreateDevice(
        D3DADAPTER_DEFAULT,
        D3DDEVTYPE_HAL,
        hwnd,
        D3DCREATE_SOFTWARE_VERTEXPROCESSING,
        &gPresent,
        &gDevice);
    LogFmt("CreateDevice HAL/SWVP hr=0x%08X device=0x%08X", (DWORD)hr, (DWORD)gDevice);

    if (FAILED(hr)) {
        hr = gD3d->CreateDevice(
            D3DADAPTER_DEFAULT,
            D3DDEVTYPE_REF,
            hwnd,
            D3DCREATE_SOFTWARE_VERTEXPROCESSING,
            &gPresent,
            &gDevice);
        LogFmt("CreateDevice REF/SWVP hr=0x%08X device=0x%08X", (DWORD)hr, (DWORD)gDevice);
    }

    return hr;
}

static void RenderFrame()
{
    if (!gDevice) return;

    HRESULT hr = gDevice->TestCooperativeLevel();
    if (hr == D3DERR_DEVICELOST) {
        Sleep(10);
        return;
    }
    if (hr == D3DERR_DEVICENOTRESET) {
        hr = gDevice->Reset(&gPresent);
        LogFmt("Reset hr=0x%08X unused=0x%08X", (DWORD)hr, 0);
        if (FAILED(hr)) return;
    }

    gDevice->Clear(0, 0, D3DCLEAR_TARGET, D3DCOLOR_XRGB(24, 40, 64), 1.0f, 0);
    if (SUCCEEDED(gDevice->BeginScene())) {
        gDevice->EndScene();
    }
    gDevice->Present(0, 0, 0, 0);
}

static LRESULT CALLBACK ProbeWndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp)
{
    if (msg == WM_CLOSE || msg == WM_DESTROY) {
        PostQuitMessage(0);
        return 0;
    }
    if (msg == WM_SIZE && gDevice && wp != SIZE_MINIMIZED) {
        RenderFrame();
        return 0;
    }
    return DefWindowProcA(hwnd, msg, wp, lp);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE, LPSTR lpCmdLine, int nShowCmd)
{
    gReport = CreateFileA(
        "work_aquedi\\outputs\\winmain_probe_report.txt",
        GENERIC_WRITE,
        FILE_SHARE_READ,
        0,
        CREATE_ALWAYS,
        FILE_ATTRIBUTE_NORMAL,
        0);

    LogLine("App : winmain_probe d3d9");
    LogFmt("nShowCmd=%lu lpCmdLine_ptr=0x%08X", (DWORD)nShowCmd, (DWORD)lpCmdLine);

    HANDLE mutex = CreateMutexA(0, FALSE, "ActionEditor4ProbeMutex");
    if (!mutex) {
        LogLine("CreateMutexA failed");
        if (gReport != INVALID_HANDLE_VALUE) CloseHandle(gReport);
        return 0;
    }

    WNDCLASSEXA wc;
    ZeroMemory(&wc, sizeof(wc));
    wc.cbSize = sizeof(wc);
    wc.style = CS_HREDRAW | CS_VREDRAW | CS_DBLCLKS;
    wc.lpfnWndProc = ProbeWndProc;
    wc.hInstance = hInstance;
    wc.hCursor = LoadCursorA(0, IDC_ARROW);
    wc.hIcon = LoadIconA(0, IDI_APPLICATION);
    wc.hIconSm = wc.hIcon;
    wc.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);
    wc.lpszClassName = kClassName;

    if (!RegisterClassExA(&wc)) {
        LogFmt("RegisterClassExA failed err=%lu unused=%lu", GetLastError(), 0);
        CloseHandle(mutex);
        if (gReport != INVALID_HANDLE_VALUE) CloseHandle(gReport);
        return 0;
    }

    HWND hwnd = CreateWindowExA(
        0,
        kClassName,
        "ActionEditor4",
        WS_OVERLAPPEDWINDOW,
        100,
        100,
        640,
        480,
        0,
        0,
        hInstance,
        0);

    if (!hwnd) {
        LogFmt("CreateWindowExA failed err=%lu unused=%lu", GetLastError(), 0);
        CloseHandle(mutex);
        if (gReport != INVALID_HANDLE_VALUE) CloseHandle(gReport);
        return 0;
    }

    HRESULT hr = InitD3d(hwnd);
    if (FAILED(hr)) {
        ReleaseD3d();
        CloseHandle(mutex);
        if (gReport != INVALID_HANDLE_VALUE) CloseHandle(gReport);
        return 0;
    }

    ShowWindow(hwnd, nShowCmd);
    UpdateWindow(hwnd);

    MSG msg;
    ZeroMemory(&msg, sizeof(msg));
    while (msg.message != WM_QUIT) {
        while (PeekMessageA(&msg, 0, 0, 0, PM_REMOVE)) {
            if (msg.message == WM_QUIT) break;
            TranslateMessage(&msg);
            DispatchMessageA(&msg);
            Sleep(1);
        }
        if (msg.message == WM_QUIT) break;
        RenderFrame();
        Sleep(1);
    }

    ReleaseD3d();
    ReleaseMutex(mutex);
    CloseHandle(mutex);
    LogFmt("exit wParam=%lu unused=%lu", (DWORD)msg.wParam, 0);
    if (gReport != INVALID_HANDLE_VALUE) CloseHandle(gReport);
    return (int)msg.wParam;
}

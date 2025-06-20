int __stdcall WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd)
{
    DWORD processId;
    WNDCLASSEXA windowClass;
    MSG message;
    CHAR reportFilePath[260];

    // Initialize the application log
    InitializeLog(0, "ec_game.txt");

    // Set up the report file
    strcpy(reportFilePath, "Report_Game.txt");
    memset(&reportFilePath[16], 0, 0xF4u);
    SanitizePath(reportFilePath);

    // Ensure report file is accessible
    if (!VerifyFileAccess(reportFilePath))
        return 0;

    // Set application version
    SetApplicationVersion("AppVer: ", "1020");

    // Perform initial setup
    ApplicationSetup();

    // Handle command-line parameters
    globalFlag = (nShowCmd == SW_SHOW);
    if (lpCmdLine && lstrcmpA(lpCmdLine, reportFilePath))
    {
        unsigned int cmdLineLength = strlen(lpCmdLine) + 1;
        unsigned int bufferSize = cmdLineLength - 1;

        if (bufferSize > 0xFFFFFFFD)
            std::_Xlen();

        void *cmdBuffer = (void *)globalCommandBuffer;
        if (globalCommandBuffer && *(BYTE *)(globalCommandBuffer - 1) != 0 && *(BYTE *)(globalCommandBuffer - 1) != -1)
        {
            if (cmdLineLength == 1)
            {
                *(BYTE *)(globalCommandBuffer - 1) -= 1;
                std::string::_Tidy(0);
            }
        }
        else
        {
            if (cmdLineLength == 1)
            {
                std::string::_Tidy(1);
            }
            else if ((unsigned int)globalCommandBufferSize <= 0x1F && globalCommandBufferSize >= bufferSize)
            {
                // Valid buffer size, proceed
            }
            else
            {
                std::string::_Tidy(1);
            }

            AllocateCStringBuffer((int)&globalCommandObject, bufferSize);
            cmdBuffer = (void *)globalCommandBuffer;
        }

        memcpy(cmdBuffer, lpCmdLine, bufferSize);
        globalCommandSize = bufferSize;
        *((BYTE *)(globalCommandBuffer + bufferSize)) = 0;
    }

    // Ensure only one instance of the application is running
    HANDLE mutexHandle = CreateMutexA(0, 0, "AppMutex");
    if (GetLastError() == ERROR_ALREADY_EXISTS)
    {
        if (MessageBoxA(0, "Application is already running.", "Error", MB_ICONWARNING | MB_YESNO) == IDNO)
        {
            ReleaseMutex(mutexHandle);
            CloseHandle(mutexHandle);
            return 0;
        }

        HWND existingWindow = FindWindowA("ActionEditor", 0);
        if (existingWindow)
        {
            GetWindowThreadProcessId(existingWindow, &processId);
            HANDLE existingProcess = OpenProcess(PROCESS_TERMINATE, FALSE, processId);
            if (existingProcess)
            {
                TerminateProcess(existingProcess, 0);
                WaitForSingleObject(existingProcess, 500);
                CloseHandle(existingProcess);
            }
            else
            {
                MessageBoxA(0, "Failed to terminate the existing instance.", "Error", MB_OK);
                ReleaseMutex(mutexHandle);
                CloseHandle(mutexHandle);
                return 0;
            }
        }
    }

    // Register window class
    windowClass.cbSize = sizeof(WNDCLASSEXA);
    windowClass.hInstance = hInstance;
    windowClass.lpszClassName = "ActionEditor";
    windowClass.lpfnWndProc = (WNDPROC)WindowProcedure;
    windowClass.style = CS_HREDRAW | CS_VREDRAW;
    windowClass.lpszMenuName = NULL;
    windowClass.hCursor = LoadCursorA(0, IDC_ARROW);
    windowClass.hIcon = LoadIconA(hInstance, MAKEINTRESOURCE(101));
    windowClass.hIconSm = LoadIconA(hInstance, MAKEINTRESOURCE(101));
    windowClass.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);
    windowClass.cbClsExtra = 0;
    windowClass.cbWndExtra = 0;

    if (!RegisterClassExA(&windowClass))
    {
        ReleaseMutex(mutexHandle);
        CloseHandle(mutexHandle);
        return 0;
    }

    // Initialize graphics and create main application window
    InitializeGraphics(640, 480, 100, 100, 640, 480, WS_OVERLAPPEDWINDOW, 0, 0, 0, 0, 0);
    mainWindowHandle = CreateWindowExA(0, "ActionEditor", "Game Window", WS_OVERLAPPEDWINDOW, 
                                       100, 100, 640, 480, 0, 0, hInstance, 0);
    
    if (mainWindowHandle)
    {
        SetupApplication(&appContext);
        if (globalFlag)
            PerformSpecialInitialization(&appContext);

        if (!InitializeApplication(lpCmdLine, nShowCmd))
        {
            CleanupResources();
            if (globalFlag)
                PerformShutdownTasks(0);
            ReleaseMutex(mutexHandle);
            CloseHandle(mutexHandle);
            return 0;
        }

        globalRunningFlag = 1;
        SetupMessageHandling(mainMessageHandler, WindowProcedure, 0);

        while (!PostThreadMessageA(mainMessageHandler[0], WM_APP, 0, 0));

        while (1)
        {
            while (PeekMessageA(&message, 0, 0, 0, PM_REMOVE))
            {
                if (message.message == WM_QUIT)
                    goto ExitProgram;
                
                TranslateMessage(&message);
                DispatchMessageA(&message);
                Sleep(1);
            }

            if (shouldExitApplication)
                break;

            WaitMessage();
            Sleep(1);
        }

        PostMessageA(mainWindowHandle, WM_CLOSE, 0, 0);
    }
    else
    {
        ShowErrorMessage("Failed to create main window.");
        ReleaseMutex(mutexHandle);
        CloseHandle(mutexHandle);
        return 0;
    }

ExitProgram:
    CleanupResources();
    ReleaseMutex(mutexHandle);
    CloseHandle(mutexHandle);
    return message.wParam;
}

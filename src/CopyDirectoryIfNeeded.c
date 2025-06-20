BOOL __cdecl CopyDirectoryIfNeeded(HWND hWnd)
{
    const CHAR *sourcePath; 
    const CHAR *destinationPath; 
    BOOL result; 
    const CHAR *tempSource;
    const CHAR *tempDestination;
    _SHFILEOPSTRUCTA fileOperation; 
    CHAR sourceBuffer[260]; 
    CHAR destinationBuffer[260]; 

    // Determine the source path
    if (g_useAlternateSource) 
    {
        sourcePath = (const CHAR *)g_alternateSourcePath;
        if (!g_alternateSourcePath)
            sourcePath = g_defaultPath;
    }
    else
    {
        sourcePath = &g_mainSourcePath;
    }

    // Check if the source path is a directory
    if (PathIsDirectoryA(sourcePath))
        return TRUE;

    // Determine the destination path
    if (g_useAlternateDestination) 
    {
        destinationPath = (const CHAR *)g_alternateDestinationPath;
        if (!g_alternateDestinationPath)
            destinationPath = g_defaultPath;
    }
    else
    {
        destinationPath = &g_mainDestinationPath;
    }

    result = PathIsDirectoryA(destinationPath);
    if (result)
    {
        // Prompt the user for confirmation
        if (MessageBoxA(hWnd, g_confirmationMessage, g_titleMessage, MB_YESNO | MB_ICONQUESTION) == IDNO)
            return FALSE;

        // Prepare source path for the copy operation
        if (g_useAlternateDestination) 
        {
            tempSource = (const CHAR *)g_alternateDestinationPath;
            if (!g_alternateDestinationPath)
                tempSource = g_defaultPath;
        }
        else
        {
            tempSource = &g_mainDestinationPath;
        }

        lstrcpyA(sourceBuffer, tempSource);
        SanitizePath(sourceBuffer); // Hypothetical function for path cleanup
        sourceBuffer[lstrlenA(sourceBuffer) - 1] = 0;

        // Prepare destination path for the copy operation
        if (g_useAlternateSource) 
        {
            tempDestination = (const CHAR *)g_alternateSourcePath;
            if (!g_alternateSourcePath)
                tempDestination = g_defaultPath;
        }
        else
        {
            tempDestination = &g_mainSourcePath;
        }

        lstrcpyA(destinationBuffer, tempDestination);
        SanitizePath(destinationBuffer); 

        // Setup the file operation structure
        memset(&fileOperation, 0, sizeof(fileOperation));
        fileOperation.hwnd = hWnd;
        fileOperation.wFunc = FO_COPY; // Copy operation
        fileOperation.pFrom = sourceBuffer;
        fileOperation.pTo = destinationBuffer;
        fileOperation.fFlags = FOF_NOCONFIRMATION | FOF_NOERRORUI; 

        // Perform the copy operation
        if (SHFileOperationA(&fileOperation))
        {
            HandleCopyFailure(destinationBuffer); // Hypothetical error handling function
            return FALSE;
        }

        return TRUE;
    }

    return result;
}

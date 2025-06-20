int __cdecl CheckAndSaveFilePath(LPCSTR lpString2)
{
    int result;
    FILE *file;

    // Attempt to open the file in write mode ("wt" means write text)
    result = (int)fopen(lpString2, "wt");
    file = (FILE *)result;

    if (file)
    {
        // If successful, copy the file path to a global buffer
        lstrcpyA(byte_5B9A48, lpString2);

        // Close the file after successfully opening it
        fclose(file);
        return 1;  // Return success
    }

    // Return 0 (or the result, which would be NULL) if file open fails
    return result;
}

int __cdecl AppendFormattedTextToFile(char *Format, ...)
{
    int result;
    FILE *file;
    va_list args;

    va_start(args, Format);  // Initialize variable argument list

    // Open the file stored in byte_5B9A48 in read/write mode ("rt")
    result = (int)fopen(byte_5B9A48, "rt");
    file = (FILE *)result;

    if (file)
    {
        // Move the file pointer to the end of the file
        fseek(file, 0, SEEK_END);

        // Write the formatted text to the file
        vfprintf(file, Format, args);

        // Add a newline character at the end
        fprintf(file, "\n");

        // Close the file
        fclose(file);
        return 1;  // Success
    }

    return result;  // Failure
}

int __cdecl LogSystemInfoToFile()
{
    FILE *file;
    int screenWidth, screenHeight, diskFree;
    MEMORYSTATUS memStatus;
    int screenSaverTimeout;
    char osInfo[256], cpuName[256], cpuDetails[280];
    double cpuSpeed; // in MHz

    file = fopen(byte_5B9A48, "rt");  // Open log file in read/write mode
    if (!file)
        return 0;

    fseek(file, 0, SEEK_END);  // Move to end of file

    // Get and log OS information
    GetOSInfo(osInfo, 0, 0);
    fprintf(file, "OS : %s\n", osInfo);

    // Get and log CPU information
    GetCPUInfo(cpuName, cpuDetails, &cpuSpeed);
    fprintf(file, "CPU : %s %s %d MHz\n", cpuDetails, cpuName, (unsigned int)(cpuSpeed * 0.000001));

    // Get and log memory status
    GlobalMemoryStatus(&memStatus);
    fprintf(file, "Mem Total : %.3f MB\n", (double)memStatus.dwTotalPhys / (1024 * 1024));
    fprintf(file, "Mem Free : %.3f MB\n", (double)memStatus.dwAvailPhys / (1024 * 1024));
    fprintf(file, "Vir Total : %.3f MB\n", (double)memStatus.dwTotalVirtual / (1024 * 1024));
    fprintf(file, "Vir Free : %.3f MB\n", (double)memStatus.dwAvailVirtual / (1024 * 1024));

    // Get and log hard disk free space
    diskFree = GetDiskFreeSpaceMB(0);
    fprintf(file, "HD Free : %.3f MB\n", (double)diskFree);

    // Get and log display resolution
    screenHeight = GetSystemMetrics(SM_CYSCREEN);
    screenWidth = GetSystemMetrics(SM_CXSCREEN);
    fprintf(file, "Display : (%d,%d)\n", screenWidth, screenHeight);

    // Get and log system font information
    SystemParametersInfoA(SPI_GETSCREENSAVETIMEOUT, 0, &screenSaverTimeout, 0);
    LogSystemFont(file);

    fclose(file);  // Close the file
    return 1;
}

int InitializeResources(char a1) {
  // Initialize resource management
  ClearResourceState(&v151);
  v155 = 0;

  // Check if the resource count is within bounds
  if (GetResourceCount(&unk_5A12F8) >= 40) {
    if (GetResourceCount(&unk_5A12F8) > 40) {
      ResizeResourceBuffer(dword_5A12FC + 640, dword_5A1300);
    }
  } else {
    int resourceCount = GetResourceCount(&unk_5A12F8);
    AllocateResource(dword_5A1300, 40 - resourceCount, v152);
  }

  v155 = -1;
  DeallocateResource(v152);

  // Initialize resource groups
  ClearResourceState(v154);
  v155 = 1;

  if (GetResourceCount(&unk_5A12F8)) {
    InitializeResource(0);
  } else {
    ClearResourceState(v152);
    v155 = 2;
    GetResourceCount(&unk_5A12F8);
    PrepareErrorMessage((int)v152, "Resource error", 0);
    char* errorMsg = FormatErrorMessage(v152);
    LogError(errorMsg);
    DisplayError(errorMsg, v150);
    SendSystemMessage(hWnd, WM_CLOSE, 0, 0);
    InitializeResource(0);
    v155 = 1;
    std::string::_Tidy(1);
  }

  // Continue initializing resources...
  if (GetResourceCount(&unk_5A12F8) <= 1) {
    ClearResourceState(v152);
    v155 = 3;
    GetResourceCount(&unk_5A12F8);
    PrepareErrorMessage((int)v152, "Resource error", 1);
    char* errorMsg = FormatErrorMessage(v152);
    LogError(errorMsg);
    DisplayError(errorMsg, v150);
    SendSystemMessage(hWnd, WM_CLOSE, 0, 0);
    InitializeResource(0);
    v155 = 1;
    std::string::_Tidy(1);
  } else {
    InitializeResource(1);
  }

  // Set resource properties
  SetResourceProperty(&unk_58BB40, -16383, 0x3FFF);
  SetResourceProperty(&unk_58BB34, -640, 640);
  SetResourceProperty(&unk_58BB2C, -16383, 0x3FFF);
  SetResourceProperty(&unk_58BB20, -640, 640);
  SetResourceProperty(&unk_58BB18, -7200, 7200);
  SetResourceProperty(&unk_58BB00, -7200, 7200);

  // Configure resources
  ConfigureResource(v100, 0);
  SetResourceRange(&unk_58BA58, 0, 7);
  ConfigureResource(v100, 1);
  SetResourceRange(&unk_58BA40, 0, 0x7FFFFFFF);
  ConfigureResource(v100, 2);
  SetResourceRange(&unk_58BA28, 0, 0x7FFFFFFF);
  ConfigureResource(v100, 3);
  SetResourceRange(&unk_58BA10, 0, 0x7FFFFFFF);
  ConfigureResource(v100, 4);
  SetResourceRange(&unk_58BA08, 1, 127);

  // Finalize initialization
  v155 = -1;
  return std::string::_Tidy(1);
}
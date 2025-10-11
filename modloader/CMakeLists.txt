cmake_minimum_required(VERSION 3.20)
project(asi_minhook_test LANGUAGES CXX)

# Build a 32-bit DLL
set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)
add_library(asi_minhook_test SHARED
    src/dllmain.cpp
)

# vcpkg provides this config package + target:
find_package(minhook CONFIG REQUIRED)
target_link_libraries(asi_minhook_test PRIVATE minhook::minhook)

target_compile_definitions(asi_minhook_test PRIVATE UNICODE _UNICODE)
target_compile_features(asi_minhook_test PRIVATE cxx_std_17)

var moduleName = "Game_v1020.exe";
var functionOffset = 0x552461;  // size_t __cdecl SafeFileRead(void *Buffer, size_t ElementSize, size_t ElementCount, FILE *Stream)
const IDA_OFFSET = 0x400000;

var readDatFileOffset = 0x4F7FC0;

var baseAddr = Module.findBaseAddress(moduleName);

if (baseAddr === null) {
    console.log("[!] Failed to find module base for " + moduleName);
} else {
    var functionAddr = baseAddr.add(functionOffset - IDA_OFFSET);
    console.log("[+] Hooking SafeFileRead at: " + functionAddr);
    
    Interceptor.attach(functionAddr, {
        onEnter: function (args) {
            // Extract the arguments
            var buffer = args[0];
            var elementSize = args[1].toInt32();
            var elementCount = args[2].toInt32();
            var stream = args[3];

            var getFdNamePtr = Module.findExportByName(null, "GetFinalPathNameByHandleA"); // Windows API
            var getFdName = new NativeFunction(getFdNamePtr, 'int', ['pointer', 'pointer', 'int', 'int']);

            var fileName = "TEST";
           

            // Resolve the file name from the FILE* pointer
            // var fileNamePtr = stream.add(0x10).readPointer(); // Adjust offset if necessary
            // var fileName = fileNamePtr.readCString();
         
            console.log("[*] SafeFileRead called!");
            console.log("    File Name: " + fileName);
            // console.log("    Buffer: " + buffer);
            console.log("    ElementSize: " + elementSize);
            console.log("    ElementCount: " + elementCount);
            console.log("    Stream (FILE*): " + stream);

            // Calculate the total size
            // var totalSize = elementSize * elementCount;

            // Log the file name and total size
            // console.log("    ElementSize + ElementCount: " + totalSize);
            
            // Optional: Dump first few bytes of buffer (if readable)
            // try {
            //     console.log("    Buffer Content: " + hexdump(buffer, {length: 32}));
            // } catch (e) {
            //     console.log("    [!] Unable to read buffer memory.");
            // }

            // send("Execution paused. Type 'resume()' to continue.");
            // Debugger.wait();
        }
    });
}

/*

function getModuleBase() {
    var modules = Process.enumerateModules();
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].name.toLowerCase() === processName.toLowerCase()) {
            return modules[i].base;
        }
    }
    return null;
}
// Define the address of the SafeFileRead function
var safeFileReadPtr = ptr('0x00552461');

if (Process.arch === "x86") {
    baseAddr = getModuleBase();
    var functionOffset = ptr(0x00552461);
    var functionAddr = baseAddr.add(functionOffset.sub(0x00400000)); // Adjust for base


    // Attach to the SafeFileRead function
    Interceptor.attach(safeFileReadPtr, {
        onEnter: function (args) {
            // Log the arguments
            console.log("SafeFileRead called!");

            // Extract the arguments
            var buffer = args[0];
            var elementSize = args[1].toInt32();
            var elementCount = args[2].toInt32();
            var stream = args[3];

            // Calculate the total size
            var totalSize = elementSize * elementCount;

            // Resolve the file name from the FILE* pointer
            var fileNamePtr = stream.add(0x10).readPointer(); // Adjust offset if necessary
            var fileName = fileNamePtr.readCString();

            // Log the file name and total size
            console.log("Stream File Name: " + fileName);
            console.log("ElementSize + ElementCount: " + totalSize);
        },
        onLeave: function (retval) {
            // Optionally, log the return value
            console.log("SafeFileRead returned: " + retval);
        }
    });
}

*/
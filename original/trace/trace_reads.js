var moduleName = "Game_v1020.exe";
const IDA_OFFSET = 0x400000;

// Offsets from IDA
var safeFileReadOffset = 0x552461;  // size_t __cdecl SafeFileRead(void *Buffer, size_t ElementSize, size_t ElementCount, FILE *Stream)
var readDatFileOffset = 0x4F7FC0;   // FILE *__cdecl eng_ReadDatFile(const CHAR *)
var fopenOffset = 0x552723;         // FILE *__cdecl fopen(const char *FileName, const char *Mode)
var ftelli64Offset = 0x55AA11;      // __int64 __cdecl _ftelli64(FILE *Stream)

var baseAddr = Module.findBaseAddress(moduleName);
if (baseAddr === null) {
    console.log("[!] Failed to find module base for " + moduleName);
} else {
    var safeFileReadAddr = baseAddr.add(safeFileReadOffset - IDA_OFFSET);
    var readDatFileAddr = baseAddr.add(readDatFileOffset - IDA_OFFSET);
    var fopenAddr = baseAddr.add(fopenOffset - IDA_OFFSET);
    var ftelli64Addr = baseAddr.add(ftelli64Offset - IDA_OFFSET);

    console.log("[+] Hooking SafeFileRead at: " + safeFileReadAddr);
    console.log("[+] Hooking eng_ReadDatFile at: " + readDatFileAddr);
    console.log("[+] Hooking fopen at: " + fopenAddr);
    console.log("[+] Hooking _ftelli64 at: " + ftelli64Addr);

    // FILE* to Filename mapping
    var fileMap = {};

    // Load `_ftelli64(FILE*)` function
    var _ftelli64 = new NativeFunction(ftelli64Addr, 'int64', ['pointer']);

    // Hook fopen to store FILE* <=> filename
    Interceptor.attach(fopenAddr, {
        onEnter: function (args) {
            var fileName = Memory.readUtf8String(args[0]);
            var mode = Memory.readUtf8String(args[1]);
            console.log("[*] fopen called - File: " + fileName + " | Mode: " + mode);
            this.fileName = fileName;
        },
        onLeave: function (retval) {
            if (!retval.isNull()) {
                var filePtr = retval.toString(); // Convert FILE* to string for key storage
                fileMap[filePtr] = this.fileName;
                console.log("[+] fopen returned FILE*: " + filePtr + " -> " + this.fileName);
            }
        }
    });

    // Hook eng_ReadDatFile to log parent function calls
    Interceptor.attach(readDatFileAddr, {
        onEnter: function (args) {
            var fileName = Memory.readUtf8String(args[0]);
            console.log("[*] eng_ReadDatFile called with: " + fileName);
        }
    });

    // Hook SafeFileRead and get filename from FILE* map
    Interceptor.attach(safeFileReadAddr, {
        onEnter: function (args) {
            var buffer = args[0];
            var elementSize = args[1].toInt32();
            var elementCount = args[2].toInt32();
            var stream = args[3].toString(); // Convert FILE* to string

            var fileName = fileMap[stream] || "UNKNOWN";

            var fileOffset = _ftelli64(args[3]);

            console.log("[*] SafeFileRead called!");
            console.log("    File Name: " + fileName);
            console.log("    ElementSize: " + elementSize);
            console.log("    ElementCount: " + elementCount);
            console.log("    File Offset: " + fileOffset);
            console.log("    Stream (FILE*): " + stream);

            send({
                FileName: fileName,
                Offset: fileOffset,
                ElementSize: elementSize,
                ElementCount: elementCount
            });

            // Optional: Dump first few bytes of buffer (if accessible)
            // try {
            //     console.log("    Buffer Content: " + hexdump(buffer, { length: 32 }));
            // } catch (e) {
            //     console.log("    [!] Unable to read buffer memory.");
            // }
        }
    });
}

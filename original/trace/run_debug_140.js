var moduleName = "Game_v140.exe";
const IDA_OFFSET = 0x400000;

// Offsets from IDA

var debugECOffset = 0x49D730;  // Your debugEC offset
var debugErrOffset = 0x49D660;  // Your debugEC offset
var safeFileReadOffset = 0x4AFB34; 
var drawTextAOffset = 0x4A16E0; 


// 1) Locate the two Win32 functions
const mb2wc = new NativeFunction(
  Module.findExportByName("kernel32.dll", "MultiByteToWideChar"),
  'int', ['uint','uint','pointer','int','pointer','int']
);
const wc2mb = new NativeFunction(
  Module.findExportByName("kernel32.dll", "WideCharToMultiByte"),
  'int', ['uint','uint','pointer','int','pointer','int','pointer','pointer']
);


function sjisPtrToUtf8(ptrAnsi) {
  // CP 932 = Shift-JIS, CP 65001 = UTF-8
  const CP_SJIS = 932, CP_UTF8 = 65001, MB_ERR_INVALID_CHARS = 0;

  // 2a) Figure out how many wide chars we need:
  let wcCount = mb2wc(CP_SJIS, MB_ERR_INVALID_CHARS, ptrAnsi, -1, ptr(0), 0);
  if (wcCount === 0) return null;

  // 2b) Allocate a buffer for the wide chars, then actually convert:
  let wideBuf = Memory.alloc(wcCount * 2);
  mb2wc(CP_SJIS, MB_ERR_INVALID_CHARS, ptrAnsi, -1, wideBuf, wcCount);

  // 2c) Figure out how many UTF-8 bytes are needed:
  let utf8Count = wc2mb(CP_UTF8, 0, wideBuf, -1, ptr(0), 0, ptr(0), ptr(0));
  if (utf8Count === 0) return null;

  // 2d) Allocate the UTF-8 buffer and convert:
  let utf8Buf = Memory.alloc(utf8Count);
  wc2mb(CP_UTF8, 0, wideBuf, -1, utf8Buf, utf8Count, ptr(0), ptr(0));

  // 2e) Read it back as a JS string:
  return Memory.readUtf8String(utf8Buf, utf8Count-1);
}




var baseAddr = Module.findBaseAddress(moduleName);
if (baseAddr === null) {
    console.log("[!] Failed to find module base for " + moduleName);
} else {
    
    var debugECAddr = baseAddr.add(debugECOffset - IDA_OFFSET);
    var debugErrAddr = baseAddr.add(debugErrOffset - IDA_OFFSET);
    var safeFileReadAddr = baseAddr.add(safeFileReadOffset - IDA_OFFSET);
    var drawTextAAddr = baseAddr.add(drawTextAOffset - IDA_OFFSET);

    console.log("[+] Hooking debugEC at: " + debugECAddr);
    console.log("[+] Hooking debugErr at: " + debugErrAddr);
    console.log("[+] Hooking SafeFileRead at: " + safeFileReadAddr);
    console.log("[+] Hooking drawTextA at: " + drawTextAAddr);
    
    Interceptor.attach(debugECAddr, {
        onEnter: function (args) {
            const rawAnsiPtr = args[0];
            var formatStr = sjisPtrToUtf8(rawAnsiPtr) || "[decode error]"; // Memory.readAnsiString(args[0]);
            
            // console.log("[*] debugEC called");
            
            let va = ""
            // If you're sure about argument count, you can decode some of the varargs manually
            try {
                const esp = this.context.esp;
                const varArgBase = esp.add(8);

                // Very basic parser: count %s, %d, etc. to guess vararg count
                const varArgs = [];
                const matches = formatStr.match(/%[sdxXp]/g);
                if (matches) {
                    for (let i = 0; i < matches.length; i++) {
                        const argPtr = varArgBase.add(i * 4); // 32-bit stack = 4 bytes
                        try {
                            const spec = matches[i];
                            if (spec === "%s") {
                                const strPtr = Memory.readPointer(argPtr);
                                varArgs.push(Memory.readUtf8String(strPtr));
                            } else if (spec === "%d" || spec === "%x" || spec === "%X" || spec === "%p") {
                                varArgs.push(Memory.readU32(argPtr));
                            } else {
                                varArgs.push("<?>");
                            }
                        } catch (e) {
                            varArgs.push("[error reading]");
                        }
                    }
                }

                va += `${varArgs}`

            } catch (e) {
                console.log(e);
                // Optional if second arg isn't a string
            }

            console.log("   | ", formatStr, " : ", va)
        }
    });

    Interceptor.attach(debugErrAddr, {
        onEnter: function (args) {
            const rawAnsiPtr = args[0];
            var formatStr = sjisPtrToUtf8(rawAnsiPtr) || "[decode error]"; // Memory.readAnsiString(args[0]);
            
            // console.log("[*] debugEC called");
            
            let va = ""
            // If you're sure about argument count, you can decode some of the varargs manually
            try {
                const esp = this.context.esp;
                const varArgBase = esp.add(8);

                // Very basic parser: count %s, %d, etc. to guess vararg count
                const varArgs = [];
                const matches = formatStr.match(/%[sdxXp]/g);
                if (matches) {
                    for (let i = 0; i < matches.length; i++) {
                        const argPtr = varArgBase.add(i * 4); // 32-bit stack = 4 bytes
                        try {
                            const spec = matches[i];
                            if (spec === "%s") {
                                const strPtr = Memory.readPointer(argPtr);
                                varArgs.push(Memory.readUtf8String(strPtr));
                            } else if (spec === "%d" || spec === "%x" || spec === "%X" || spec === "%p") {
                                varArgs.push(Memory.readU32(argPtr));
                            } else {
                                varArgs.push("<?>");
                            }
                        } catch (e) {
                            varArgs.push("[error reading]");
                        }
                    }
                }

                va += `${varArgs}`

            } catch (e) {
                console.log(e);
                // Optional if second arg isn't a string
            }

            console.log("!! | ", formatStr, " : ", va)
        }
    });


    // Interceptor.attach(safeFileReadAddr, {
    //     onEnter: function (args) {
    //         var buffer = args[0];
    //         var elementSize = args[1].toInt32();
    //         var elementCount = args[2].toInt32();
    //         var stream = args[3].toString(); // Convert FILE* to string

    //         var fileName = fileMap[stream] || "UNKNOWN";

    //         // var fileOffset = _ftelli64(args[3]);

    //         console.log("[*] SafeFileRead called!");
    //         console.log("    File Name: " + fileName);
    //         console.log("    ElementSize: " + elementSize);
    //         console.log("    ElementCount: " + elementCount);
    //         // console.log("    File Offset: " + fileOffset);
    //         console.log("    Stream (FILE*): " + stream);

    //         // send({
    //         //     FileName: fileName,
    //         //     Offset: fileOffset,
    //         //     ElementSize: elementSize,
    //         //     ElementCount: elementCount
    //         // });

    //         // Optional: Dump first few bytes of buffer (if accessible)
    //         // try {
    //         //     console.log("    Buffer Content: " + hexdump(buffer, { length: 32 }));
    //         // } catch (e) {
    //         //     console.log("    [!] Unable to read buffer memory.");
    //         // }
    //     }
    // });

    Interceptor.attach(drawTextAAddr, {
        onEnter(args) {
            // args[0]=this, [1]=hdc, [2]=x, [3]=y, [4]=lpString, [5]=transparentBg

            // 1) Decode the original SJIS string to JS:
            const origPtr = args[3];
            if (origPtr.isNull()) return;

            
            var origText = Memory.readCString(origPtr);

            // const origText = sjisPtrToUtf8(origPtr) || Memory.readAnsiString(origPtr);
            // console.log("[*] DrawTextA original:", origText);

            const repl = "A".repeat(origText.length);
            origPtr.writeAnsiString(repl);
            // 2) Build a new string of the same length, all 'A's:
            // const length = origText ? origText.length : 0;                // number of characters
            // const replacement = origText.substring(1); // "A".repeat(length-1) + "\0";        // e.g. "AAAA..."
            
            // 3) Allocate a fresh ANSI buffer and write out the 'A' string:
            // const newPtr = Memory.allocUtf8String(replacement);
            // Memory.writeAnsiString(strPtr, replacement);
            
            // 4) Swap the lpString argument to point at your new buffer:
            // args[3] = newPtr;

            // console.log("[*] DrawTextA lpString replaced with:", replacement);
        }
    });

}

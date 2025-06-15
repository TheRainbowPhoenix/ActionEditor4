var moduleName = "Game_v1020.exe";
const IDA_OFFSET = 0x400000;

// Offsets from IDA

var debugECOffset = 0x4E46E0;
var engInitLogOffset = 0x4E46C0;

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


function shiftJisToAscii(str) {
    if (typeof TextDecoder === 'undefined') {
        throw new Error("TextDecoder API not available in this JS runtime");
    }
    // 1) Build a Uint8Array of the raw bytes:
    const bytes = new Uint8Array(sjisStr.length);
    for (let i = 0; i < sjisStr.length; i++) {
        bytes[i] = sjisStr.charCodeAt(i) & 0xFF;
    }

    // 2) Decode via the global TextDecoder:
    const decoder = new TextDecoder('shift-jis');
    return decoder.decode(bytes);


    const table = {
        "83_58": "ス", "83_43": "イ", "83_62": "ッ", "83_63": "チ",
        "83_5F": "ダ", "83_45": "ウ", "83_93": "ン",
        "83_47": "エ", "83_89": "ラ", "81_5B": "[",
        "91_95": "装", "94_F6": "尾",
        "97_89": "莱", "95_FC": "朋"
    };

    const result = [];

    // Convert JS string to raw bytes (Latin1-style re-interpretation)
    const u8 = [];
    for (let i = 0; i < str.length; i++) {
        u8.push(str.charCodeAt(i) & 0xFF);
    }

    for (let i = 0; i < u8.length;) {
        const b1 = u8[i++];

        if ((b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC)) {
            if (i >= u8.length) break;
            const b2 = u8[i++];
            const key = b1.toString(16).padStart(2, "0") + "_" + b2.toString(16).padStart(2, "0");
            result.push(table[key] || `[${key}]`);
        } else if (b1 === 0x00) {
            break;
        } else {
            result.push(String.fromCharCode(b1));
        }
    }

    return result.join('');
}


var baseAddr = Module.findBaseAddress(moduleName);
if (baseAddr === null) {
    console.log("[!] Failed to find module base for " + moduleName);
} else {
    
    var debugECAddr = baseAddr.add(debugECOffset - IDA_OFFSET);
    var engInitLogAddr = baseAddr.add(engInitLogOffset - IDA_OFFSET);

    console.log("[+] Hooking debugEC at: " + debugECAddr);
    console.log("[+] Hooking engInitLog at: " + engInitLogAddr);

    Interceptor.attach(engInitLogAddr, {
        onEnter: function (args) {
            console.log("[*] eng_InitializeLog intercepted");
            console.log("    Original a1: " + args[0].toInt32());
            console.log("    lpString2: " + Memory.readUtf8String(args[1]));

            // Force a1 = 1
            args[0] = ptr(1);
            console.log("    → Overridden a1: 1");
        }
    });
    
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
            
            if (va) {
                console.log(formatStr, " : ", va)
            } else {
                console.log(formatStr)
            }
        }
    });
}

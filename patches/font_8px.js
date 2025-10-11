var moduleName = "Game_v1020.exe";
const IDA_OFFSET = 0x400000;

// Offsets from IDA
var calcTextDims = 0x49A070;
var drawTextBoxOffset = 0x4FA640;
var drawTextAOffset = 0x4F9B20;

var baseAddr = Module.findBaseAddress(moduleName);
if (baseAddr === null) {
    console.log("[!] Failed to find module base for " + moduleName);
} else {
    var drawTextBoxAddr = baseAddr.add(drawTextBoxOffset - IDA_OFFSET);
    var calcTextDimsAddr = baseAddr.add(calcTextDims - IDA_OFFSET);
    var drawTextAAddr = baseAddr.add(drawTextAOffset - IDA_OFFSET);

    // Quietly patch monospace character width to 8 pixels
    Interceptor.attach(drawTextBoxAddr, {
        onEnter: function (args) {
            var renderer = args[0];
            var monospaceWidth = Memory.readInt(renderer.add(9 * 4));
            if (monospaceWidth !== 0 && monospaceWidth !== 8) {
                Memory.writeInt(renderer.add(9 * 4), 8);
            }
        }
    });
    
    // Also patch in dimension calculation
    
    Interceptor.attach(calcTextDimsAddr, {
        onEnter: function (args) {
            try {
                var renderer = this.context.ecx; // __thiscall: 'this' is in ECX
                var dimensions = args[0]; // First parameter after 'this'
                var text = args[1];       // Second parameter
                
                var monospaceWidth = Memory.readInt(renderer.add(9 * 4));
                
                // Only patch if it's a reasonable value (not corrupted)
                if (monospaceWidth > 0 && monospaceWidth < 100 && monospaceWidth !== 8) {
                    Memory.writeInt(renderer.add(9 * 4), 8);
                }
            } catch(e) {
                console.log("Error in debug hook: " + e.message);
            }
        }
    });
    

    Interceptor.attach(drawTextAAddr, {
        onEnter: function (args) {
            var renderer = args[0];
            var monospaceWidth = Memory.readInt(renderer.add(9 * 4));
            if (monospaceWidth !== 0 && monospaceWidth !== 8) {
                Memory.writeInt(renderer.add(9 * 4), 8);
            }
        }
    });
}
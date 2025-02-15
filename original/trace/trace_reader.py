import frida
import sys

# Output log file
LOG_FILE = "log.txt"

# Function to write to log file
def log_to_file(data):
    with open(LOG_FILE, "a") as f:
        f.write(f"{data['FileName']}, {data['Offset']}, {data['ElementSize']}, {data['ElementCount']}\n")

# Callback function for messages from Frida
def on_message(message, data):
    if message["type"] == "send":
        log_to_file(message["payload"])
    else:
        print(f"[!] Other Message: {message}")

# Attach to process
process_name = "Game_v1020.exe"
session = frida.attach(process_name)

# Load Frida script
with open("hook.js", "r") as f:
    script = session.create_script(f.read())

script.on("message", on_message)  # Handle messages from Frida
script.load()

print("[*] Logging reads to log.txt... Press Ctrl+C to stop.")
sys.stdin.read()  # Keep script running

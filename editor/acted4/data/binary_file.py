from dataclasses import dataclass
from pathlib import Path
from typing import Union
import struct

class ActedBinaryFile:
    VERSIONS = [
        0xB6, # v248b
        0x03C6, # ??
        0x03FC # v1020
    ]

    def __init__(self, file_path: Union[str, Path]):
        self.file_path = Path(file_path)
        self._data = bytearray()
        self._position = 0
        
    def load(self) -> bool:
        try:
            self._data = bytearray(self.file_path.read_bytes())
            self._position = 0
            return True
        except Exception as e:
            print(f"Error loading {self.file_path}: {e}")
            return False
            
    def save(self) -> bool:
        try:
            self.file_path.write_bytes(bytes(self._data))
            return True
        except Exception as e:
            print(f"Error saving {self.file_path}: {e}")
            return False
            
    def read_u8(self) -> int:
        value = self._data[self._position]
        self._position += 1
        return value
        
    def read_u16(self) -> int:
        value = struct.unpack_from("<H", self._data, self._position)[0]
        self._position += 2
        return value
        
    def read_u32(self) -> int:
        value = struct.unpack_from("<I", self._data, self._position)[0]
        self._position += 4
        return value
        
    def read_str(self, length: int) -> str:
        data = self._data[self._position:self._position + length]
        self._position += length
        return data.decode('shift-jis', errors='ignore').rstrip('\x00')
        
    def write_u8(self, value: int):
        self._data[self._position] = value
        self._position += 1
        
    def write_u16(self, value: int):
        struct.pack_into("<H", self._data, self._position, value)
        self._position += 2
        
    def write_u32(self, value: int):
        struct.pack_into("<I", self._data, self._position, value)
        self._position += 4
        
    def write_str(self, value: str, length: int):
        encoded = value.encode('shift-jis')[:length]
        encoded = encoded.ljust(length, b'\x00')
        self._data[self._position:self._position + length] = encoded
        self._position += length
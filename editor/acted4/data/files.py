from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Union
from .binary_file import ActedBinaryFile

@dataclass
class AnimationFrame:
    header: int = 0
    top: int = 0
    display_time: int = 0
    unknown1: int = 0
    unknown2: int = 0

@dataclass
class Animation:
    header: int = 0
    sample_list_index: int = 0
    sample_index: int = 0
    frame_start: int = 0
    unknown: int = 0
    animation_name: str = ""
    frames: List[AnimationFrame] = field(default_factory=list)

@dataclass
class AnimeSetElement:
    header: int = 0
    flying_offset: int = 0
    block_offset: int = 8
    invincibility_offset: int = 4
    unknown: int = 0
    name: str = ""
    animations: List[Animation] = field(default_factory=list)

@dataclass
class BmpCharaExcElement:
    header: int = 0
    is_name_same_path: int = 0
    is_giant: int = 0
    scale_mode: int = 1
    unknown: int = 2 # always 2 ??
    name: str = ""
    path: str = ""

@dataclass
class AnimeSetData:
    elements: List[AnimeSetElement] = field(default_factory=list)


@dataclass
class BmpCharaExcData:
    elements: List[BmpCharaExcElement] = field(default_factory=list)

@dataclass
class PictureElement:
    header: int = 1 # always 1 ??
    is_name_same_path: int = 0
    unknown2: int = 2 # always 2 ??
    name: str = ""
    path: str = ""

@dataclass
class PictureData:
    elements: List[PictureElement] = field(default_factory=list)

@dataclass
class SoundElement:
    header: int = 1  # always 1 ??
    is_name_same_path: int = 0
    unknown2: int = 2  # always 2 ??
    name: str = ""
    path: str = ""

@dataclass
class SoundData:
    elements: List[SoundElement] = field(default_factory=list)

@dataclass
class CharaEffectElement:
    header: int = 0
    effect: int = 0
    param1: int = 0
    param2: int = 0
    param3: int = 0
    param4: int = 0
    param5: int = 0
    unknown: int = 1  # always 1?
    name: str = ""

@dataclass
class CharaEffectData:
    elements: List[CharaEffectElement] = field(default_factory=list)

@dataclass
class EffectAnimation:
    header: int = 2
    start: int = 0
    end: int = 0
    unknown: int = 0

@dataclass
class EffectElement:
    header: int = 0
    is_name_same_path: int = 0
    width: int = 0
    height: int = 0
    is_giant: int = 0
    unknown: int = 2  # always 2?
    name: str = ""
    path: str = ""
    animations: List[EffectAnimation] = field(default_factory=list)

@dataclass
class EffectData:
    elements: List[EffectElement] = field(default_factory=list)

class AnimeSet(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = AnimeSetData()
        
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            anim_set_count = self.read_u32()
            
            for _ in range(anim_set_count):
                element = AnimeSetElement()
                element.header = self.read_u32()
                element.invincibility_offset = self.read_u32()
                element.block_offset = self.read_u32()
                element.flying_offset = self.read_u32()
                element.unknown = self.read_u32()
                
                name_length = self.read_u32()
                element.name = self.read_str(name_length)
                
                animation_count = self.read_u32()
                for _ in range(animation_count):
                    anim = Animation()
                    anim.header = self.read_u32()
                    anim.sample_list_index = self.read_u16()
                    anim.sample_index = self.read_u8()
                    anim.frame_start = self.read_u16()
                    anim.unknown = self.read_u32()
                    
                    name_length = self.read_u32()
                    anim.animation_name = self.read_str(name_length)
                    
                    frame_count = self.read_u32()
                    for _ in range(frame_count):
                        frame = AnimationFrame()
                        frame.header = self.read_u32()
                        frame.top = self.read_u32()
                        frame.display_time = self.read_u32()
                        frame.unknown1 = self.read_u32()
                        frame.unknown2 = self.read_u32()
                        anim.frames.append(frame)
                        
                    element.animations.append(anim)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing AnimeSet: {e}")
            return False

@dataclass
class SystemData:
    pass  # TODO: Add fields

class System(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = SystemData()
        
    def parse(self) -> bool:
        if not self.load():
            return False
        # TODO: Implement parsing
        return True

@dataclass
class GValInfoData:
    pass  # TODO: Add fields

class GValInfo(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = GValInfoData()
        
    def parse(self) -> bool:
        if not self.load():
            return False
        # TODO: Implement parsing
        return True

# Add more stub classes for other .dat files
class Anime(ActedBinaryFile): pass

class BmpCharaExc(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = BmpCharaExcData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            bmp_set_count = self.read_u32()
            
            for _ in range(bmp_set_count):
                element = BmpCharaExcElement()
                element.header = self.read_u32() # should be 3
                element.is_name_same_path = self.read_u32()
                element.is_giant = self.read_u32()
                element.scale_mode = self.read_u32()
                element.unknown = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                
                path_length = self.read_u32()
                if path_length > 1:
                    element.path = self.read_str(path_length)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing AnimeSet: {e}")
            return False

class SwordType(ActedBinaryFile): pass

class Effect(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = EffectData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            anim_set_count = self.read_u32()
            
            for _ in range(anim_set_count):
                element = EffectElement()
                element.header = self.read_u32()
                element.is_name_same_path = self.read_u32()
                element.width = self.read_u32()
                element.height = self.read_u32()
                element.is_giant = self.read_u32()
                element.unknown = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                
                path_length = self.read_u32()
                if path_length > 1:
                    element.path = self.read_str(path_length)
                    
                animation_count = self.read_u32()
                for _ in range(animation_count):
                    anim = EffectAnimation()
                    anim.header = self.read_u32()
                    anim.start = self.read_u32()
                    anim.end = self.read_u32()
                    anim.unknown = self.read_u32()
                    element.animations.append(anim)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing Effect: {e}")
            return False

class CharaEffect(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = CharaEffectData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            effect_set_count = self.read_u32()
            
            for _ in range(effect_set_count):
                element = CharaEffectElement()
                element.header = self.read_u32()
                element.effect = self.read_u32()
                element.param1 = self.read_u32()
                element.param2 = self.read_u32()
                element.param3 = self.read_u32()
                element.param4 = self.read_u32()
                element.param5 = self.read_u32()
                element.unknown = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing CharaEffect: {e}")
            return False

class ScrEffect(ActedBinaryFile): pass

class Picture(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = PictureData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            element_count = self.read_u32()
            
            for _ in range(element_count):
                element = PictureElement()
                element.header = self.read_u32()
                element.is_name_same_path = self.read_u32()
                element.unknown2 = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                
                path_length = self.read_u32()
                if path_length > 1:
                    element.path = self.read_str(path_length)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing Picture: {e}")
            return False

class Sound(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = SoundData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            element_count = self.read_u32()
            
            for _ in range(element_count):
                element = SoundElement()
                element.header = self.read_u32()
                element.is_name_same_path = self.read_u32()
                element.unknown2 = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                
                path_length = self.read_u32()
                if path_length > 1:
                    element.path = self.read_str(path_length)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing Sound: {e}")
            return False

class Bgm(ActedBinaryFile): pass
class CommonPalette(ActedBinaryFile): pass
class PrjOption(ActedBinaryFile): pass
class WorldMap(ActedBinaryFile): pass
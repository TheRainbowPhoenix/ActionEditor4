from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Union
from math import floor, ceil
from .binary_file import ActedBinaryFile

@dataclass
class AnimationFrame:
    header: int = 0
    frame_index: int = 0
    display_time: int = 0
    exec_commands: int = 0
    unknown2: int = 0

@dataclass
class Animation:
    header: int = 0
    sample_list_index: int = 0
    sample_type: int = 0
    frame_start: int = 0
    unknown: int = 0
    name: str = ""
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
class AnimeData:
    elements: List[Animation] = field(default_factory=list)


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

@dataclass
class BgmElement:
    header: int = 2  # always 2?
    is_name_same_path: int = 0
    volume: int = 100
    unknown: int = 2  # always 2?
    name: str = ""
    path: str = ""

@dataclass
class BgmData:
    elements: List[BgmElement] = field(default_factory=list)

@dataclass
class SwordPosition:
    header: int = 2
    x: int = 0
    y: int = 0
    unknown1: int = 0
    unknown2: int = 0
    unknown3: int = 0
    unknown4: int = 0
    unknown5: int = 0
    width: int = 0
    height: int = 0
    index: int = 0
    unknown6: int = 0

@dataclass
class SwordTypeElement:
    header: int = 0
    is_name_same_path: int = 0
    unknown: int = 3  # always 3?
    name: str = ""
    path_left: str = ""
    path_right: str = ""
    positions: List[SwordPosition] = field(default_factory=list)

@dataclass
class SwordTypeData:
    elements: List[SwordTypeElement] = field(default_factory=list)

@dataclass
class ScreenEffectElement:
    header: int = 2
    effect: int = 0
    param1: int = 0
    param2: int = 0
    param3: int = 0
    param4: int = 0
    param5: int = 0
    unknown: int = 1  # always 1?
    name: str = ""

@dataclass
class ScreenEffectData:
    elements: List[ScreenEffectElement] = field(default_factory=list)

@dataclass
class WorldChip:
    header: int = 0
    tile_index: int = 0
    locked: int = 0
    graphic: int = 0
    strings_count: int = 2  # 2 - std::vector<std::string>
    name: str = ""
    unused_string: str = ""

@dataclass
class WorldEventPage:
    start: int = 0
    event_type: int = 0
    graphic: int = 0
    world_number: int = 0
    pass_without_clear: int = 0
    play_after_clear: int = 0
    on_game_clear: int = 0
    appearance_condition_world: int = 1  # 1
    appearance_condition_variable: int = 0  # dropdown
    appearance_condition_constant: int = 0  # spinner
    appearance_condition_comparison_content: int = 0  # small dropdown
    appearance_condition_total_score: int = 0
    variation_setting_present: int = 0
    variation_variable: int = 0
    variation_constant: int = 0
    strings_count: int = 2  # 2 - std::vector<std::string>
    world_name: str = ""  # std::string
    start_stage: str = ""  # std::string

@dataclass
class WorldEventBase:
    header: int = 0
    placement_x: int = 0
    placement_y: int = 0
    strings_count: int = 0  # 1 - std::vector<std::string>
    name: str = ""
    pages_count: int = 0
    pages: List[WorldEventPage] = field(default_factory=list)

@dataclass
class WorldMapData:
    width: int = 32
    height: int = 32
    init_x: int = 0
    init_y: int = 0
    background_index: int = 0
    use_background: int = 0
    chunk_width: int = 32  # 32, 64, 128 ...
    chunk_pow: int = 5   # 32:5, 64:6, 128:7 ... power of 2 ?
    strings_count: int = 2   # always 2?
    name: str = ""
    bg_path: str = ""
    tiles_types: List[WorldChip] = field(default_factory=list)
    tiles: List[int] = field(default_factory=list)
    events: List[WorldEventBase] = field(default_factory=list)
    events_pal: List[WorldEventBase] = field(default_factory=list)

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
                    anim.sample_type = self.read_u8()
                    anim.frame_start = self.read_u16()
                    anim.unknown = self.read_u32()
                    
                    name_length = self.read_u32()
                    anim.name = self.read_str(name_length)
                    
                    frame_count = self.read_u32()
                    for _ in range(frame_count):
                        frame = AnimationFrame()
                        frame.header = self.read_u32()
                        frame.frame_index = self.read_u32()
                        frame.display_time = self.read_u32()
                        frame.exec_commands = self.read_u32()
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
class Anime(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = AnimeData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            anim_count = self.read_u32()
            
            for _ in range(anim_count):
                anim = Animation()
                anim.header = self.read_u32()
                anim.sample_list_index = self.read_u16()
                anim.sample_type = self.read_u8()
                anim.frame_start = self.read_u16()
                anim.unknown = self.read_u32()
                
                name_length = self.read_u32()
                anim.name = self.read_str(name_length)
                
                frame_count = self.read_u32()
                for _ in range(frame_count):
                    frame = AnimationFrame()
                    frame.header = self.read_u32()
                    frame.frame_index = self.read_u32()
                    frame.display_time = self.read_u32()
                    frame.exec_commands = self.read_u32()
                    frame.unknown2 = self.read_u32()
                    anim.frames.append(frame)
                    
                self.data.elements.append(anim)
                
            return True
            
        except Exception as e:
            print(f"Error parsing Anime: {e}")
            return False

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

class SwordType(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = SwordTypeData()
    
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
                element = SwordTypeElement()
                element.header = self.read_u32()
                element.is_name_same_path = self.read_u32()
                element.unknown = self.read_u32()

                name_length = self.read_u32()
                if name_length > 1:
                    element.name = self.read_str(name_length)
                    
                path_left_length = self.read_u32()
                if path_left_length > 1:
                    element.path_left = self.read_str(path_left_length)
                    
                path_right_length = self.read_u32()
                if path_right_length > 1:
                    element.path_right = self.read_str(path_right_length)
                    
                pos_count = self.read_u32()
                for _ in range(pos_count):
                    pos = SwordPosition()
                    pos.header = self.read_u32()
                    pos.x = self.read_s32()
                    pos.y = self.read_s32()
                    pos.unknown1 = self.read_u32()
                    pos.unknown2 = self.read_u32()
                    pos.unknown3 = self.read_u32()
                    pos.unknown4 = self.read_u32()
                    pos.unknown5 = self.read_u32()
                    pos.width = self.read_u32()
                    pos.height = self.read_u32()
                    pos.index = self.read_u32()
                    pos.unknown6 = self.read_u32()
                    element.positions.append(pos)
                    
                self.data.elements.append(element)
                
            return True
            
        except Exception as e:
            print(f"Error parsing SwordType: {e}")
            return False

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

class ScrEffect(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = ScreenEffectData()
    
    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            scr_count = self.read_u32()
            
            for _ in range(scr_count):
                element = ScreenEffectElement()
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
            print(f"Error parsing ScreenEffect: {e}")
            return False

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

class Bgm(ActedBinaryFile):
    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = BgmData()
    
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
                element = BgmElement()
                element.header = self.read_u32()
                element.is_name_same_path = self.read_u32()
                element.volume = self.read_u32()
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
            print(f"Error parsing BGM: {e}")
            return False

class CommonPalette(ActedBinaryFile): pass
class PrjOption(ActedBinaryFile): pass

class WorldMap(ActedBinaryFile):
    CHUNK_SIZE = 128  # Base chunk size in tiles

    def __init__(self, file_path: Union[str, Path]):
        super().__init__(file_path)
        self.data = WorldMapData()
    
    def _calculate_chunk_size(self, width: int) -> (int, int):
        """Calculate the chunk size needed for the given width"""
        # If width <= 32, use one chunk
        if width <= 32:
            return (5, self.CHUNK_SIZE)
        
        count = ceil(width / 32)
        
        multiplier = 1 << (count - 1).bit_length()
        return (multiplier, multiplier * self.CHUNK_SIZE)

    def parse(self) -> bool:
        if not self.load():
            return False
            
        try:
            self.data.tiles_types.clear()
            self.data.tiles.clear()
            self.data.events.clear()
            self.data.events_pal.clear()

            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            self.version = magic
            self._settings_count = self.read_u32()

            self.data.width = self.read_u32()
            self.data.height = self.read_u32()
            
            self.data.chunk_width = self.read_u32()  # 32, 64, 128 ...
            self.data.chunk_pow = self.read_u32()  # 5, 6, 7 ...
            
            self.data.init_x = self.read_u32()
            self.data.init_y = self.read_u32()
            
            self.data.background_index = self.read_u32()
            self.data.use_background = self.read_u32()
            
            self.data.strings_count = self.read_u32()  # 2
            
            self.data.name = self.read_std_string()

            self.data.bg_path = self.read_std_string()
                
            # Read tile types (WorldChip)
            tiles_types_count = self.read_u32()
            for _ in range(tiles_types_count):
                self.data.tiles_types.append(self._read_world_chip())
                
                # tile = WorldChip()
                # tile.header = self.read_u32()
                # tile.tile_index = self.read_u32()
                # tile.locked = self.read_u32()
                # tile.graphic = self.read_u32()
                # tile.strings_count = self.read_u32()  # 2
                
                # # Read first string (name)
                # name_length = self.read_u32()
                # if name_length > 1:
                #     tile.name = self.read_str(name_length)
                
                # # Read second string (unused_string)
                # unused_string_length = self.read_u32()
                # if unused_string_length > 1:
                #     tile.unused_string = self.read_str(unused_string_length)
                    
                # self.data.tiles_types.append(tile)
                
            # Read tiles with proper chunking
            tiles_count = self.read_u32()
            # self.data.chunk_pow, self.data.chunk_width = self._calculate_chunk_size(self.data.width)
            # actual_tiles = self.data.width * self.data.height
            
            # Read all chunks
            for index in range(tiles_count):
                tile_value = self.read_u32()
                x = index % max(1, self.data.chunk_width)
                y = index // max(1, self.data.chunk_width)
                if x < self.data.width and y < self.data.height:
                    self.data.tiles.append(tile_value)
            # for i in range(tiles_count):
            #     tile = self.read_u32()
            #     if (i % self.data.chunk_width) < self.data.width:
            #         self.data.tiles.append(tile)
                
            # Read events
            events_count = self.read_u32()
            for _ in range(events_count):
                event = self._read_world_event()
                self.data.events.append(event)
                
            # Read event palette
            events_pal_count = self.read_u32()
            for _ in range(events_pal_count):
                event = self._read_world_event()
                self.data.events_pal.append(event)
                
            return True
            
        except Exception as e:
            print(f"Error parsing WorldMap: {e}")
            return False
            
    def serialize(self) -> bool:
        try:
            self.start_writing()

            self.write_u32(self.version)  # Write magic number
            self.write_u32(self._settings_count)  # Write settings count
            
            # Write map dimensions and chunk info
            self.write_u32(self.data.width)
            self.write_u32(self.data.height)
            
            # Calculate proper chunk size
            chunk_size = self._calculate_chunk_size(self.data.width)
            actual_tiles = self.data.width * self.data.height
            
            self.write_u32(self.data.chunk_width)
            self.write_u32(self.data.chunk_pow)
            
            # Write init position
            self.write_u32(self.data.init_x)
            self.write_u32(self.data.init_y)
            
            # Write background info
            self.write_u32(self.data.background_index)
            self.write_u32(self.data.use_background)
            
            # Write strings count and strings
            self.write_u32(self.data.strings_count)
            self.write_std_string(self.data.name)
            self.write_std_string(self.data.bg_path)
            
            # Write tile types count and tile types
            self.write_u32(len(self.data.tiles_types))
            for chip in self.data.tiles_types:
                self._write_world_chip(chip)
            
            # Write tiles count and tiles
            tiles_count = self.data.chunk_width * self.data.height
            tiles_count = max(tiles_count, (self.data.height - 1) * self.data.chunk_width + self.data.width)
            
            self.write_u32(tiles_count)
            
            tiles_to_write = [0] * tiles_count

            tile_idx = 0
            for y in range(self.data.height):
                for x in range(self.data.width):
                    index = y * self.data.chunk_width + x
                    if index < tiles_count and tile_idx < len(self.data.tiles):
                        tiles_to_write[index] = self.data.tiles[tile_idx]
                        tile_idx += 1
                        
            # self.write_u32(len(self.data.tiles))
            # for tile in self.data.tiles:
            #     self.write_u32(tile)

            # Write all tiles
            for tile_value in tiles_to_write:
                self.write_u32(tile_value)
            
            # Write events
            self.write_u32(len(self.data.events))
            for event in self.data.events:
                self._write_world_event(event)
            
            # Write event palette
            self.write_u32(len(self.data.events_pal))
            for event in self.data.events_pal:
                self._write_world_event(event)
                    
            return True
                
        except Exception as e:
            print(f"Error serializing WorldMap: {e}")
            return False
        finally:
            self.finish_writing()
        
    def _read_world_chip(self) -> WorldChip:
        chip = WorldChip()
        chip.header = self.read_u32()
        chip.tile_index = self.read_u32()
        chip.locked = self.read_u32()
        chip.graphic = self.read_u32()
        chip.strings_count = self.read_u32()
        chip.name = self.read_std_string()
        chip.unused_string = self.read_std_string()
        return chip

    def _write_world_chip(self, chip: WorldChip) -> None:
        self.write_u32(chip.header)
        self.write_u32(chip.tile_index)
        self.write_u32(chip.locked)
        self.write_u32(chip.graphic)
        self.write_u32(chip.strings_count or 2)
        self.write_std_string(chip.name)
        self.write_std_string(chip.unused_string)

    def _read_world_event(self) -> WorldEventBase:
        """Helper to read a world event structure"""
        event = WorldEventBase()
        event.header = self.read_u32()
        event.placement_x = self.read_u32()
        event.placement_y = self.read_u32()
        
        event.strings_count = self.read_u32()  # 1
        
        # Read event name
        event.name = self.read_std_string()
        
        # Read pages count
        event.pages_count = self.read_u32()
        
        # Read pages
        for _ in range(event.pages_count):
            page = self._read_world_event_page()
            event.pages.append(page)
            
        return event

    def _read_world_event_page(self) -> WorldEventPage:
        """Helper to read a world event page structure"""
        page = WorldEventPage()
        page.start = self.read_u32()
        page.event_type = self.read_u32()
        page.graphic = self.read_u32()
        
        page.world_number = self.read_u32()
        page.pass_without_clear = self.read_u32()
        page.play_after_clear = self.read_u32()
        page.on_game_clear = self.read_u32()
        
        page.appearance_condition_world = self.read_u32()
        page.appearance_condition_variable = self.read_u32()
        page.appearance_condition_constant = self.read_u32()
        page.appearance_condition_comparison_content = self.read_u32()
        page.appearance_condition_total_score = self.read_u32()
        
        page.variation_setting_present = self.read_u32()
        page.variation_variable = self.read_u32()
        page.variation_constant = self.read_u32()
        
        page.strings_count = self.read_u32()  # 2
        
        # Read world_name
        page.world_name = self.read_std_string()
        
        # Read start_stage
        page.start_stage = self.read_std_string()
            
        return page

    def _write_world_event(self, event: WorldEventBase):
        """Helper to write a world event structure"""
        self.write_u32(event.header)
        self.write_u32(event.placement_x)
        self.write_u32(event.placement_y)
        
        self.write_u32(event.strings_count or 1)

        self.write_std_string(event.name)
        
        self.write_u32(len(event.pages)) # event.pages_count
        
        for page in event.pages:
            self._write_world_event_page(page)

    def _write_world_event_page(self, page: WorldEventPage):
        """Helper to write a world event page structure"""
        self.write_u32(page.start)
        self.write_u32(page.event_type)
        self.write_u32(page.graphic)
        
        self.write_u32(page.world_number)
        self.write_u32(page.pass_without_clear)
        self.write_u32(page.play_after_clear)
        self.write_u32(page.on_game_clear)
        
        self.write_u32(page.appearance_condition_world)
        self.write_u32(page.appearance_condition_variable)
        self.write_u32(page.appearance_condition_constant)
        self.write_u32(page.appearance_condition_comparison_content)
        self.write_u32(page.appearance_condition_total_score)
        
        self.write_u32(page.variation_setting_present)
        self.write_u32(page.variation_variable)
        self.write_u32(page.variation_constant)
        
        self.write_u32(page.strings_count or 2)
        self.write_std_string(page.world_name)
        self.write_std_string(page.start_stage)
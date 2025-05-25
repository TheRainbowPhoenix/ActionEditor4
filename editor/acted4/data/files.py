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
class WorldTile:
    header: int = 0
    tile_index: int = 0
    locked: int = 0
    graphic: int = 0
    unknown1: int = 2  # always 2?
    name: str = ""
    unknown2: int = 1  # always 1?

@dataclass
class WorldEventBase:
    header: int = 0
    unknown1: int = 0
    unknown2: int = 0
    unknown3: int = 0
    name: str = ""
    unknown4: int = 0
    unknown5: int = 0
    event_type: int = 0
    graphic: int = 0
    world_clear: int = 0
    pass_without_clear: int = 0
    play_after_clear: int = 0
    on_game_clear: int = 0
    unknown14: int = 1
    spawn_event_id: int = 0
    spawn_cond_val: int = 0
    spawn_cond_type: int = 0
    total_score: int = 0
    unknown19: int = 0
    variation_id: int = 0
    variation_val: int = 0
    unknown96: int = 2  # always 2?
    world_name: str = ""
    start_stage: str = ""

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
    unknown3: int = 2   # always 2?
    name: str = ""
    bg_path: str = ""
    tiles_types: List[WorldTile] = field(default_factory=list)
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
            magic = self.read_u32()
            if magic not in self.VERSIONS:
                print("Invalid magic number")
                return False
                
            some_count = self.read_u32()  # TODO: Figure out what this is
            self.data.width = self.read_u32()
            self.data.height = self.read_u32()
            
            self.data.chunk_width = self.read_u32()  # 32, 64, 128 ...
            self.data.chunk_pow = self.read_u32()  # 5, 6, 7 ...
            
            self.data.init_x = self.read_u32()
            self.data.init_y = self.read_u32()
            
            self.data.background_index = self.read_u32()
            self.data.use_background = self.read_u32()
            
            self.data.unknown3 = self.read_u32()  # 2
            
            name_length = self.read_u32()
            if name_length > 1:
                self.data.name = self.read_str(name_length)
                
            bg_path_length = self.read_u32()
            if bg_path_length > 1:
                self.data.bg_path = self.read_str(bg_path_length)
                
            # Read tile types
            tiles_types_count = self.read_u32()
            for _ in range(tiles_types_count):
                tile = WorldTile()
                tile.header = self.read_u32()
                tile.tile_index = self.read_u32()
                tile.locked = self.read_u32()
                tile.graphic = self.read_u32()
                tile.unknown1 = self.read_u32()
                
                name_length = self.read_u32()
                if name_length > 1:
                    tile.name = self.read_str(name_length)
                    
                tile.unknown2 = self.read_u32()
                self.data.tiles_types.append(tile)
                
            # Read tiles with proper chunking
            tiles_count = self.read_u32()
            # self.data.chunk_pow, self.data.chunk_width = self._calculate_chunk_size(self.data.width)
            # actual_tiles = self.data.width * self.data.height
            
            # Read all chunks
            for i in range(tiles_count):
                tile = self.read_u32()
                if (i % self.data.chunk_width) < self.data.width:
                    self.data.tiles.append(tile)
                
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
            
    def save(self) -> bool:
        try:
            # Calculate proper chunk size
            chunk_size = self._calculate_chunk_size(self.data.width)
            actual_tiles = self.data.width * self.data.height
            
            self.write_u32(self.VERSIONS[0])  # Write magic number
            self.write_u32(len(self.data.tiles_types))  # Write tile types count
            
            # Write tiles count (chunk size)
            self.write_u32(chunk_size)
            
            # Write actual tiles
            for tile in self.data.tiles:
                self.write_u32(tile)
                
            # Pad remaining chunk space with zeros
            for _ in range(chunk_size - actual_tiles):
                self.write_u32(0)
                
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
            print(f"Error saving WorldMap: {e}")
            return False

    def _read_world_event(self) -> WorldEventBase:
        """Helper to read a world event structure"""
        event = WorldEventBase()
        event.header = self.read_u32()
        event.unknown1 = self.read_u32()
        event.unknown2 = self.read_u32()
        event.unknown3 = self.read_u32()
        
        name_length = self.read_u32()
        if name_length > 1:
            event.name = self.read_str(name_length)
            
        event.unknown4 = self.read_u32()
        event.unknown5 = self.read_u32()
        event.event_type = self.read_u32()
        event.graphic = self.read_u32()
        
        event.world_clear = self.read_u32()
        event.pass_without_clear = self.read_u32()
        event.play_after_clear = self.read_u32()
        event.on_game_clear = self.read_u32()
        event.unknown14 = self.read_u32()
        event.spawn_event_id = self.read_u32()
        event.spawn_cond_val = self.read_u32()
        event.spawn_cond_type = self.read_u32()
        event.total_score = self.read_u32()
        event.unknown19 = self.read_u32()
        
        event.variation_id = self.read_u32()
        event.variation_val = self.read_u32()
        
        event.unknown96 = self.read_u32()
        
        world_name_length = self.read_u32()
        if world_name_length > 1:
            event.world_name = self.read_str(world_name_length)
            
        start_stage_length = self.read_u32()
        if start_stage_length > 1:
            event.start_stage = self.read_str(start_stage_length)
            
        return event

    def _write_world_event(self, event: WorldEventBase):
        """Helper to write a world event structure"""
        self.write_u32(event.header)
        self.write_u32(event.unknown1)
        self.write_u32(event.unknown2)
        self.write_u32(event.unknown3)
        
        self.write_u32(len(event.name))
        if event.name:
            self.write_str(event.name)
            
        self.write_u32(event.unknown4)
        self.write_u32(event.unknown5)
        self.write_u32(event.event_type)
        self.write_u32(event.graphic)
        
        self.write_u32(event.world_clear)
        self.write_u32(event.pass_without_clear)
        self.write_u32(event.play_after_clear)
        self.write_u32(event.on_game_clear)
        self.write_u32(event.unknown14)
        self.write_u32(event.spawn_event_id)
        self.write_u32(event.spawn_cond_val)
        self.write_u32(event.spawn_cond_type)
        self.write_u32(event.total_score)
        self.write_u32(event.unknown19)
        
        self.write_u32(event.variation_id)
        self.write_u32(event.variation_val)
        
        self.write_u32(event.unknown96)
        
        self.write_u32(len(event.world_name))
        if event.world_name:
            self.write_str(event.world_name)
            
        self.write_u32(len(event.start_stage))
        if event.start_stage:
            self.write_str(event.start_stage)
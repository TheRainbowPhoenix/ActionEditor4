#include <stdio.h>
#include <string.h>

#include <string>
#include <vector>

static unsigned int ENGINE_VERSION = 0;
static const unsigned int EDITOR_VERSION = 1020;
static int file_version_future = 0;
static int version_flag = 0;

static size_t ExclusiveRead(void *buffer, size_t element_size, size_t element_count, FILE *stream) {
  return fread(buffer, element_size, element_count, stream);
}

static size_t ExclusiveWrite(const void *buffer, size_t element_size, size_t element_count, FILE *stream) {
  return fwrite(buffer, element_size, element_count, stream);
}

static FILE *cSerial__OpenReadFileAndReadVersion(const char *path) {
  char local_path[260];
  FILE *stream;

  if (path && *path)
    strcpy(local_path, path);
  else
    strcpy(local_path, "err");

  stream = fopen(local_path, "rb");
  if (stream) {
    ExclusiveRead(&ENGINE_VERSION, 4, 1, stream);
    if (ENGINE_VERSION <= EDITOR_VERSION) {
      file_version_future = 0;
      return stream;
    }
    file_version_future = 1;
    fclose(stream);
    return 0;
  }
  return stream;
}

static FILE *cSerial__OpenWriteFileAndWriteVersion(const char *path) {
  FILE *stream = fopen(path, "wb");
  if (stream)
    ExclusiveWrite(&EDITOR_VERSION, 4, 1, stream);
  return stream;
}

static void CloseFile(FILE *stream) {
  if (stream)
    fclose(stream);
}

struct SerialBinaryFieldDesc {
  void *owner;
  void *target;
  unsigned int count;
  unsigned char elem_size;
  unsigned char pad0;
  unsigned short pad1;

  SerialBinaryFieldDesc() : owner(0), target(0), count(0), elem_size(0), pad0(0), pad1(0) {}
  SerialBinaryFieldDesc(void *owner_arg, void *target_arg, unsigned int count_arg, unsigned char elem_size_arg)
      : owner(owner_arg), target(target_arg), count(count_arg), elem_size(elem_size_arg), pad0(0), pad1(0) {}
};

struct SerialStringFieldDesc {
  void *owner;
  std::string *target;

  SerialStringFieldDesc() : owner(0), target(0) {}
  SerialStringFieldDesc(void *owner_arg, std::string *target_arg) : owner(owner_arg), target(target_arg) {}
};

class cSerial {
public:
  cSerial();
  virtual ~cSerial();
  virtual void RuntimeStub();
  virtual int Persist(unsigned int version);
  virtual int Read(FILE *stream);
  virtual int Write(FILE *stream);

  void ClearFieldRegistry();
  int RegisterDwordFields(void *target, int count);
  int RegisterStringFields(std::string *target, int count);
  int ReadRegisteredFields(FILE *stream);
  int ReadStringRegistry(FILE *stream);
  int WriteRegisteredFields(FILE *stream);
  int WriteStringRegistry(FILE *stream);
  void StripCarriageReturnsFromStrings();

private:
  std::vector<SerialBinaryFieldDesc> binary_fields_;
  std::vector<SerialStringFieldDesc> string_fields_;
};

cSerial::cSerial() : binary_fields_(), string_fields_() {
}

cSerial::~cSerial() {
}

void cSerial::RuntimeStub() {
}

int cSerial::Persist(unsigned int) {
  return 0;
}

int cSerial::Read(FILE *stream) {
  return ReadRegisteredFields(stream);
}

int cSerial::Write(FILE *) {
  return 0;
}

void cSerial::ClearFieldRegistry() {
  binary_fields_.clear();
  string_fields_.clear();
}

int cSerial::RegisterDwordFields(void *target, int count) {
  int i;
  for (i = 0; i < count; ++i)
    binary_fields_.push_back(SerialBinaryFieldDesc(this, (char *)target + 4 * i, 1, 4));
  return i;
}

int cSerial::RegisterStringFields(std::string *target, int count) {
  int i;
  for (i = 0; i < count; ++i)
    string_fields_.push_back(SerialStringFieldDesc(this, target + i));
  return i;
}

int cSerial::ReadRegisteredFields(FILE *stream) {
  signed int count = 0;
  signed int i;

  Persist(ENGINE_VERSION);
  ExclusiveRead(&count, 4, 1, stream);
  for (i = 0; i < count; ++i) {
    SerialBinaryFieldDesc &field = binary_fields_.at(i);
    ExclusiveRead(field.target, field.elem_size, field.count, stream);
  }

  ReadStringRegistry(stream);

  if (ENGINE_VERSION != EDITOR_VERSION)
    return Persist(EDITOR_VERSION);
  return EDITOR_VERSION;
}

int cSerial::ReadStringRegistry(FILE *stream) {
  signed int count = 0;
  signed int i;
  unsigned int length;
  char *buffer;
  unsigned int string_size;

  ExclusiveRead(&count, 4, 1, stream);
  for (i = 0; i < count; ++i) {
    SerialStringFieldDesc &field = string_fields_.at(i);
    std::string *target = field.target;
    ExclusiveRead(&length, 4, 1, stream);
    if (length == 1) {
      target->assign("");
    } else {
      buffer = new char[length];
      if (buffer) {
        ExclusiveRead(buffer, 1, length, stream);
        string_size = (unsigned int)strlen(buffer);
        target->assign(buffer, string_size);
        delete[] buffer;
      }
    }
  }
  if (version_flag)
    StripCarriageReturnsFromStrings();
  return version_flag;
}

int cSerial::WriteRegisteredFields(FILE *stream) {
  unsigned int count;
  unsigned int i;

  Persist(EDITOR_VERSION);
  count = (unsigned int)binary_fields_.size();
  ExclusiveWrite(&count, 4, 1, stream);
  for (i = 0; i < count; ++i) {
    SerialBinaryFieldDesc &field = binary_fields_.at(i);
    ExclusiveWrite(field.target, field.elem_size, field.count, stream);
  }
  return WriteStringRegistry(stream);
}

int cSerial::WriteStringRegistry(FILE *stream) {
  unsigned int count = (unsigned int)string_fields_.size();
  unsigned int i;
  unsigned int byte_count;

  ExclusiveWrite(&count, 4, 1, stream);
  for (i = 0; i < count; ++i) {
    SerialStringFieldDesc &field = string_fields_.at(i);
    std::string *target = field.target;
    byte_count = (unsigned int)target->size() + 1;
    ExclusiveWrite(&byte_count, 4, 1, stream);
    if (byte_count != 1)
      ExclusiveWrite(target->c_str(), 1, byte_count, stream);
  }
  return 1;
}

void cSerial::StripCarriageReturnsFromStrings() {
  std::vector<SerialStringFieldDesc>::iterator it;
  for (it = string_fields_.begin(); it != string_fields_.end(); ++it) {
    std::string *s = it->target;
    std::string::size_type pos = 0;
    while ((pos = s->find('\r', pos)) != std::string::npos)
      s->erase(pos, 1);
  }
}

class cEdPicture : public cSerial {
public:
  cEdPicture();
  virtual ~cEdPicture();
  virtual int Persist(unsigned int version);
  virtual int Read(FILE *stream);
  void ResetDefaults();

  std::string name;
  unsigned int is_name_same_path;
  std::string path;
};

cEdPicture::cEdPicture() : cSerial(), name(), is_name_same_path(0), path() {
  Persist(EDITOR_VERSION);
  ResetDefaults();
}

cEdPicture::~cEdPicture() {
}

int cEdPicture::Persist(unsigned int version) {
  ClearFieldRegistry();
  RegisterStringFields(&name, 1);
  if (version >= 151)
    RegisterDwordFields(&is_name_same_path, 1);
  return RegisterStringFields(&path, 1);
}

void cEdPicture::ResetDefaults() {
  is_name_same_path = 0;
}

int cEdPicture::Read(FILE *stream) {
  int result = ReadRegisteredFields(stream);
  if (ENGINE_VERSION < 153)
    is_name_same_path = 0;
  return result;
}

class cEdBgm : public cSerial {
public:
  cEdBgm();
  virtual ~cEdBgm();
  virtual int Persist(unsigned int version);
  virtual int Read(FILE *stream);
  void ResetDefaults();

  std::string name;
  unsigned int is_name_same_path;
  std::string path;
  unsigned int volume;
};

cEdBgm::cEdBgm() : cSerial(), name(), is_name_same_path(0), path(), volume(100) {
  Persist(EDITOR_VERSION);
  ResetDefaults();
}

cEdBgm::~cEdBgm() {
}

int cEdBgm::Persist(unsigned int version) {
  int result;
  ClearFieldRegistry();
  RegisterStringFields(&name, 1);
  if (version >= 151)
    RegisterDwordFields(&is_name_same_path, 1);
  result = RegisterStringFields(&path, 1);
  if (version >= 814)
    return RegisterDwordFields(&volume, 1);
  return result;
}

void cEdBgm::ResetDefaults() {
  is_name_same_path = 0;
  volume = 100;
}

int cEdBgm::Read(FILE *stream) {
  int result = ReadRegisteredFields(stream);
  if (ENGINE_VERSION < 153)
    is_name_same_path = 0;
  return result;
}

template <class T>
class SerializedVector : public std::vector<T> {
public:
  T *first();
  T *last();
  int ReadFromStream(FILE *stream);
  int WriteToStream(FILE *stream);
};

template <class T>
T *SerializedVector<T>::first() {
  return (T *)((void **)this)[1];
}

template <class T>
T *SerializedVector<T>::last() {
  return (T *)((void **)this)[2];
}

template <class T>
int SerializedVector<T>::ReadFromStream(FILE *stream) {
  signed int count = 0;
  T *it;
  T *it_last;

  int result = (int)ExclusiveRead(&count, 4, 1, stream);
  if (count > 0) {
    T value;
    this->resize(count, value);
    it = first();
    for (;;) {
      it_last = last();
      if (it == it_last)
        break;
      result = it->Read(stream);
      ++it;
    }
  }
  return result;
}

template <class T>
int SerializedVector<T>::WriteToStream(FILE *stream) {
  unsigned int count = (unsigned int)this->size();
  T *it;
  T *it_last;
  int result;

  result = (int)ExclusiveWrite(&count, 4, 1, stream);
  it = first();
  for (;;) {
    it_last = last();
    if (it == it_last)
      break;
    result = it->WriteRegisteredFields(stream);
    ++it;
  }
  return result;
}

typedef SerializedVector<cEdPicture> vector_PictureElement;
typedef SerializedVector<cEdBgm> vector_BgmElement;

template <class T>
static int Db_LoadFromPath(SerializedVector<T> *items, char *path) {
  T *it;
  FILE *stream = cSerial__OpenReadFileAndReadVersion(path);
  if (!stream)
    return 0;

  items->ReadFromStream(stream);
  if (version_flag) {
    for (it = items->empty() ? 0 : &(*items)[0];
         it && it != &(*items)[0] + items->size();
         ++it) {
      it->StripCarriageReturnsFromStrings();
    }
  }
  CloseFile(stream);
  return 1;
}

template <class T>
static int Db_WriteToPath(SerializedVector<T> *items, char *path) {
  FILE *stream = cSerial__OpenWriteFileAndWriteVersion(path);
  if (!stream)
    return 0;
  items->WriteToStream(stream);
  CloseFile(stream);
  return 1;
}

static long FileSize(FILE *stream) {
  long current = ftell(stream);
  long size;
  fseek(stream, 0, SEEK_END);
  size = ftell(stream);
  fseek(stream, current, SEEK_SET);
  return size;
}

extern "C" __declspec(dllexport) void __cdecl Probe_AfterPictureLoaded(vector_PictureElement *pictures) {
  volatile unsigned int count = (unsigned int)pictures->size();
  (void)count;
}

static const char *BaseName(const char *path) {
  const char *last_slash = strrchr(path, '\\');
  const char *last_fslash = strrchr(path, '/');
  const char *base = path;
  if (last_slash && last_slash + 1 > base)
    base = last_slash + 1;
  if (last_fslash && last_fslash + 1 > base)
    base = last_fslash + 1;
  return base;
}

static int HasPrefixNoCase(const char *text, const char *prefix) {
  while (*prefix && *text) {
    char a = *text++;
    char b = *prefix++;
    if (a >= 'A' && a <= 'Z')
      a = (char)(a - 'A' + 'a');
    if (b >= 'A' && b <= 'Z')
      b = (char)(b - 'A' + 'a');
    if (a != b)
      return 0;
  }
  return *prefix == 0;
}

static int ContainsNoCase(const char *text, const char *needle) {
  size_t needle_len = strlen(needle);
  if (!needle_len)
    return 1;
  for (; *text; ++text) {
    size_t i;
    for (i = 0; i < needle_len && text[i]; ++i) {
      char a = text[i];
      char b = needle[i];
      if (a >= 'A' && a <= 'Z')
        a = (char)(a - 'A' + 'a');
      if (b >= 'A' && b <= 'Z')
        b = (char)(b - 'A' + 'a');
      if (a != b)
        break;
    }
    if (i == needle_len)
      return 1;
  }
  return 0;
}

static void MakeRoundtripPath(char *out, const char *path) {
  sprintf(out, "work_aquedi\\cpp_experiments\\roundtrip_%s", BaseName(path));
}

static int RunPicture(const char *input_path) {
  char path[260];
  char out_path[300];
  vector_PictureElement pictures;

  strcpy(path, input_path);
  if (!Db_LoadFromPath(&pictures, path)) {
    printf("picture load failed path=%s future=%d version=%u\n", path, file_version_future, ENGINE_VERSION);
    return 1;
  }

  Probe_AfterPictureLoaded(&pictures);

  printf("picture path=%s version=%u count=%u\n", path, ENGINE_VERSION, (unsigned int)pictures.size());
  for (unsigned int i = 0; i < pictures.size(); ++i) {
    printf("  [%u] same=%u name='%s' path='%s'\n",
           i,
           pictures[i].is_name_same_path,
           pictures[i].name.c_str(),
           pictures[i].path.c_str());
  }

  MakeRoundtripPath(out_path, path);
  if (!Db_WriteToPath(&pictures, out_path)) {
    printf("picture write failed path=%s\n", out_path);
    return 1;
  }
  printf("  wrote=%s\n", out_path);
  return 0;
}

static int RunBgm(const char *input_path) {
  char path[260];
  char out_path[300];
  vector_BgmElement bgms;

  strcpy(path, input_path);
  if (!Db_LoadFromPath(&bgms, path)) {
    printf("bgm load failed path=%s future=%d version=%u\n", path, file_version_future, ENGINE_VERSION);
    return 1;
  }

  printf("bgm path=%s version=%u count=%u\n", path, ENGINE_VERSION, (unsigned int)bgms.size());
  for (unsigned int i = 0; i < bgms.size(); ++i) {
    printf("  [%u] same=%u volume=%u name='%s' path='%s'\n",
           i,
           bgms[i].is_name_same_path,
           bgms[i].volume,
           bgms[i].name.c_str(),
           bgms[i].path.c_str());
  }

  MakeRoundtripPath(out_path, path);
  if (!Db_WriteToPath(&bgms, out_path)) {
    printf("bgm write failed path=%s\n", out_path);
    return 1;
  }
  printf("  wrote=%s\n", out_path);
  return 0;
}

int main(int argc, char **argv) {
  char path[260];
  int rc = 0;

  printf("sizeof(cSerial)=%u sizeof(std::string)=%u sizeof(cEdPicture)=%u sizeof(cEdBgm)=%u\n",
         (unsigned int)sizeof(cSerial),
         (unsigned int)sizeof(std::string),
         (unsigned int)sizeof(cEdPicture),
         (unsigned int)sizeof(cEdBgm));

  if (argc > 1) {
    for (int argi = 1; argi < argc; ++argi) {
      strcpy(path, argv[argi]);
      if (ContainsNoCase(BaseName(path), "Bgm"))
        rc |= RunBgm(path);
      else
        rc |= RunPicture(path);
    }
    return rc;
  }

  rc |= RunPicture("data\\database\\Picture.dat");
  return rc;
  return 0;
}

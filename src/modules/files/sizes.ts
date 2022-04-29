class FileSizes {
  public getMbFromB(bytes: number) {
    return bytes / 1024;
  }

  public getBFromMb(megabytes: number) {
    return megabytes * 1024;
  }
}

export default FileSizes;

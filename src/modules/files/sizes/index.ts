class FileSizes {
  private static unitsNumber = 1024;

  public static getMbFromB(bytes: number) {
    return bytes / this.unitsNumber;
  }

  public static getBFromMb(megabytes: number) {
    return megabytes * this.unitsNumber;
  }
}

export default FileSizes;

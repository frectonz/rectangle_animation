export class Utility {
  static randomIntFromRange(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  static randomColors(colors) {
    return colors[Math.round(Math.random() * colors.length)];
  }

  static randomRGBA() {
    return `rgba( ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 1)})`;
  }
}

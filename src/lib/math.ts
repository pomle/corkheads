export class Vec {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set length(length) {
    this.normalize();
    this.x *= length;
    this.y *= length;
  }

  add(vec: Vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  subtract(vec: Vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  normalize() {
    const length = this.length;
    this.x /= length;
    this.y /= length;
  }
}

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

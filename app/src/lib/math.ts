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

type Rect = {
  x: number;
  y: number;
};

export function fitRect(rect: Rect, bounds: Rect): Rect {
  const aspectRatio = rect.x / rect.y;

  const size = {
    x: bounds.y * aspectRatio,
    y: bounds.x / aspectRatio,
  };

  if (size.y > bounds.y) {
    size.y = bounds.y;
  } else {
    size.x = bounds.x;
  }

  return { ...size };
}

export function shrinkToFitRect(rect: Rect, bounds: Rect): Rect {
  if (rect.x < bounds.x && rect.y < bounds.y) {
    return { ...rect };
  }

  return fitRect(rect, bounds);
}

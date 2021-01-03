type Size = {
  x: number;
  y: number;
};

export function fitRect(rect: Size, bounds: Size) {
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

import { useState, useEffect } from "react";

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 60000,
};

const geo = navigator.geolocation;

export const useGeolocation = (
  options: Partial<PositionOptions> = DEFAULT_OPTIONS
) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<PositionError | null>(null);

  useEffect(() => {
    const handleId = geo.watchPosition(setPosition, setError, options);
    return () => geo.clearWatch(handleId);
  }, [options, setError, setPosition]);

  return { position, error };
};

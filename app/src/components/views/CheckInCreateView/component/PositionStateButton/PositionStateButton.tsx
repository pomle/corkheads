import React, { useEffect, useState } from "react";
import StateButton from "components/ui/trigger/StateButton";
import { ReactComponent as CheckIcon } from "assets/graphics/icons/check.svg";
import { ReactComponent as PlusIcon } from "assets/graphics/icons/plus.svg";
import { useGeolocation } from "components/hooks/useGeolocation";
import { clonePosition } from "lib/geo";

const Coord: React.FC<{ coord: number }> = ({ coord }) => {
  const [a, b] = coord.toFixed(2).split(".");

  return (
    <>
      {a}°{b}
    </>
  );
};

const Coords: React.FC<{ position: Position }> = ({ position }) => {
  const coords = position.coords;

  return (
    <>
      <Coord coord={coords.longitude} />
      ,&nbsp;
      <Coord coord={coords.latitude} />
    </>
  );
};

interface PositionStateButtonProps {
  onChange: (position?: Position) => void;
}

const PositionStateButton: React.FC<PositionStateButtonProps> = ({
  onChange,
}) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const { position } = useGeolocation(enabled);

  useEffect(() => {
    if (enabled) {
      if (position) {
        onChange(clonePosition(position));
      }
    } else {
      onChange(undefined);
    }
  }, [onChange, enabled, position]);

  return (
    <StateButton
      state={enabled ? "on" : "off"}
      onClick={() => setEnabled((b) => !b)}
    >
      {enabled ? (
        <>
          <CheckIcon />{" "}
          {position ? <Coords position={position} /> : "Searching..."}
        </>
      ) : (
        <>
          <PlusIcon /> Tag location
        </>
      )}
    </StateButton>
  );
};

export default PositionStateButton;

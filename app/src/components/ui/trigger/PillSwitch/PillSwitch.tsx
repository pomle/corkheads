import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "components/ui/theme/themes";

const useStyles = makeStyles({
  PillSwitch: {
    background: Colors.X2,
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    position: "relative",
  },
  item: {
    alignItems: "center",
    display: "flex",
    color: Colors.X1,
    flex: "1",
    fontSize: "14px",
    justifyContent: "center",
    padding: "8px",
    position: "relative",
    transition: "color 0.5s",
    "&.active": {
      color: Colors.White,
    },
  },
  indicator: {
    background: Colors.Navy,
    boxSizing: "border-box",
    left: (props: StyleProps) =>
      `${(100 / props.itemCount) * props.selectedIndex}%`,
    position: "absolute",
    height: "100%",
    transition: "left 0.5s",
    width: (props: StyleProps) => `${100 / props.itemCount}%`,
  },
});

interface StyleProps {
  selectedIndex: number;
  itemCount: number;
}

interface PillSwitchItemProps<T> {
  value: T;
}

export const PillSwitchItem: React.FC<PillSwitchItemProps<any>> = ({
  children,
}) => {
  return <>{children}</>;
};

interface PillSwitchProps<T> {
  selected: T;
  onChange: (value: T) => void;
  children: React.ReactElement<PillSwitchItemProps<T>>[];
}

const PillSwitch: React.FC<PillSwitchProps<any>> = ({
  selected,
  onChange,
  children,
}) => {
  const items = React.Children.toArray(children) as React.ReactElement<
    PillSwitchItemProps<any>
  >[];
  const selectedIndex = items.findIndex(
    (child) => child.props.value === selected
  );
  const itemCount = items.length;
  const classes = useStyles({ selectedIndex, itemCount });

  return (
    <div className={classes.PillSwitch}>
      <div className={classes.indicator} />
      {items.map((child, index) => {
        const value = child.props.value;
        return (
          <button
            key={child.key || index}
            className={[
              classes.item,
              selectedIndex === index ? "active" : "inactive",
            ].join(" ")}
            type="button"
            onClick={() => onChange(value)}
          >
            {child}
          </button>
        );
      })}
    </div>
  );
};

export default PillSwitch;

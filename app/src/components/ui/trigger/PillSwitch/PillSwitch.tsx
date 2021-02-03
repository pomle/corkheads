import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  PillSwitch: {
    background: theme.color.panel,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    position: "relative",
  },
  item: {
    alignItems: "center",
    display: "flex",
    color: theme.color.text,
    flex: "1",
    fontSize: "14px",
    justifyContent: "center",
    padding: "8px",
    position: "relative",
    transition: "color 0.3s",
    "&.active": {
      color: theme.color.surface,
    },
  },
  indicator: {
    background: theme.color.action,
    boxSizing: "border-box",
    left: (props: StyleProps) =>
      `${(100 / props.itemCount) * props.selectedIndex}%`,
    position: "absolute",
    height: "100%",
    transition: "left 0.3s",
    width: (props: StyleProps) => `${100 / props.itemCount}%`,
  },
}));

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

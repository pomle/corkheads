import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

type StyleProps = {
  hasSymbol: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  Input: {
    display: "flex",
    position: "relative",
    "& > input": {
      color: theme.color.action,
      background: theme.color.panel,
      borderRadius: "4px",
      flex: "1",
      padding: "12px",
      paddingLeft: (props: StyleProps) => (props.hasSymbol ? "37px" : "12px"),
      transition: "box-shadow 0.1s",
      "&:focus": {
        boxShadow: "0 5px 8px #00000030",
      },
      "&::placeholder": {
        color: theme.color.text,
      },
    },
    "& .symbol": {
      position: "absolute",
      height: "1em",
      margin: "13px",
      width: "1em",
      "& svg": {
        height: "100%",
        width: "100%",
        "& path": {
          fill: theme.color.action,
        },
      },
    },
  },
}));

interface InputProps
  extends Omit<React.InputHTMLAttributes<unknown>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  symbol?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ symbol, onChange, ...props }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const classes = useStyles({ hasSymbol: !!symbol });

  return (
    <div className={classes.Input}>
      {symbol && <div className="symbol">{symbol}</div>}
      <input onChange={handleChange} {...props} />
    </div>
  );
};

export default Input;

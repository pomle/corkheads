import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Entry: {
    "& label": {
      alignItems: "center",
      display: "flex",
      margin: 0,
      padding: "12px 0",
      justifyContent: "space-between",
    },
    "& dt": {
      color: theme.color.text,
      flex: "0 1 auto",
      fontSize: "12px",
      fontWeight: 700,
      marginRight: "8px",
    },
    "& dd": {
      display: "flex",
      flex: "1",
      justifyContent: "stretch",
      "& input, & select": {
        background: "none",
        border: "none",
        color: theme.color.action,
        flex: "1",
        textAlign: "right",
        "&::placeholder": {
          color: theme.color.action + "90",
          fontWeight: 400,
        },
      },
    },
  },
}));

interface EntryProps {
  name: React.ReactNode;
}

const Entry: React.FC<EntryProps> = ({ name, children }) => {
  const classes = useStyles();
  return (
    <dl className={classes.Entry}>
      <label>
        <dt>{name}</dt>
        <dd>{children}</dd>
      </label>
    </dl>
  );
};

export default Entry;

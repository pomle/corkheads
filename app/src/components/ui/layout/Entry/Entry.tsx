import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Entry: {
    "& th": {
      color: "#838383",
      fontSize: "16px",
      fontWeight: 400,
      textAlign: "left",
    },
    "& td": {
      alignItems: "center",
      display: "flex",
      "& input": {
        background: "none",
        border: "none",
        color: "#ff6a41",
        flex: 1,
        fontSize: "16px",
        padding: "8px 0",
        textAlign: "right",
        "&::placeholder": {
          color: "#ff6a41",
        },
      },
    },
  },
});

interface EntryProps {
  name: React.ReactNode;
}

const Entry: React.FC<EntryProps> = ({ name, children }) => {
  const classes = useStyles();
  return (
    <tr className={classes.Entry}>
      <th>{name}</th>
      <td>{children}</td>
    </tr>
  );
};

export default Entry;

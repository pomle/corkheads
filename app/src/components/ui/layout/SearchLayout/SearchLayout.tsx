import React from "react";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewBody from "components/ui/layout/ViewBody";
import LineThrobber from "components/ui/throbbers/LineThrobber";

const useStyles = makeStyles({
  searchBar: {
    marginTop: "12px",
  },
  busy: {
    position: "fixed",
    width: "100%",
  },
});

interface SearchLayoutProps {
  busy: boolean;
  children: [React.ReactNode, React.ReactNode];
}

const SearchLayout: React.FC<SearchLayoutProps> = ({
  busy,
  children: [head, body],
}) => {
  const classes = useStyles();

  return (
    <HeaderLayout>
      {head}
      <ViewBody>
        <div className={classes.busy}>{busy && <LineThrobber />}</div>
        {body}
      </ViewBody>
    </HeaderLayout>
  );
};

export default SearchLayout;

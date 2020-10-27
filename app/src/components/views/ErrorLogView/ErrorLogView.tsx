import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewTitle from "components/ui/layout/ViewTitle";
import ViewBody from "components/ui/layout/ViewBody";
import ErrorEntryMessage from "components/fragments/Error/ErrorEntry";
import { useErrorHandler } from "components/context/ErrorContext";
import makeStyles from "@material-ui/styles/makeStyles";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  errors: {
    display: "grid",
    gridGap: 20,
    padding: 20,
    pointerEvents: "all"
  },
  control: {
    display: "flex",
    justifyContent: "center",
    padding: 20
  }
});

interface ErrorViewProps {
  nav: React.ReactNode;
}

const ErrorLogView: React.FC<ErrorViewProps> = ({ nav }) => {
  const classes = useStyles();
  const { entries, clear } = useErrorHandler();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Errors" />
      </ViewCap>
      <ViewBody>
        <div className={classes.errors}>
          {entries.map(entry => {
            return <ErrorEntryMessage key={entry.id} errorEntry={entry} />;
          })}
        </div>
        <div className={classes.control}>
          <ActionButton
            variant="danger"
            disabled={entries.length === 0}
            onClick={clear}
          >
            Clear All Errors
          </ActionButton>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ErrorLogView;

import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import Input from "components/ui/input/Input/Input";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import { useUser } from "components/hooks/db/useUsers";

const useStyles = makeStyles({
  form: {
    padding: "24px",
    "& > .content": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
    },
    "& .fields": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
    },
    "& input": {
      fontSize: "16px",
    },
    "& .photo": {},
  },
});

interface UserSettingsViewProps {
  nav: React.ReactNode;
  userId: string;
}

const UserSettingsView: React.FC<UserSettingsViewProps> = ({ nav, userId }) => {
  const userEntry = useUser(userId);
  const user = userEntry?.data;
  const profile = user?.profile;

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        {nav}
        <ViewTitle title="Settings" />
      </ViewCap>

      <ViewBody>
        <form className={classes.form}>
          <div className="content">
            <div className="fields">
              <Input
                type="text"
                placeholder="Display name"
                value={profile?.displayName || ""}
                onChange={() => undefined}
              />

              <Input
                type="text"
                placeholder="Username"
                value={user?.username || ""}
                onChange={() => undefined}
              />
            </div>
          </div>
        </form>
      </ViewBody>
    </HeaderLayout>
  );
};

export default UserSettingsView;

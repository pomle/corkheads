import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import { useUser } from "components/hooks/db/useUsers";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import config from "config/app.config.js";

const useStyles = makeStyles({
  form: {
    padding: "8px 24px",
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
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewTitle title="Settings" />
        </ViewCap>

        <ViewBody>
          <form className={classes.form}>
            <EntryList>
              <Entry name="Name">
                <input
                  type="text"
                  placeholder="Drinker Drinkinsson"
                  value={profile?.displayName || ""}
                  onChange={() => undefined}
                />
              </Entry>
              <Entry name="Username">
                <input
                  type="text"
                  placeholder="@"
                  value={user?.username || ""}
                  onChange={() => undefined}
                />
              </Entry>
              <Entry name="Version">
                <code>{config.version}</code>
              </Entry>
            </EntryList>
          </form>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserSettingsView;

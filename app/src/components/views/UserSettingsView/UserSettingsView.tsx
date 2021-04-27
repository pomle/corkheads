import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { useUserInput } from "components/hooks/useUserInput";
import config from "config/app.config.js";
import { toEntries, toUser } from "./conversion";
import { useProfile } from "./hooks";
import ButtonSet from "components/ui/layout/ButtonSet";
import NavButton from "components/ui/trigger/NavButton";
import { ReactComponent as SignOutIcon } from "assets/graphics/icons/signout.svg";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";
import { useBack } from "components/context/ScreenContext";
import BackButton from "components/ui/trigger/BackButton";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridGap: "32px",
  },
});

interface UserSettingsViewProps {
  userId: string;
}

const UserSettingsView: React.FC<UserSettingsViewProps> = ({ userId }) => {
  const signOut = useExplicitLogout();

  const goBack = useBack();

  const { user, handleUserChange } = useProfile(userId);

  const entries = useMemo(() => {
    return toEntries(user);
  }, [user]);

  const userInput = useUserInput(entries, (entries) => {
    handleUserChange(toUser(entries));
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout
        nav={{ back: <BackButton onClick={goBack} /> }}
        title="Settings"
      >
        <form className={classes.form}>
          <EntryList>
            <Entry name="Name">
              <input type="text" placeholder="Your name" {...userInput.name} />
            </Entry>
            <Entry name="Username">
              <input
                type="text"
                pattern="[^A-Za-z0-9\-\.]"
                placeholder="@"
                {...userInput.username}
              />
            </Entry>
            <Entry name="Version">
              <code>{config.version}</code>
            </Entry>
          </EntryList>

          <ButtonSet>
            <NavButton icon={<SignOutIcon />} onClick={signOut}>
              Sign out
            </NavButton>
          </ButtonSet>
        </form>
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserSettingsView;

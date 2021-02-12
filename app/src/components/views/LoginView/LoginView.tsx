import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from "assets/graphics/corkheads-logo.svg";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { useSession } from "components/context/SessionContext";
import { useSharedInput } from "components/hooks/useSharedInput";
import ButtonSet from "components/ui/layout/ButtonSet";
import ViewBody from "components/ui/layout/ViewBody";
import ActionButton from "components/ui/trigger/ActionButton";
import Input from "components/ui/input/Input/Input";
import { ReactComponent as EmailIcon } from "assets/graphics/icons/envelope.svg";
import { ReactComponent as PasswordIcon } from "assets/graphics/icons/padlock.svg";
import * as Text from "./locales";
import { isEmailValid } from "lib/email";
import { Theme } from "components/ui/theme/themes";
import {
  AccountState,
  useDevicePreference,
} from "components/hooks/store/useDevicePreferences";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import Divider from "components/ui/layout/Divider";
import { useMessageDialog } from "components/hooks/useMessageDialog";

const useStyles = makeStyles((theme: Theme) => ({
  LoginView: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    height: "100%",
    justifyContent: "center",
    padding: "24px",
  },
  form: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    width: "100%",
  },
  logo: {
    margin: "auto",
  },
  fields: {
    display: "grid",
    gridGap: 16,
    margin: "24px 0",
    width: "100%",
  },
  resetCallToAction: {
    fontSize: "16px",
    padding: "32px",
    "& em": {
      color: theme.color.action,
    },
  },
}));

interface LoginViewProps {
  routes: {
    signUp: () => void;
    reset: () => void;
  };
}

const LoginView: React.FC<LoginViewProps> = ({ routes }) => {
  const session = useSession();

  const { publishMessage } = useMessageDialog();

  const [, setAccountState] = useDevicePreference("accountState");
  const [email, setEmail] = useSharedInput("user-login-email", "");
  const [password, setPassword] = useState<string>("");

  const handleLogin = useAsyncCallback(
    useCallback(() => {
      return session.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setAccountState(AccountState.Created);
        })
        .catch((error: Error) => {
          publishMessage(error.message);
        });
    }, [session, email, password, setAccountState])
  );

  const classes = useStyles();

  const canAttemptLogin =
    !handleLogin.busy && isEmailValid(email) && password.length > 0;

  return (
    <HeaderLayout>
      <ViewCap>
        <NavigationBar back={<BackButton onClick={routes.signUp} />} />
      </ViewCap>
      <ViewBody>
        <div className={classes.LoginView}>
          <div className={classes.logo}>
            <Logo width="140" height="140" />
          </div>

          <form className={classes.form}>
            <div className={classes.fields}>
              <Input
                symbol={<EmailIcon />}
                type="email"
                name="login-email"
                placeholder="Email"
                autoComplete="login-email"
                value={email}
                onChange={setEmail}
              />

              <Input
                symbol={<PasswordIcon />}
                type="password"
                name="login-password"
                placeholder="Password"
                autoComplete="login-password"
                value={password}
                onChange={setPassword}
              />

              <ButtonSet>
                <ActionButton
                  onClick={handleLogin.callback}
                  disabled={!canAttemptLogin}
                >
                  <Text.DoLogin />
                </ActionButton>
              </ButtonSet>
            </div>
            <Divider />
            <div className={classes.resetCallToAction}>
              <button type="button" onClick={routes.reset}>
                Reset password
              </button>
            </div>
          </form>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default LoginView;

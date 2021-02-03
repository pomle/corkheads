import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from "assets/graphics/corkheads-logo.svg";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { useSession } from "components/context/SessionContext";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import { useSharedInput } from "components/hooks/useSharedInput";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ButtonSet from "components/ui/layout/ButtonSet";
import ViewBody from "components/ui/layout/ViewBody";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import ActionButton from "components/ui/trigger/ActionButton";
import Input from "components/ui/input/Input/Input";
import { ReactComponent as EmailIcon } from "assets/graphics/icons/envelope.svg";
import { ReactComponent as PasswordIcon } from "assets/graphics/icons/padlock.svg";
import config from "config/app.config.js";
import * as Text from "./locales";
import { isEmailValid } from "lib/email";

const version = config.version;

const useStyles = makeStyles({
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
  forgotPassword: {
    fontSize: "16px",
    margin: "16px",
  },
  version: {
    color: "#3d435199",
    fontSize: "9px",
    fontWeight: 500,
  },
});

interface LoginViewProps {}

const LoginView: React.FC<LoginViewProps> = () => {
  const session = useSession();

  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);

  const [email, setEmail] = useSharedInput("user-login-email", "");
  const [password, setPassword] = useState<string>("");

  const handleLogin = useAsyncCallback(
    useCallback(() => {
      return session.auth
        .signInWithEmailAndPassword(email, password)
        .catch((error: Error) => {
          console.error(error);
        });
    }, [session, email, password])
  );

  const handleReset = useCallback(async () => {
    setShowPasswordReset(true);
  }, [setShowPasswordReset]);

  const classes = useStyles();

  const canAttemptLogin =
    !handleLogin.busy && isEmailValid(email) && password.length > 0;

  return (
    <ViewStack>
      <FullScreenLayout>
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
                    variant="action"
                    onClick={handleLogin.callback}
                    disabled={!canAttemptLogin}
                  >
                    <Text.DoLogin />
                  </ActionButton>
                </ButtonSet>
              </div>

              <button
                type="button"
                className={classes.forgotPassword}
                onClick={handleReset}
              >
                <Text.ForgotPassword />
              </button>
            </form>

            <div className={classes.version}>Version: {version}</div>
          </div>
        </ViewBody>
      </FullScreenLayout>

      <SlideRight active={showPasswordReset}>
        <ResetPasswordView
          nav={
            <NavigationBar
              back={
                <BackButton onClick={() => setShowPasswordReset(false)}>
                  <Text.DoLogin />
                </BackButton>
              }
            />
          }
        />
      </SlideRight>
    </ViewStack>
  );
};

export default LoginView;

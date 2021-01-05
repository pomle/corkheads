import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from "assets/graphics/corkheads-logo.svg";
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

const version = config.version;

const useStyles = makeStyles({
  loginView: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    height: "100%",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    width: 280,
  },
  logo: {
    margin: 16,
  },
  fields: {
    display: "grid",
    gridGap: 16,
    margin: "24px 0",
    width: "100%",
  },
  forgotPassword: {
    fontSize: 16,
    marginTop: 20,
  },
  version: {
    color: "#3d435199",
    fontSize: "9px",
    fontWeight: 500,
    margin: "16px",
  },
});

interface Credentials {
  username: string;
  password: string;
}

interface LoginViewProps {
  onSubmit: (credentials: Credentials) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSubmit }) => {
  const classes = useStyles();

  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);

  const [email, setEmail] = useSharedInput("user-login-email", "");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = useCallback(() => {
    onSubmit({ username: email, password: password });
  }, [email, onSubmit, password]);

  const handleReset = useCallback(async () => {
    setShowPasswordReset(true);
  }, [setShowPasswordReset]);

  const canAttemptLogin = email.length > 0 && password.length > 0;

  return (
    <ViewStack>
      <FullScreenLayout>
        <ViewBody>
          <div className={classes.loginView}>
            <form className={classes.content}>
              <div className={classes.logo}>
                <Logo width="200" height="200" />
              </div>

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
                    onClick={handleSubmit}
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

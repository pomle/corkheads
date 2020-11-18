import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import logo from "assets/graphics/corkheads-logo.png";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import { useSharedInput } from "components/hooks/useSharedInput";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ButtonSet from "components/ui/layout/ButtonSet";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import * as Text from "./locales";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  loginView: {
    alignItems: "center",
    background: "#e2e2e2",
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
        <div className={classes.loginView}>
          <form className={classes.content}>
            <div className={classes.logo}>
              <img src={logo} alt="Corkheads logo" width="200" height="200" />
            </div>

            <div className={classes.fields}>
              <input
                type="email"
                name="login-email"
                placeholder="Email"
                autoComplete="login-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                type="password"
                name="login-password"
                placeholder="Password"
                autoComplete="login-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
        </div>
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

import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import logo from "assets/graphics/corkheads-logo.png";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Field from "components/ui/layout/Field";
import { useSharedInput } from "components/hooks/useSharedInput";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ButtonSet from "components/ui/layout/ButtonSet";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import * as Text from "./locales";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    background: "#FFF",
    display: "flex",
    flexFlow: "column",
    height: "100%",
    justifyContent: "center"
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    width: 280
  },
  logo: {
    margin: 20
  },
  fields: {
    display: "grid",
    gridGap: 20,
    margin: "40px 0",
    width: "100%"
  },
  button: {
    background: "#5ADC9B",
    borderRadius: 24,
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    height: 48,
    width: 145,
    "&[disabled]": {
      background: "#EAEAEA",
      color: "#999999"
    }
  },
  forgotPassword: {
    fontSize: 14,
    marginTop: 20
  }
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
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.logo}>
              <img src={logo} alt="Corkheads logo" width="240" height="240" />
            </div>

            <div className={classes.fields}>
              <Field legend={<Text.Email />}>
                <input
                  type="email"
                  name="einride-login-username"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Field>

              <Field legend={<Text.Password />}>
                <input
                  type="password"
                  name="einride-login-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Field>
            </div>

            <ButtonSet>
              <button
                type="button"
                className={classes.button}
                onClick={handleSubmit}
                disabled={!canAttemptLogin}
              >
                <Text.DoLogin />
              </button>
            </ButtonSet>

            <button
              type="button"
              className={classes.forgotPassword}
              onClick={handleReset}
            >
              <Text.ForgotPassword />
            </button>
          </div>
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

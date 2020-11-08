import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import logo from "assets/graphics/corkheads-logo.png";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import { useDevicePreference } from "components/hooks/store/useDevicePreferences";
import Field from "components/ui/layout/Field";
import ButtonSet from "components/ui/layout/ButtonSet";
import * as Text from "./locales";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    background: "#FFF",
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
    margin: 20,
  },
  fields: {
    display: "grid",
    gridGap: 20,
    margin: "40px 0",
    width: "100%",
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
      color: "#999999",
    },
  },
  forgotPassword: {
    fontSize: 14,
    marginTop: 20,
  },
});

interface Credentials {
  email: string;
}

interface LoginViewProps {
  onSubmit: (credentials: Credentials) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSubmit }) => {
  const [email, setEmail] = useDevicePreference("email");

  const handleSubmit = useCallback(() => {
    onSubmit({ email });
  }, [email, onSubmit]);

  const canAttemptLogin = email.length >= 5;

  const classes = useStyles();

  return (
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
                name="login-username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default LoginView;

import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSharedInput } from "components/hooks/useSharedInput";
import ButtonSet from "components/ui/layout/ButtonSet";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import ViewBody from "components/ui/layout/ViewBody";
import { useAutoClearState } from "components/hooks/useAutoClearState";
import { useAuth } from "components/hooks/useAuth";
import { ReactComponent as EmailIcon } from "assets/graphics/icons/envelope.svg";
import ActionButton from "components/ui/trigger/ActionButton";
import Input from "components/ui/input/Input/Input";
import { isEmailValid } from "lib/email";

const useStyles = makeStyles({
  ResetPasswordView: {
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
  fields: {
    display: "grid",
    gridGap: 16,
    margin: "24px 0",
    width: "100%",
  },
  completeMessage: {
    fontSize: 14,
    margin: 20,
  },
});

interface ResetPasswordViewProps {
  routes: {
    login: () => void;
  };
}

const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({ routes }) => {
  const classes = useStyles();

  const auth = useAuth();

  const [wasSent, setWasSent] = useAutoClearState<boolean>(5000, false);

  const [email, setEmail] = useSharedInput("user-login-email", "");

  const handleReset = useCallback(() => {
    auth.sendPasswordResetEmail(email).finally(() => {
      setWasSent(true);
    });
  }, [email, auth, setWasSent]);

  const canAttemptReset = isEmailValid(email);

  return (
    <FullScreenLayout>
      <ViewBody>
        <div className={classes.ResetPasswordView}>
          <form className={classes.form}>
            <div className={classes.fields}>
              <Input
                symbol={<EmailIcon />}
                type="email"
                name="reset-password-email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
              />

              <ButtonSet>
                <ActionButton
                  variant="action"
                  onClick={handleReset}
                  disabled={!canAttemptReset}
                >
                  Send Instructions
                </ActionButton>
              </ButtonSet>
            </div>

            {wasSent && (
              <p className={classes.completeMessage}>
                An email with instructions have been sent to <b>{email}</b>.
              </p>
            )}
          </form>
        </div>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ResetPasswordView;

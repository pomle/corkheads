import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSharedInput } from "components/hooks/useSharedInput";
import ButtonSet from "components/ui/layout/ButtonSet";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { useAutoClearState } from "components/hooks/useAutoClearState";
import { useAuth } from "components/hooks/useAuth";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  resetPasswordView: {
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
    margin: 20,
  },
  fields: {
    display: "grid",
    gridGap: 20,
    margin: "40px 0",
    width: "100%",
  },
  completeMessage: {
    fontSize: 14,
    margin: 20,
  },
});

interface ResetPasswordViewProps {
  nav: React.ReactNode;
}

const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({ nav }) => {
  const classes = useStyles();

  const auth = useAuth();

  const [wasSent, setWasSent] = useAutoClearState<boolean>(5000, false);

  const [email, setEmail] = useSharedInput("user-login-email", "");

  const handleReset = useCallback(() => {
    auth.sendPasswordResetEmail(email).finally(() => {
      setWasSent(true);
    });
  }, [email, auth, setWasSent]);

  const canAttemptReset = email.length > 0;

  return (
    <HeaderLayout>
      <ViewCap>{nav}</ViewCap>
      <ViewBody>
        <div className={classes.resetPasswordView}>
          <div className={classes.content}>
            <div className={classes.fields}>
              <input
                type="email"
                name="reset-password-email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
          </div>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ResetPasswordView;

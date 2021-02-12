import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSharedInput } from "components/hooks/useSharedInput";
import ButtonSet from "components/ui/layout/ButtonSet";
import ViewBody from "components/ui/layout/ViewBody";
import { useAuth } from "components/hooks/useAuth";
import { ReactComponent as EmailIcon } from "assets/graphics/icons/envelope.svg";
import ActionButton from "components/ui/trigger/ActionButton";
import Input from "components/ui/input/Input/Input";
import { isEmailValid } from "lib/email";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ViewCap from "components/ui/layout/ViewCap";
import { useMessageDialog } from "components/hooks/useMessageDialog";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";

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
  const auth = useAuth();

  const { publishMessage } = useMessageDialog();

  const [email, setEmail] = useSharedInput("user-login-email", "");

  const handleReset = useAsyncCallback(
    useCallback(() => {
      return auth
        .sendPasswordResetEmail(email)
        .then(() => {
          publishMessage(
            <>
              An email with instructions have been sent to <b>{email}</b>.
            </>
          );
        })
        .catch((error) => {
          publishMessage(error.message);
        });
    }, [email, auth, useMessageDialog])
  );

  const canAttemptReset = isEmailValid(email) && !handleReset.busy;

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        <NavigationBar back={<BackButton onClick={routes.login} />} />
      </ViewCap>
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
                  onClick={handleReset.callback}
                  disabled={!canAttemptReset}
                >
                  Send Instructions
                </ActionButton>
              </ButtonSet>
            </div>
          </form>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ResetPasswordView;

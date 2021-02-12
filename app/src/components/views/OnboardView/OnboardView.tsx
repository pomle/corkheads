import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from "assets/graphics/corkheads-logo.svg";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import { useSharedInput } from "components/hooks/useSharedInput";
import ButtonSet from "components/ui/layout/ButtonSet";
import ViewBody from "components/ui/layout/ViewBody";
import ActionButton from "components/ui/trigger/ActionButton";
import Input from "components/ui/input/Input/Input";
import { isEmailValid } from "lib/email";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { useSession } from "components/context/SessionContext";
import { createRandomPassword } from "lib/random";
import { ReactComponent as EmailIcon } from "assets/graphics/icons/envelope.svg";
import { useMessageDialog } from "components/hooks/useMessageDialog";
import { Theme } from "components/ui/theme/themes";
import {
  AccountState,
  useDevicePreference,
} from "components/hooks/store/useDevicePreferences";
import Divider from "components/ui/layout/Divider";
import { usePopupDialog } from "components/context/PopupDialogContext";
import ConfirmCreateAccountDialog from "./components/ConfirmCreateAccountDialog";

const useStyles = makeStyles((theme: Theme) => ({
  OnboardView: {
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
  loginCallToAction: {
    fontSize: "16px",
    padding: "32px",
    "& em": {
      color: theme.color.action,
    },
  },
}));

interface OnboardViewProps {
  routes: {
    login: () => void;
  };
}

const OnboardView: React.FC<OnboardViewProps> = ({ routes }) => {
  const session = useSession();
  const popupDialog = usePopupDialog();

  const { publishMessage } = useMessageDialog();

  const [, setAccountState] = useDevicePreference("accountState");
  const [email, setEmail] = useSharedInput("user-login-email", "");

  const handleSignUp = useAsyncCallback(
    useCallback(() => {
      const password = createRandomPassword(32);
      return session.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setAccountState(AccountState.Created);
          publishMessage(
            <>
              Your account was successfully created!
              <br />
              Welcome <b>{email}</b>!
            </>
          );
        })
        .catch((error: Error) => {
          publishMessage(error.message);
        });
    }, [session, email, setAccountState])
  );

  const handleCreate = useCallback(() => {
    const handleConfirm = () => {
      popupDialog.clear();
      handleSignUp.callback();
    };

    popupDialog.publish(
      <ConfirmCreateAccountDialog
        email={email}
        onConfirm={handleConfirm}
        onCancel={popupDialog.clear}
      />
    );
  }, [email, handleSignUp, popupDialog]);

  const canAttemptCreate = isEmailValid(email);

  const classes = useStyles();

  return (
    <FullScreenLayout>
      <ViewBody>
        <div className={classes.OnboardView}>
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

              <ButtonSet>
                <ActionButton
                  onClick={handleCreate}
                  disabled={!canAttemptCreate}
                >
                  Create account
                </ActionButton>
              </ButtonSet>
            </div>

            <Divider />

            <div className={classes.loginCallToAction}>
              Already have an account?&nbsp;
              <button type="button" onClick={routes.login}>
                <em>Sign in</em>
              </button>
            </div>
          </form>
        </div>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default OnboardView;

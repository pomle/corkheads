import React, { useCallback, useEffect, useMemo } from "react";
import ViewStack from "components/ui/layout/ViewStack";
import LoginView from "components/views/LoginView";
import BusyView from "components/views/BusyView";
import Fade from "components/ui/transitions/Fade";
import { useHandler } from "components/hooks/useHandler";
import { useAuth } from "components/hooks/useAuth";
import { useDevicePreference } from "components/hooks/store/useDevicePreferences";

const AuthenticationView: React.FC = () => {
  const { auth } = useAuth();

  const [email] = useDevicePreference("email");

  const emailLink = useMemo(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      return window.location.href;
    }
  }, [auth]);

  const sendLink = useCallback(
    (email: string) => {
      return auth.sendSignInLinkToEmail(email, {
        url: window.location.toString(),
        handleCodeInApp: true,
      });
    },
    [auth]
  );

  const signIn = useCallback(
    (email: string, emailLink: string) => {
      return auth.signInWithEmailLink(email, emailLink);
    },
    [auth]
  );

  const submit = useCallback(
    async (cred: { email: string }) => {
      if (emailLink) {
        await signIn(cred.email, emailLink);
        return;
      }
      await sendLink(cred.email);
      return;
    },
    [signIn, sendLink, emailLink]
  );

  const submitHandle = useHandler(submit);

  useEffect(() => {
    if (email.length && emailLink) {
      submitHandle.callback({ email });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const shouldPromptUser = !submitHandle.busy && !auth.currentUser;

  return (
    <ViewStack>
      <BusyView />
      <Fade active={shouldPromptUser}>
        <LoginView onSubmit={submitHandle.callback} />
      </Fade>
    </ViewStack>
  );
};

export default AuthenticationView;

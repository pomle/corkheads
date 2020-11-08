import React, { useCallback } from "react";
import ViewStack from "components/ui/layout/ViewStack";
import LoginView from "components/views/LoginView";
import BusyView from "components/views/BusyView";
import Fade from "components/ui/transitions/Fade";
import { useHandler } from "components/hooks/useHandler";
import { useAuth } from "components/hooks/useAuth";

const AuthenticationView: React.FC = () => {
  const { auth } = useAuth();

  const submitHandle = useHandler(
    useCallback(
      (credentials: { username: string; password: string }) => {
        return auth.signInWithEmailAndPassword(
          credentials.username,
          credentials.password
        );
      },
      [auth]
    )
  );

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

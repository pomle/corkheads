import React, { useCallback } from "react";
import LoginView from "components/views/LoginView";
import { useHandler } from "components/hooks/useHandler";
import { useAuth } from "components/hooks/useAuth";
import Lock from "components/ui/transitions/Lock";

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
    <Lock active={shouldPromptUser}>
      <LoginView onSubmit={submitHandle.callback} />
    </Lock>
  );
};

export default AuthenticationView;

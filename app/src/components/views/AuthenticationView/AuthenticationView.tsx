import React, { useCallback } from "react";
import LoginView from "components/views/LoginView";
import { useHandler } from "components/hooks/useHandler";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";

const AuthenticationView: React.FC = () => {
  const session = useSession();

  const submitHandle = useHandler(
    useCallback(
      (credentials: { username: string; password: string }) => {
        return session.auth.signInWithEmailAndPassword(
          credentials.username,
          credentials.password
        );
      },
      [session]
    )
  );

  const shouldPromptUser = session.ready && !session.user && !submitHandle.busy;

  return (
    <Lock active={shouldPromptUser}>
      <LoginView onSubmit={submitHandle.callback} />
    </Lock>
  );
};

export default AuthenticationView;

import React, { useCallback } from "react";
import LoginView from "components/views/LoginView";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";

const AuthenticationView: React.FC = () => {
  const session = useSession();

  const submitHandle = useAsyncCallback(
    useCallback(
      (credentials: { username: string; password: string }) => {
        return session.auth
          .signInWithEmailAndPassword(
            credentials.username,
            credentials.password
          )
          .catch((error) => {
            console.error(error);
          });
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

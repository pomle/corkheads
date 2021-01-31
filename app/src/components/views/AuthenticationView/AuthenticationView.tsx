import React from "react";
import LoginView from "components/views/LoginView";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";

const AuthenticationView: React.FC = () => {
  const session = useSession();

  const shouldPromptUser = session.ready && !session.user;

  return (
    <Lock active={shouldPromptUser}>
      <LoginView />
    </Lock>
  );
};

export default AuthenticationView;

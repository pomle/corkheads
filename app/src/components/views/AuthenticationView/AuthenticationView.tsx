import React, { useMemo, useState } from "react";
import LoginView from "components/views//LoginView";
import OnboardView from "components/views/OnboardView";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import SlidingWindow from "components/ui/transitions/SlidingWindow";
import {
  AccountState,
  useDevicePreference,
} from "components/hooks/store/useDevicePreferences";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";

enum Section {
  Onboard,
  Login,
  PasswordReset,
}

const AuthenticationView: React.FC = () => {
  const session = useSession();
  const [accountState] = useDevicePreference("accountState");

  const initialSection = useMemo(() => {
    if (accountState === AccountState.None) {
      return Section.Onboard;
    }
    return Section.Login;
  }, [accountState]);

  const [section, setSection] = useState<Section>(initialSection);

  const routes = useMemo(() => {
    return {
      login: () => setSection(Section.Login),
      signUp: () => setSection(Section.Onboard),
      reset: () => setSection(Section.PasswordReset),
    };
  }, [setSection]);

  const shouldPromptUser = session.ready && !session.user;

  return (
    <Lock active={shouldPromptUser}>
      <FullScreenLayout>
        <SlidingWindow activeIndex={section}>
          <OnboardView routes={routes} />
          <LoginView routes={routes} />
          <ResetPasswordView routes={routes} />
        </SlidingWindow>
      </FullScreenLayout>
    </Lock>
  );
};

export default AuthenticationView;

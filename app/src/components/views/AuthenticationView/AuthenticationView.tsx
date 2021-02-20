import React, { useEffect, useMemo, useState } from "react";
import BusyView from "components/views/BusyView";
import LoginView from "components/views/LoginView";
import OnboardView from "components/views/OnboardView";
import { useSession } from "components/context/SessionContext";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import SlidingWindow from "components/ui/transitions/SlidingWindow";
import {
  AccountState,
  useDevicePreference,
} from "components/hooks/store/useDevicePreferences";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import ViewStack from "components/ui/layout/ViewStack";
import Fade from "components/ui/transitions/Fade";

enum Section {
  Onboard,
  Login,
  PasswordReset,
}

const SECTION_MAP: Record<AccountState, Section> = {
  [AccountState.None]: Section.Onboard,
  [AccountState.Created]: Section.Login,
};

function resolveSection(state: AccountState): Section {
  return SECTION_MAP[state] || Section.Login;
}

const AuthenticationView: React.FC = () => {
  const session = useSession();
  const [accountState] = useDevicePreference("accountState");

  const initialSection = useMemo(() => resolveSection(accountState), [
    accountState,
  ]);

  const [section, setSection] = useState<Section>(initialSection);

  useEffect(() => {
    setSection(resolveSection(accountState));
  }, [accountState]);

  const routes = useMemo(() => {
    return {
      login: () => setSection(Section.Login),
      signUp: () => setSection(Section.Onboard),
      reset: () => setSection(Section.PasswordReset),
    };
  }, [setSection]);

  const shouldPromptUser = session.ready && !session.user;

  return (
    <ViewStack>
      <FullScreenLayout>
        <SlidingWindow activeIndex={section}>
          <OnboardView routes={routes} />
          <LoginView routes={routes} />
          <ResetPasswordView routes={routes} />
        </SlidingWindow>
      </FullScreenLayout>
      <Fade active={!shouldPromptUser}>
        <BusyView />
      </Fade>
    </ViewStack>
  );
};

export default AuthenticationView;

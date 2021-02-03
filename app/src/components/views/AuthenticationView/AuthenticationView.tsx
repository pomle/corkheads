import React, { useMemo, useState } from "react";
import LoginView from "components/views//LoginView";
import OnboardView from "components/views/OnboardView";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";
import ResetPasswordView from "../ResetPasswordView/ResetPasswordView";
import PillSwitch, { PillSwitchItem } from "components/ui/trigger/PillSwitch";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import SlidingWindow from "components/ui/transitions/SlidingWindow";
import ViewHead from "components/ui/layout/ViewHead";
import {
  AccountState,
  useDevicePreference,
} from "components/hooks/store/useDevicePreferences";
import ViewCap from "components/ui/layout/ViewCap";

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
      <HeaderLayout>
        <ViewCap>
          <ViewHead>
            <PillSwitch selected={section} onChange={setSection}>
              <PillSwitchItem value={Section.Onboard}>Sign up</PillSwitchItem>
              <PillSwitchItem value={Section.Login}>Log in</PillSwitchItem>
              <PillSwitchItem value={Section.PasswordReset}>
                Reset
              </PillSwitchItem>
            </PillSwitch>
          </ViewHead>
        </ViewCap>

        <SlidingWindow activeIndex={section}>
          <OnboardView routes={routes} />
          <LoginView routes={routes} />
          <ResetPasswordView routes={routes} />
        </SlidingWindow>
      </HeaderLayout>
    </Lock>
  );
};

export default AuthenticationView;

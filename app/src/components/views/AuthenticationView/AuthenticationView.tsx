import React, { useMemo, useState } from "react";
import LoginView from "components/views//LoginView";
import OnboardView from "components/views/OnboardView";
import { useSession } from "components/context/SessionContext";
import Lock from "components/ui/transitions/Lock";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";

enum Section {
  Onboard,
  Login,
  PasswordReset,
}

const AuthenticationView: React.FC = () => {
  const session = useSession();

  const [section, setSection] = useState<Section>(Section.Onboard);

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
      <ViewStack>
        <OnboardView routes={routes} />
        <SlideRight active={section === Section.Login}>
          <ViewStack>
            <LoginView routes={routes} />
            <SlideRight active={section === Section.Login}>
              <ViewStack>
                <LoginView routes={routes} />
              </ViewStack>
            </SlideRight>
          </ViewStack>
        </SlideRight>
      </ViewStack>
    </Lock>
  );
};

export default AuthenticationView;

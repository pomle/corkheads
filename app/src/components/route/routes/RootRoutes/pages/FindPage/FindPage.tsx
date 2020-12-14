import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import { useHistory } from "react-router-dom";
import { Article } from "types/Article";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import CancelButton from "components/ui/trigger/CancelButton/CancelButton";
import { useMe } from "components/hooks/useMe";
import LoadingView from "components/views/LoadingView";

interface FindPageProps {
  onSelect: (article: Article) => void;
}

const FindPage: React.FC<FindPageProps> = ({ onSelect }) => {
  const history = useHistory();
  const user = useMe();

  const nav = (
    <NavigationBar
      back={<CancelButton onClick={history.goBack}>Cancel</CancelButton>}
    />
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => <ExploreArticlesView nav={nav} user={user} onSelect={onSelect} />}
    </ErrorBoundary>
  );
};

export default FindPage;

import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import { useHistory } from "react-router-dom";
import { Article } from "types/Article";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import CancelButton from "components/ui/trigger/CancelButton/CancelButton";

interface FindPageProps {
  onSelect: (article: Article) => void;
}

const FindPage: React.FC<FindPageProps> = ({ onSelect }) => {
  const history = useHistory();

  const nav = (
    <NavigationBar
      back={<CancelButton onClick={history.goBack}>Cancel</CancelButton>}
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => <ExploreArticlesView nav={nav} onSelect={onSelect} />}
    </ErrorBoundary>
  );
};

export default FindPage;

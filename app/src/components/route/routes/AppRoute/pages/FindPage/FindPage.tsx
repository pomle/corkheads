import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import { useHistory } from "react-router-dom";
import { Article } from "types/Article";
import ExploreArticlesView from "components/views/ExploreArticlesView";

interface FindPageProps {
  onSelect: (article: Article) => void;
}

const FindPage: React.FC<FindPageProps> = ({ onSelect }) => {
  const history = useHistory();

  const nav = (
    <NavigationBar back={<button onClick={history.goBack}>Cancel</button>} />
  );

  return <ExploreArticlesView nav={nav} onSelect={onSelect} />;
};

export default FindPage;

import React, { useCallback } from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import { useHistory } from "react-router-dom";
import { Article } from "types/types";
import * as paths from "components/route/paths";
import ExploreArticlesView from "components/views/ExploreArticlesView";

interface FindPageProps {
  onSelect: (article: Article) => void;
}

const FindPage: React.FC<FindPageProps> = ({ onSelect }) => {
  const history = useHistory();

  const goToCreate = useCallback(() => {
    const url = paths.articleCreate.url({});
    history.push(url);
  }, [history]);

  const nav = (
    <NavigationBar
      back={<button onClick={history.goBack}>Cancel</button>}
      forward={<button onClick={goToCreate}>Add Drink</button>}
    />
  );

  return <ExploreArticlesView nav={nav} onSelect={onSelect} />;
};

export default FindPage;

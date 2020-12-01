import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useSharedInput } from "components/hooks/useSharedInput";
import ResultStatement from "components/ui/typography/ResultStatement";
import ArticleResults from "components/fragments/Article/ArticleResults";
import { Article } from "types/Article";
import SearchInput from "components/ui/input/SearchInput";

const MIN_QUERY_LENGTH = 3;

const useStyles = makeStyles({
  ArticleSelect: {},
  searchBar: {
    padding: "24px",
  },
});

interface ArticleSelectProps {
  onSelect: (article: Article) => void;
}

const ArticleSelect: React.FC<ArticleSelectProps> = ({ onSelect }) => {
  const classes = useStyles();

  const [query, setQuery] = useSharedInput("site-select-query", "");

  return (
    <div className={classes.ArticleSelect}>
      <div className={classes.searchBar}>
        <SearchInput query={query} onChange={setQuery} />
      </div>

      {query.length >= MIN_QUERY_LENGTH ? (
        <ArticleResults query={query} onSelect={onSelect} />
      ) : (
        <ResultStatement message="Type in the name of a drink or manufacturer." />
      )}
    </div>
  );
};

export default ArticleSelect;

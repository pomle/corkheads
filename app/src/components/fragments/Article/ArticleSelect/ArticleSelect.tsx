import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useSharedInput } from "components/hooks/useSharedInput";
import ResultStatement from "components/ui/typography/ResultStatement";
import ArticleResults from "components/fragments/Article/ArticleResults";
import { Article } from "types/article";

const MIN_QUERY_LENGTH = 3;

const useStyles = makeStyles({
  ArticleSelect: {},
  searchBar: {
    display: "flex",
    padding: "24px",
    "& > input": {
      flex: "1",
    },
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
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </div>

      {query.length >= MIN_QUERY_LENGTH ? (
        <ArticleResults query={query} onSelect={onSelect} />
      ) : (
        <ResultStatement message="Type something to search." />
      )}
    </div>
  );
};

export default ArticleSelect;

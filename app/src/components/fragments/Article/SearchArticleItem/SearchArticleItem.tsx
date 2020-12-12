import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { SearchResult } from "components/hooks/db/useArticleSearch";
import { Bottling } from "types/Bottling";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.accent,
    fontSize: "14px",
    lineHeight: 1.25,
    "& em": {
      color: theme.color.action,
      fontStyle: "normal",
    },
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
}));

function interleave(parts: React.ReactElement[], sep: React.ReactElement) {
  const output: React.ReactElement[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    output.push(parts[i]);
    if (parts[i + 1]) {
      output.push(sep);
    }
  }
  return output;
}

const Highlighted: React.FC<{ text: string }> = ({ text }) => {
  let html = text;
  html = html.replaceAll("[", "<em>");
  html = html.replaceAll("]", "</em>");

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const BottlingMeta: React.FC<{ bottling: Partial<Bottling> }> = ({
  bottling,
}) => {
  const parts: React.ReactElement[] = [];
  if (bottling?.year) {
    parts.push(<>{bottling.year}</>);
  }

  const distill = bottling.distill;
  if (distill?.age) {
    parts.push(<>{distill.age} years</>);
  }

  if (distill?.alcoholByVolumePercentage) {
    parts.push(<>{distill.alcoholByVolumePercentage}%</>);
  }

  return <>{interleave(parts, <> – </>)}</>;
};

interface SearchArticleItemProps {
  searchResult: SearchResult;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({
  searchResult,
}) => {
  const {
    hit,
    entry: { data: article },
  } = searchResult;
  const { displayName, photoURL, ratingAggregate } = article;
  const displayNameMatch = hit.matches?.displayName.value;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>
        {displayNameMatch ? (
          <Highlighted text={displayNameMatch} />
        ) : (
          displayName
        )}
      </div>
      <div className={classes.meta}>
        {article.bottling && <BottlingMeta bottling={article.bottling} />}
      </div>
      <ItemRating aggregate={ratingAggregate} />
    </ImageItem>
  );
};

export default SearchArticleItem;

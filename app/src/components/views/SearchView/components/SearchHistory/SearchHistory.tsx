import React from "react";
import { makeStyles } from "@material-ui/styles";
import ItemList from "components/ui/layout/ItemList";
import { SearchHistoryEntry } from "components/hooks/db/useSearchHistory";
import PassedTime from "components/ui/format/PassedTime";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  SearchHistory: {
    lineHeight: 1.5,
    "& dd": {
      color: theme.color.action,
    },
    "& dt": {
      color: theme.color.text,
      fontSize: "12px",
    },
  },
}));

interface SearchHistoryProps {
  entries: SearchHistoryEntry[];
  onSelect: (text: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ entries, onSelect }) => {
  const classes = useStyles();

  return (
    <div className={classes.SearchHistory}>
      <ItemList>
        {entries.map((entry) => {
          return (
            <dl>
              <dd>
                <button
                  type="button"
                  onClick={() => onSelect(entry.query.text)}
                >
                  {entry.query.text}
                </button>
              </dd>
              <dt>
                {entry.timestamp && <PassedTime date={entry.timestamp} />}
              </dt>
            </dl>
          );
        })}
      </ItemList>
    </div>
  );
};

export default SearchHistory;

import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  SearchInput: {
    display: "flex",
    "& > input": {
      flex: "1",
    },
  },
});

interface SearchInputProps {
  query: string;
  onChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, onChange }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const classes = useStyles();

  return (
    <div className={classes.SearchInput}>
      <input
        type="search"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;

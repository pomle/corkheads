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

interface SearchInputProps extends React.InputHTMLAttributes<unknown> {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onQueryChange,
  ...props
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange(event.target.value);
    },
    [onQueryChange]
  );

  const classes = useStyles();

  return (
    <div className={classes.SearchInput}>
      <input {...props} type="search" value={query} onChange={handleChange} />
    </div>
  );
};

export default SearchInput;

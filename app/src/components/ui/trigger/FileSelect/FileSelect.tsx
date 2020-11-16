import React, { useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  FileSelect: {
    "& > input": {
      display: "none",
    },
  },
});

interface FileSelectProps {
  onFile: (file: File) => void;
}

const FileSelect: React.FC<FileSelectProps> = ({ onFile, children }) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const handleInitiate = useCallback(() => {
    const input = inputElement.current;
    if (input) {
      input.click();
    }
  }, []);

  const handleChange = useCallback(() => {
    const input = inputElement.current;
    if (!input) {
      return;
    }
    const file = input.files ? input.files[0] : null;
    if (!file) {
      return;
    }
    onFile(file);
  }, [onFile]);

  const classes = useStyles();

  return (
    <button
      className={classes.FileSelect}
      onClick={handleInitiate}
      type="button"
    >
      <input ref={inputElement} type="file" onChange={handleChange} />
      {children}
    </button>
  );
};

export default FileSelect;

import React, { useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  FileSelect: {
    display: "block",
    "& > input": {
      display: "none",
    },
  },
});

interface FileSelectProps {
  onFile: (file: File) => void;
  accept?: string;
  capture?: "environment" | "user";
}

const FileSelect: React.FC<FileSelectProps> = ({
  onFile,
  children,
  accept,
  capture,
}) => {
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
      <input
        ref={inputElement}
        type="file"
        onChange={handleChange}
        accept={accept}
        capture={capture}
      />
      {children}
    </button>
  );
};

export default FileSelect;

import React from "react";
import FileSelect from "components/ui/trigger/FileSelect";

interface ImageSelectProps {
  onFile: (file: File) => void;
}

const accept = "image/*";

const ImageSelect: React.FC<ImageSelectProps> = ({ onFile, children }) => {
  return (
    <FileSelect onFile={onFile} accept={accept} capture="environment">
      {children}
    </FileSelect>
  );
};

export default ImageSelect;

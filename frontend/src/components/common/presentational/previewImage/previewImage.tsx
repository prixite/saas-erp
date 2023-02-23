import { useState } from "react";
import "@src/components/common/presentational/previewImage/previewImage.scss";

interface Props {
  file: string;
}
const PreviewImage = ({ file }: Props) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return <img src={preview} alt="preview" className="preview-img" />;
};

export default PreviewImage;

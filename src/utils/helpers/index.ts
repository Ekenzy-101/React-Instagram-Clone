import FileResizer from "react-image-file-resizer";

export interface fileOptions {
  file: any;
  maxWidth: number;
  maxHeight: number;
  minWidth?: number;
  minHeight?: number;
}

export const resizeFile = (options: fileOptions) => {
  const { file, maxHeight, maxWidth, minWidth, minHeight } = options;
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob",
      minWidth,
      minHeight
    );
  });
};

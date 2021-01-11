import FileResizer from "react-image-file-resizer";

export const resizeFile = (file: any, maxWidth: number, maxHeight: number) => {
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
      "base64"
    );
  });
};

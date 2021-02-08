import FileResizer from "react-image-file-resizer";
import { Link } from "react-router-dom";
import React from "react";

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

export const wrapLinkTag = (text: string) => {
  const regex = new RegExp(/^@([a-z]|_|.|\d)*([a-z]|_|\d)$/);

  const splitWords = text.split(" ");

  return splitWords.map((word) => {
    if (regex.test(word)) {
      const username = word.replace("@", "");

      return (
        <Link
          style={{
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: 550,
            fontFamily: "inherit",
            marginRight: "2px",
            color: "rgb(0, 55, 107)",
          }}
          to={`/${username}/`}
        >{`${word} `}</Link>
      );
    }
    return word + " ";
  });
};

export const limitCommentText = (body: string, limit = 150) => {
  const newBodyArray: string[] = [];
  if (body.length > limit) {
    body.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newBodyArray.push(cur);
      }
      return acc + cur.length;
    }, 0);

    const newBody = newBodyArray.join(" ");
    // return the result
    return [newBody, body.split(newBody)[1]];
  }
  return [body];
};

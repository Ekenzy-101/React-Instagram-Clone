import { Avatar } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";

interface Props {
  images: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddPostBody: React.FC<Props> = ({ images, onChange }) => {
  // Other Hooks
  const classes = useStyles();
  const { state, pathname } = useLocation() as {
    state: string[];
    pathname: string;
  };

  // JSX
  if (pathname.includes("style"))
    return (
      <div className={classes.root}>
        {images.map((img, index) => (
          <Avatar
            variant="square"
            src={img}
            key={index}
            className={classes.image}
          />
        ))}
      </div>
    );

  return (
    <div>
      <div className={classes.wrapper}>
        <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
        <textarea
          name="caption"
          onChange={onChange}
          className={classes.textarea}
          placeholder="Write a caption..."
        ></textarea>
        <Avatar
          src={state[0]}
          className={classes.smallImage}
          variant="square"
        />
      </div>

      <div className={classes.wrapper}>
        <input
          type="text"
          name="location"
          onChange={onChange}
          className={clsx(classes.textarea, classes.input)}
          placeholder="Add Location"
        />
      </div>
    </div>
  );
};

export default AddPostBody;

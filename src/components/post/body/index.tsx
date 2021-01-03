import { Divider, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { POST_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";

const PostBody = () => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Divider />
      <Typography color="textSecondary" className={classes.text}>
        More posts from <strong> kenzy</strong>
      </Typography>
      <div className="explore-grid-container" style={{ padding: 0 }}>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
      </div>
    </Hidden>
  );
};

export default PostBody;

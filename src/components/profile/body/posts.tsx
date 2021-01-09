import React from "react";
import { Post } from "../../../utils/types/post";
import { POST_PIC_URL } from "../../../utils/constants/url";
import { Grid, Typography } from "@material-ui/core";
import ProfileBodyCard from "./card";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

interface Props {
  posts: Post[];
}

const ProfileBodyPosts: React.FC<Props> = ({ posts }) => {
  const classes = useStyles();
  if (posts.length)
    return (
      <div className="explore-grid-container" style={{ padding: 0 }}>
        {posts.map((post) => (
          <Link
            to={`/p/${post.id}/`}
            key={post.id}
            className="explore-grid-item single-grid-square"
          >
            <img src={POST_PIC_URL} alt="Post" />
          </Link>
        ))}
      </div>
    );

  return (
    <div style={{ marginTop: "-8px", height: "100%" }}>
      <Typography
        style={{ margin: "0.8rem 0.5rem 0.5rem 0.8rem", fontWeight: "bold" }}
      >
        Getting Started
      </Typography>
      <Grid container className={classes.flexContainer} spacing={1}>
        <ProfileBodyCard />
        <ProfileBodyCard />
        <ProfileBodyCard />
      </Grid>
    </div>
  );
};

export default ProfileBodyPosts;

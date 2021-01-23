import React from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Grid, Typography } from "@material-ui/core";

import { Post } from "../../../utils/types/post";
import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import { CAMERA_LOGO_URL, POST_PIC_URL } from "../../../utils/constants/url";
import { useUserContext } from "../../../utils/context/user";
import ProfileBodyCard from "./card";
import { useStyles } from "./style";
interface Props {
  posts: Post[];
}

const ProfileBodyPosts: React.FC<Props> = ({ posts }) => {
  // Global Hooks
  const { user } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const { username } = useParams() as { username: string };

  // JSX
  if (posts.length)
    return (
      <div className="explore-grid-container" style={{ padding: 0 }}>
        {posts.map((post) => (
          <Link
            to={`/p/${post.id}/`}
            key={post.id}
            className="explore-grid-item single-grid-square"
          >
            <div className="after">
              <div>
                <LoveSvg fill="#fff" active width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post?.saves?.length}
                </Typography>
              </div>
              <div>
                <CommentSvg fill="#fff" width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post?.commentsCount}
                </Typography>
              </div>
            </div>

            <img src={POST_PIC_URL} alt="Post" />
          </Link>
        ))}
      </div>
    );

  if (user && user.username === username)
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

  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <Avatar src={CAMERA_LOGO_URL} className={classes.cameraLogo} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          No Posts Yet
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBodyPosts;

import { Avatar, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { useMedia } from "react-use";
import { Link, useRouteMatch } from "react-router-dom";

import { useStyles } from "./styles";
import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import {
  MULTI_PHOTO_LOGO_URL,
  DEFAULT_PROFILE_PIC_URL,
} from "../../../utils/constants/url";
import { Post } from "../../../utils/types/post";
import { User } from "../../../utils/types/user";
interface Props {
  posts: Post[];
  users: User[];
}

const ExploreBody: React.FC<Props> = ({ posts, users }) => {
  // Other Hooks
  const classes = useStyles();
  const { path } = useRouteMatch();
  const mobileView = useMedia(`(max-width: 600px)`);

  // Other Logic
  const getClassName = (index: number) => {
    if ([2, 17, 32].includes(index)) {
      return "explore-grid-item double-grid-square";
    }
    return "explore-grid-item single-grid-square";
  };

  // JSX
  if (path.includes("/explore/search") && mobileView) {
    return (
      <>
        {users.map(({ username, image_url, name, id }) => (
          <Link to={`/${username}/`} key={id} className={classes.link}>
            <div className={classes.menuItem}>
              <Avatar
                className={classes.avatar}
                src={image_url ? image_url : DEFAULT_PROFILE_PIC_URL}
              />
              <div>
                <Typography className={classes.username}>
                  <strong>{username}</strong>
                </Typography>
                <Typography className={classes.name} color="textSecondary">
                  {name}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  }

  return (
    <div>
      <div className="explore-grid-container">
        {posts.map((post, index) => (
          <Link
            to={`/p/${post.id}/`}
            key={post.id}
            className={getClassName(index)}
          >
            <div className="after">
              <div>
                <LoveSvg fill="#fff" active width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post.likesCount}
                </Typography>
              </div>
              <div>
                <CommentSvg fill="#fff" width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post.commentsCount}
                </Typography>
              </div>
            </div>
            {post?.image_urls?.length > 1 ? (
              <img
                alt="multi-photo"
                src={MULTI_PHOTO_LOGO_URL}
                className={classes.multiPhoto}
              />
            ) : null}
            <CardMedia image={post?.image_urls[0]} className="post-image" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreBody;

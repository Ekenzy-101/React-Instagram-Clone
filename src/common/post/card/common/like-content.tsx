import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import { DEFAULT_PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { useUser } from "../../../../utils/context/user";
import { modalState } from "../../../../utils/types/modal";
import { Post } from "../../../../utils/types/post";
import { User } from "../../../../utils/types/user";
import { useStyles } from "../styles";

interface Props {
  post: Post;
  setShow: React.Dispatch<React.SetStateAction<modalState>>;
}

const PostCardCommonLikeContent: React.FC<Props> = ({ post, setShow }) => {
  const { likes } = post;

  // Global State Hooks
  const { user: authUser } = useUser();

  // Other Hooks
  const classes = useStyles();
  const mobileView = useMedia(`(max-width: 600px)`);

  // Other Logic
  const getRelatedUser: () => User | undefined = () => {
    let user: User | undefined;
    if (authUser?.following) {
      authUser?.following?.forEach((u) => {
        user = post?.likes?.find((l) => l.id === u.id);
        if (user) return;
      });
    }
    return user;
  };

  const relatedUser = getRelatedUser();
  const otherLikes = likes.length - 1;

  // JSX
  return (
    <>
      {relatedUser && likes.length > 1 ? (
        <div className={classes.likedByGroup}>
          <Avatar
            src={
              relatedUser.image_url
                ? relatedUser.image_url
                : DEFAULT_PROFILE_PIC_URL
            }
            className={classes.likedByAvatar}
          />

          <Typography className={classes.text} variant="body1">
            Liked by{" "}
            <strong>
              <Link
                className={classes.link}
                to={{
                  pathname: `/${relatedUser.username}/`,
                }}
              >{` ${relatedUser.username} `}</Link>
            </strong>
            and{" "}
            <strong>
              {mobileView && authUser ? (
                <Link
                  className={classes.link}
                  to={{
                    pathname: `/p/${post.id}/liked_by/`,
                  }}
                >
                  {otherLikes} others
                </Link>
              ) : (
                <span
                  className={classes.link}
                  onClick={
                    authUser ? () => setShow("users") : () => setShow("login")
                  }
                >
                  {otherLikes > 1
                    ? `${otherLikes} others`
                    : `${otherLikes} like`}
                </span>
              )}
            </strong>
          </Typography>
        </div>
      ) : likes.length ? (
        <Typography className={classes.text} variant="body1">
          <strong>
            {mobileView && authUser ? (
              <Link
                className={classes.link}
                to={{
                  pathname: `/p/${post.id}/liked_by/`,
                }}
              >
                {likes.length > 1
                  ? `${likes.length} likes`
                  : `${likes.length} like`}
              </Link>
            ) : (
              <span
                className={classes.link}
                onClick={
                  authUser ? () => setShow("users") : () => setShow("login")
                }
              >
                {likes.length > 1
                  ? `${likes.length} likes`
                  : `${likes.length} like`}
              </span>
            )}
          </strong>
        </Typography>
      ) : null}
    </>
  );
};

export default PostCardCommonLikeContent;

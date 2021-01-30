import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";
import { useMedia } from "react-use";

import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import PostModal from "../modal";
import UsersModal from "../../users-modal";
import NotSupportedModal from "../../not-supported-modal";
import { useUser } from "../../../utils/context/user";
import PostCardCommonHeader from "./common/header";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonForm from "./common/form";
import { User } from "../../../utils/types/user";
import { modalState } from "../../../utils/types/modal";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import usePost from "../../../common/hooks/usePost";
import useComment from "../../../common/hooks/useComment";
import LoginModal from "../../login-modal";
interface Props {
  post: Post;
}

const PostCardTabView: React.FC<Props> = ({ post }) => {
  const {
    user,
    image_urls,
    comments,
    created_at,
    caption,
    saves,
    likes,
  } = post;
  // Global Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { handleTogglePostLike, handleTogglePostSave } = usePost();
  const { handleToggleCommentLike } = useComment();
  const mobileView = useMedia(`(max-width: 600px)`);

  // Other Logic
  const isPostLikedByUser = likes.some((like) => like.id === authUser?.id);
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

  const isCommentLikedByUser = (comment: PostComment) => {
    return comment.likes.some((like) => like.id === authUser?.id);
  };

  const getRelatedUser: () => User | undefined = () => {
    let relatedUser: User | undefined;
    if (authUser?.followers) {
      authUser?.followers?.forEach((u) => {
        relatedUser = post?.likes?.find((l) => l.id === u.id);
        if (relatedUser) return;
      });
    }
    return relatedUser;
  };

  const firstRelatedUser = getRelatedUser();

  // JSX
  return (
    <>
      <UsersModal
        title="Likes"
        users={likes}
        open={show === "users"}
        onClose={() => setShow("none")}
      />
      <PostModal
        open={show === "post"}
        post={post}
        onClose={() => setShow("none")}
      />
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />
      <Card variant="outlined" className={classes.root}>
        <PostCardCommonHeader onClick={() => setShow("post")} post={post} />
        <PostCardCommonStepper image_urls={image_urls} />

        <CardActions className={classes.cardActions}>
          <div className={classes.groupIcons}>
            <LoveSvg
              onClick={
                authUser
                  ? () => handleTogglePostLike(post)
                  : () => setShow("login")
              }
              active={isPostLikedByUser}
              fill={isPostLikedByUser ? "#ed4956" : undefined}
            />
            <CommentSvg
              onClick={
                authUser
                  ? () =>
                      history.push(`/p/${post.id}/comments/`, {
                        from: path,
                        ...params,
                      })
                  : () => setShow("login")
              }
            />
            <DirectSvg
              onClick={
                authUser
                  ? () => setShow("not-supported")
                  : () => setShow("login")
              }
            />
          </div>
          <PostCardCommonStepper mobile image_urls={image_urls} />
          <SavedSvg
            active={isSavedByUser}
            onClick={
              authUser
                ? () => handleTogglePostSave(post)
                : () => setShow("login")
            }
          />
        </CardActions>

        <CardContent className={classes.cardContent}>
          {firstRelatedUser ? (
            <div className={classes.likedByGroup}>
              <Avatar src={PROFILE_PIC_URL} className={classes.likedByAvatar} />
              <Typography className={classes.text} variant="body1">
                Liked by{" "}
                <strong>
                  <Link
                    className={classes.link}
                    to={{
                      pathname: `/${firstRelatedUser.username}/`,
                      state: { from: path, ...params },
                    }}
                  >{` ${firstRelatedUser.username} `}</Link>
                </strong>
                and{" "}
                <strong>
                  {mobileView && authUser ? (
                    <Link
                      className={classes.link}
                      to={{
                        pathname: `/p/${post.id}/liked_by/`,
                        state: { from: path, ...params },
                      }}
                    >
                      {likes.length - 1} others
                    </Link>
                  ) : (
                    <span
                      className={classes.link}
                      onClick={
                        authUser
                          ? () => setShow("users")
                          : () => setShow("login")
                      }
                    >
                      {likes.length - 1} others
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
                      state: { from: path, ...params },
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

          <div style={{ display: "flex", marginBottom: "0.3rem" }}>
            <strong className={classes.username}>
              <Link
                className={classes.link}
                to={{
                  pathname: `/${user.username}/`,
                  state: { from: path, ...params },
                }}
              >
                {user.username}
              </Link>
            </strong>
            <Typography className={classes.commentByBody} variant="body1">
              {caption}
            </Typography>
            <div></div>
          </div>
          {comments.length > 1 && authUser ? (
            <Typography style={{ fontSize: "0.9rem" }} color="textSecondary">
              <Link
                className={classes.link}
                to={{
                  pathname: `/p/${post.id}/comments/`,
                  state: { from: path, ...params },
                }}
              >
                View all {post.commentsCount} comments
              </Link>
            </Typography>
          ) : null}
          {comments.slice(0, 3).map((comment, index) => (
            <div
              style={{ display: "flex", marginBottom: "0.3rem" }}
              key={index}
            >
              <strong className={classes.username}>
                <Link
                  className={classes.link}
                  to={{
                    pathname: `/${comment.user.username}/`,
                    state: { from: path, ...params },
                  }}
                >
                  {comment.user.username}
                </Link>
              </strong>
              <Typography className={classes.commentByBody} variant="body1">
                {comment.content}
              </Typography>
              <div>
                {authUser ? (
                  <LoveSvg
                    active={isCommentLikedByUser(comment)}
                    fill={isCommentLikedByUser(comment) ? "#ed4956" : undefined}
                    width={12}
                    height={12}
                    onClick={() =>
                      handleToggleCommentLike({ post, id: comment.id })
                    }
                  />
                ) : null}
              </div>
            </div>
          ))}
          <Typography
            color="textSecondary"
            variant="caption"
            className={classes.createdAt}
          >
            {created_at}
          </Typography>
        </CardContent>
        <PostCardCommonForm post={post} tabView />
      </Card>
    </>
  );
};

export default PostCardTabView;

import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import PostModal from "../modal";
import NotSupportedModal from "../../not-supported-modal";
import { useUserContext } from "../../../utils/context/user";
import PostCardCommonHeader from "./common/header";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonForm from "./common/form";
interface Props {
  post: Post;
  onTogglePostLike: () => void;
  onTogglePostSave: () => void;
  onToggleCommentLike: (id: string) => void;
}

const PostCardTabView: React.FC<Props> = ({
  post,
  onTogglePostLike,
  onTogglePostSave,
  onToggleCommentLike,
}) => {
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
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Hooks
  const classes = useStyles();

  // Other Logic
  const isPostLikedByUser = likes.some((like) => like.id === authUser?.id);
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

  const isCommentLikedByUser = (comment: PostComment) => {
    return comment.likes.some((like) => like.id === authUser?.id);
  };

  // JSX
  return (
    <>
      <PostModal open={open} post={post} onClose={() => setOpen(false)} />
      <NotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <Card variant="outlined" className={classes.root}>
        <PostCardCommonHeader onClick={() => setOpen(true)} post={post} />
        <PostCardCommonStepper image_urls={image_urls} />

        <CardActions className={classes.cardActions}>
          <div className={classes.groupIcons}>
            <LoveSvg
              onClick={onTogglePostLike}
              active={isPostLikedByUser}
              fill={isPostLikedByUser ? "#ed4956" : undefined}
            />
            <CommentSvg />
            <DirectSvg onClick={() => setOpen1(true)} />
          </div>
          <PostCardCommonStepper mobile image_urls={image_urls} />
          <SavedSvg active={isSavedByUser} onClick={onTogglePostSave} />
        </CardActions>

        <CardContent className={classes.cardContent}>
          {/* <div className={classes.likedByGroup}>
            <Avatar src={PROFILE_PIC_URL} className={classes.likedByAvatar} />
            <Typography variant="body1">
              Liked by <strong>bubuniverse</strong> and{" "}
              <strong>46 others</strong>
            </Typography>
          </div> */}
          {likes.length ? (
            <Typography variant="body1">
              <strong>
                <Link className={classes.link} to={`/p/${post.id}/liked_by/`}>
                  {likes.length > 1
                    ? `${likes.length} likes`
                    : `${likes.length} like`}
                </Link>
              </strong>
            </Typography>
          ) : null}

          <div style={{ display: "flex", marginBottom: "0.3rem" }}>
            <strong className={classes.username}>
              <Link className={classes.link} to={`/${user.username}/`}>
                {user.username}
              </Link>
            </strong>
            <Typography className={classes.commentByBody} variant="body1">
              {caption}
            </Typography>
            <div></div>
          </div>
          {comments.length > 1 ? (
            <Typography style={{ fontSize: "0.9rem" }} color="textSecondary">
              <Link className={classes.link} to={`/p/${post.id}/comments/`}>
                View all {post.commentsCount} comments
              </Link>
            </Typography>
          ) : null}
          {comments.slice(0, 2).map((comment, index) => (
            <div
              style={{ display: "flex", marginBottom: "0.3rem" }}
              key={index}
            >
              <strong className={classes.username}>
                <Link
                  className={classes.link}
                  to={`/${comment.user.username}/`}
                >
                  {comment.user.username}
                </Link>
              </strong>
              <Typography className={classes.commentByBody} variant="body1">
                {comment.content}
              </Typography>
              <div>
                <LoveSvg
                  active={isCommentLikedByUser(comment)}
                  fill={isCommentLikedByUser(comment) ? "#ed4956" : undefined}
                  width={12}
                  height={12}
                  onClick={() => onToggleCommentLike(comment.id)}
                />
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

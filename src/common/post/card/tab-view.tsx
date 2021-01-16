import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post } from "../../../utils/types/post";
import PostModal from "../modal";
import NotSupportedModal from "../../not-supported-modal";
import { useUserContext } from "../../../utils/context/user";
import PostCardCommonHeader from "./common/header";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonForm from "./common/form";
interface Props {
  post: Post;
  onToggleLike: () => void;
}

const PostCardTabView: React.FC<Props> = ({ post, onToggleLike }) => {
  const { user, image_urls, comments, created_at, caption, likes } = post;
  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Hooks
  const classes = useStyles();

  // Other Logic
  const isLikedByUser = likes.some((like) => like.id === authUser?.id);

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
              onClick={onToggleLike}
              active={isLikedByUser}
              fill={isLikedByUser ? "#ed4956" : undefined}
            />
            <CommentSvg />
            <DirectSvg onClick={() => setOpen1(true)} />
          </div>
          <PostCardCommonStepper mobile image_urls={image_urls} />
          <SavedSvg onClick={() => setOpen1(true)} />
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
                {likes.length > 1
                  ? `${likes.length} likes`
                  : `${likes.length} like`}
              </strong>
            </Typography>
          ) : null}
          <Typography variant="body1">
            <strong style={{ marginRight: "0.5rem" }}>
              <Link className={classes.link} to={`/${user.username}/`}>
                {user.username}
              </Link>
            </strong>
            {caption}
          </Typography>
          {comments.length > 1 ? (
            <Typography color="textSecondary">
              View all {comments.length} comments
            </Typography>
          ) : null}
          {comments.map((comment, index) => (
            <Typography variant="body1" key={index}>
              <strong style={{ marginRight: "0.5rem" }}>
                <Link
                  className={classes.link}
                  to={`/${comment.user.username}/`}
                >
                  {comment.user.username}
                </Link>
              </strong>
              {comment.content}
            </Typography>
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

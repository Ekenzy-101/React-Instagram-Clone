import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLongPress } from "react-use";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import { DELETE_COMMENT } from "../../../utils/mutations/comment";
import PostModal from "../modal";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonHeader from "./common/header";
import { useUserContext } from "../../../utils/context/user";
import NotSupportedModal from "../../not-supported-modal";
import PostCommentModal from "../modal/comment";
import PostCardCommonForm from "./common/form";
import {
  deletePostComment,
  parseCommentDate,
} from "../../../utils/helpers/comment";
import { debug } from "../../../utils/services/debugService";
interface Props {
  post: Post;
  onToggleLike: () => void;
}

const PostCardDesktopView: React.FC<Props> = ({ post, onToggleLike }) => {
  const { user, image_urls, created_at, comments, caption, likes } = post;

  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [activeComment, setActiveComment] = useState<undefined | PostComment>(
    undefined
  );

  // Other Hooks
  const classes = useStyles();
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const longPressEvent = useLongPress(
    (e) => {
      const target = e.target as EventTarget & { id: string };
      const comment = comments.find((c) => c.id === target.id);
      setActiveComment(comment);
      setOpen2(true);
    },
    {
      isPreventDefault: true,
      delay: 2000,
    }
  );

  // Event Handlers
  const handleDelete = async () => {
    try {
      await deleteComment({
        variables: { id: activeComment?.id },
        update(cache) {
          deletePostComment(cache, post, activeComment!);
        },
      });
      setOpen2(false);
    } catch (error) {
      debug.error(error);
      setOpen2(false);
      toast(error?.message);
    }
  };

  // Other Logic
  const isLikedByUser = likes.some((like) => like.id === authUser?.id);

  // JSX
  return (
    <>
      <PostModal open={open} onClose={() => setOpen(false)} post={post} />
      <PostCommentModal
        open={open2}
        onClose={() => setOpen2(false)}
        comment={activeComment}
        onDelete={handleDelete}
      />
      <NotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <Card variant="outlined" className={classes.root}>
        <Grid container>
          <Grid item xs={7} style={{ position: "relative" }}>
            <PostCardCommonStepper image_urls={image_urls} />
          </Grid>

          <Grid item xs={5}>
            <PostCardCommonHeader onClick={() => setOpen(true)} post={post} />
            <Divider />

            <CardContent className={classes.commentContent}>
              <div className={classes.commentByGroup}>
                <Avatar
                  src={user.image_url ? user.image_url : PROFILE_PIC_URL}
                  className={classes.commentByAvatar}
                />
                <div className={classes.commentByBody}>
                  <Typography
                    style={{ marginBottom: "0.5rem" }}
                    variant="caption"
                  >
                    <strong style={{ marginRight: "0.5rem" }}>
                      <Link className={classes.link} to={`/${user.username}/`}>
                        {user.username}
                      </Link>
                    </strong>
                    {caption}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {parseCommentDate(created_at)}
                  </Typography>
                </div>
              </div>
              {comments.map((comment, index) => (
                <div key={index} onClick={() => console.log("Clicked")}>
                  <div className={classes.commentByGroup}>
                    <Avatar
                      src={
                        comment.user.image_url
                          ? comment.user.image_url
                          : PROFILE_PIC_URL
                      }
                      className={classes.commentByAvatar}
                    />
                    <div
                      {...longPressEvent}
                      id={comment.id}
                      className={classes.commentByBody}
                    >
                      <Typography
                        style={{ marginBottom: "0.5rem" }}
                        variant="caption"
                        id={comment.id}
                      >
                        <strong
                          id={comment.id}
                          style={{ marginRight: "0.5rem" }}
                        >
                          <Link
                            className={classes.link}
                            to={`/${comment.user.username}/`}
                          >
                            {comment.user.username}
                          </Link>
                        </strong>
                        {comment.content}
                      </Typography>
                      <Typography
                        id={comment.id}
                        variant="caption"
                        color="textSecondary"
                      >
                        {parseCommentDate(comment.created_at)}{" "}
                        <strong>Reply</strong>
                      </Typography>
                    </div>
                    <div>
                      <LoveSvg width={12} height={12} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            <Divider />

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
              <SavedSvg onClick={() => setOpen1(true)} />
            </CardActions>

            <CardContent className={classes.cardContent}>
              {/* <div className={classes.likedByGroup}>
                <Avatar
                  src={PROFILE_PIC_URL}
                  className={classes.likedByAvatar}
                />
                <Typography variant="body1">
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
              <Typography
                color="textSecondary"
                style={{ fontSize: "0.7rem", textTransform: "uppercase" }}
              >
                {created_at}
              </Typography>
            </CardContent>
            <PostCardCommonForm post={post} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PostCardDesktopView;

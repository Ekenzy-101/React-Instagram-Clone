import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

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
import PostCardCommonComments from "./common/comments";
import { deletePostComment } from "../../../utils/helpers/comment";
import { debug } from "../../../utils/services/debugService";
interface Props {
  post: Post;
  onTogglePostLike: () => void;
  onTogglePostSave: () => void;
  onToggleCommentLike: (id: string) => void;
}

const PostCardDesktopView: React.FC<Props> = ({
  post,
  onTogglePostLike,
  onTogglePostSave,
  onToggleCommentLike,
}) => {
  const { image_urls, created_at, likes, saves } = post;

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
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

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
              <PostCardCommonComments
                setActiveComment={setActiveComment}
                post={post}
                setOpen={setOpen2}
                onToggleCommentLike={onToggleCommentLike}
              />
            </CardContent>

            <Divider />

            <CardActions className={classes.cardActions}>
              <div className={classes.groupIcons}>
                <LoveSvg
                  onClick={onTogglePostLike}
                  active={isLikedByUser}
                  fill={isLikedByUser ? "#ed4956" : undefined}
                />
                <CommentSvg />
                <DirectSvg onClick={() => setOpen1(true)} />
              </div>
              <SavedSvg active={isSavedByUser} onClick={onTogglePostSave} />
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

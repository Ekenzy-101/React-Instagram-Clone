import { CardActions } from "@material-ui/core";
import React from "react";

import SavedSvg from "../../../svgs/SavedSvg";
import CommentSvg from "../../../svgs/CommentSvg";
import DirectSvg from "../../../svgs/DirectSvg";
import LoveSvg from "../../../svgs/LoveSvg";
import usePost from "../../../../common/hooks/usePost";
import { useStyles } from "../styles";
import { useUser } from "../../../../utils/context/user";
import { modalState } from "../../../../utils/types/modal";
import { Post } from "../../../../utils/types/post";
import { useHistory, useParams } from "react-router-dom";
import { useMedia } from "react-use";

interface Props {
  post: Post;
  setShow: React.Dispatch<React.SetStateAction<modalState>>;
}

const PostCardCommonActions: React.FC<Props> = ({
  children,
  post,
  setShow,
}) => {
  const { saves, likes } = post;

  // Global State Hooks
  const { user: authUser } = useUser();

  // Other Hooks
  const classes = useStyles();
  const mobileView = useMedia(`(max-width: 600px)`);
  const history = useHistory();
  const params = useParams() as { id: string };
  const { handleTogglePostLike, handleTogglePostSave } = usePost();

  const handleFocus = () => {
    document.getElementById("comment-textarea")?.focus();
  };

  // Other Logic
  const isPostLikedByUser = likes.some((like) => like.id === authUser?.id);
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

  return (
    <CardActions className={classes.cardActions}>
      <div className={classes.groupIcons}>
        <LoveSvg
          onClick={
            authUser ? () => handleTogglePostLike(post) : () => setShow("login")
          }
          active={isPostLikedByUser}
          fill={isPostLikedByUser ? "#ed4956" : undefined}
        />
        <CommentSvg
          onClick={
            authUser && children && mobileView
              ? () => history.push(`/p/${post.id}/comments/`)
              : authUser && params.id && !mobileView
              ? handleFocus
              : authUser && children && !mobileView
              ? () => history.push(`/p/${post.id}/`)
              : () => setShow("login")
          }
        />
        <DirectSvg
          onClick={
            authUser ? () => setShow("not-supported") : () => setShow("login")
          }
        />
      </div>
      {children}
      <SavedSvg
        active={isSavedByUser}
        onClick={
          authUser ? () => handleTogglePostSave(post) : () => setShow("login")
        }
      />
    </CardActions>
  );
};

export default PostCardCommonActions;

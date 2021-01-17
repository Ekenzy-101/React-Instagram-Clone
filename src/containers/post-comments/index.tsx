import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./styles";
import PostCommentsHeader from "../../components/post-comments/header";
import Footer from "../../common/footer";
import PostCommentsBody from "../../components/post-comments/body";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../../utils/queries/post";
import LoadingPage from "../../common/loading/page";
import { useUserContext } from "../../utils/context/user";
import { updateCommentLikes } from "../../utils/helpers/like";
import toast from "react-hot-toast";

import {
  DELETE_COMMENT,
  TOGGLE_COMMENT_LIKE,
} from "../../utils/mutations/comment";
import { debug } from "../../utils/services/debugService";
import { Post, PostComment } from "../../utils/types/post";
import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { deletePostComment } from "../../utils/helpers/comment";

const PostCommentsPage: React.FC = () => {
  // Global Hooks
  const { user } = useUserContext()!;

  // State Hooks
  const [activeComment, setActiveComment] = useState<undefined | PostComment>(
    undefined
  );
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const { id } = useParams() as { id: string };
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE);
  const { pathname } = useLocation();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_POST_COMMENTS, {
    variables: { id },
  });

  // Event Handlers
  const handleToggleCommentLike = async (id: string) => {
    try {
      debug.log("Svg clicked");
      await toggleCommentLike({
        variables: { id },
        update(cache) {
          updateCommentLikes(cache, user!, post, id);
        },
      });
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(TO_LOGIN_PAGE, pathname);
      } else {
        toast(error?.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment({
        variables: { id: activeComment?.id },
        update(cache) {
          deletePostComment(cache, post, activeComment!);
        },
      });
      setOpen(false);
    } catch (error) {
      debug.error(error);
      setOpen(false);
      toast(error?.message);
    }
  };

  // Other Logic
  const post = data?.post as Post;

  // JSX
  if (loading) return <LoadingPage />;
  if (error) return <div></div>;

  return (
    <Paper className={classes.root} square variant="outlined">
      <PostCommentsHeader />
      <PostCommentsBody
        onDelete={handleDelete}
        onToggleCommentLike={handleToggleCommentLike}
        open={open}
        setActiveComment={setActiveComment}
        post={post}
        setOpen={setOpen}
        activeComment={activeComment}
      />
      <Footer />
    </Paper>
  );
};

export default PostCommentsPage;

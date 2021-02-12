import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import React from "react";

import {
  DELETE_POST,
  TOGGLE_POST_LIKE,
  TOGGLE_POST_SAVE,
} from "../../utils/mutations/post";
import { TO_HOME_PAGE, TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import { debug } from "../../utils/services/debugService";
import { updatePostLikes, updatePostSaves } from "../../utils/helpers/like";
import { deletePostFromCache } from "../../utils/helpers/post";
import { Post } from "../../utils/types/post";
import CustomToast from "../toast";

const usePost = () => {
  // Global Hooks
  const { user } = useUser();

  // Other Hooks
  const [deletePost, { loading: loading2 }] = useMutation(DELETE_POST);
  const [togglePostLike, { loading }] = useMutation(TOGGLE_POST_LIKE);
  const [togglePostSave, { loading: loading1 }] = useMutation(TOGGLE_POST_SAVE);
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handlers
  const handleTogglePostLike = async (post: Post) => {
    try {
      await togglePostLike({
        variables: { id: post.id },
        update(cache) {
          updatePostLikes({ cache, user, post });
        },
      });
    } catch (error) {
      debug.error(error?.message);
      if (error?.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(<CustomToast message="Couldn't like post" />);
      }
    }
  };

  const handleTogglePostSave = async (post: Post) => {
    try {
      await togglePostSave({
        variables: { id: post.id },
        update(cache) {
          updatePostSaves({ cache, user, post });
        },
      });
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(<CustomToast message="Couldn't save post" />);
      }
    }
  };

  const handleDeletePost = async (post: Post) => {
    try {
      await deletePost({
        variables: { id: post.id },
        update(cache) {
          deletePostFromCache({ cache, post });
        },
      });
      history.push(TO_HOME_PAGE);
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(<CustomToast message="Couldn't delete post" />);
      }
    }
  };

  // JSX
  return {
    handleTogglePostLike,
    handleTogglePostSave,
    handleDeletePost,
    isLikeSubmitted: loading,
    isSaveSubmitted: loading1,
    isDeletingPost: loading2,
  };
};

export default usePost;

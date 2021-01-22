import toast from "react-hot-toast";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";

import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";
import { Post } from "../../../utils/types/post";
import {
  TOGGLE_POST_LIKE,
  TOGGLE_POST_SAVE,
} from "../../../utils/mutations/post";
import { debug } from "../../../utils/services/debugService";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";
import { useUserContext } from "../../../utils/context/user";
import {
  updateCommentLikes,
  updatePostLikes,
  updatePostSaves,
} from "../../../utils/helpers/like";
import { TOGGLE_COMMENT_LIKE } from "../../../utils/mutations/comment";

interface Props {
  tabView?: boolean;
  post: Post;
}

const PostCard: React.FC<Props> = ({ tabView, post }) => {
  // Global Hook
  const { user } = useUserContext()!;

  // Other Hooks
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE, {
    variables: { id: post.id },
  });
  const [togglePostSave] = useMutation(TOGGLE_POST_SAVE, {
    variables: { id: post.id },
  });
  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE);
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handler
  const handleTogglePostLike = async () => {
    try {
      debug.log("Svg clicked");
      await togglePostLike({
        update(cache) {
          updatePostLikes(cache, user!, post);
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

  const handleTogglePostSave = async () => {
    try {
      debug.log("Svg clicked");
      await togglePostSave({
        update(cache) {
          updatePostSaves(cache, user!, post);
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

  // JSX
  if (tabView) {
    return (
      <PostCardTabView
        post={post}
        onTogglePostLike={handleTogglePostLike}
        onTogglePostSave={handleTogglePostSave}
        onToggleCommentLike={handleToggleCommentLike}
      />
    );
  }
  return (
    <PostCardDesktopView
      post={post}
      onTogglePostLike={handleTogglePostLike}
      onTogglePostSave={handleTogglePostSave}
      onToggleCommentLike={handleToggleCommentLike}
    />
  );
};

export default PostCard;

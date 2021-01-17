import toast from "react-hot-toast";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";

import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";
import { Post } from "../../../utils/types/post";
import { TOGGLE_LIKE } from "../../../utils/mutations/post";
import { debug } from "../../../utils/services/debugService";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";
import { useUserContext } from "../../../utils/context/user";
import {
  updateCommentLikes,
  updatePostLikes,
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
  const [toggleLike] = useMutation(TOGGLE_LIKE, { variables: { id: post.id } });
  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE);
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handler
  const handleToggleLike = async () => {
    try {
      debug.log("Svg clicked");
      await toggleLike({
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
        onToggleLike={handleToggleLike}
        onToggleCommentLike={handleToggleCommentLike}
      />
    );
  }
  return (
    <PostCardDesktopView
      post={post}
      onToggleLike={handleToggleLike}
      onToggleCommentLike={handleToggleCommentLike}
    />
  );
};

export default PostCard;

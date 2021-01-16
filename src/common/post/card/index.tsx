import React from "react";
import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";
import { Post } from "../../../utils/types/post";
import { useMutation } from "@apollo/client";
import { TOGGLE_LIKE } from "../../../utils/mutations/post";
import { debug } from "../../../utils/services/debugService";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";
import { useUserContext } from "../../../utils/context/user";
import { updatePostLikes, updatePostsLikes } from "../../../utils/helpers/like";

interface Props {
  tabView?: boolean;
  post: Post;
}

const PostCard: React.FC<Props> = ({ tabView, post }) => {
  // Global Hook
  const { user } = useUserContext()!;

  // Other Hooks
  const [toggleLike] = useMutation(TOGGLE_LIKE, { variables: { id: post.id } });
  const history = useHistory();
  const { pathname } = useLocation();
  const params = useParams() as { id: string };

  // Event Handler
  const handleToggleLike = async () => {
    try {
      debug.log("Svg clicked");
      await toggleLike({
        update(cache) {
          if (params.id) {
            updatePostLikes(cache, user!, post.id);
          } else {
            updatePostsLikes(cache, user!, post);
          }
        },
      });
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(TO_LOGIN_PAGE, pathname);
      }
    }
  };

  // JSX
  if (tabView) {
    return <PostCardTabView post={post} onToggleLike={handleToggleLike} />;
  }
  return <PostCardDesktopView post={post} onToggleLike={handleToggleLike} />;
};

export default PostCard;

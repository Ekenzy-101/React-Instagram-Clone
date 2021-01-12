import React from "react";
import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";
import { Post } from "../../../utils/types/post";
import { useMutation } from "@apollo/client";
import { TOGGLE_LIKE } from "../../../utils/mutations/post";
import { debug } from "../../../utils/services/debugService";
import { useHistory, useLocation } from "react-router-dom";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";

interface Props {
  tabView?: boolean;
  post: Post;
  refetch?: any;
}

const PostCard: React.FC<Props> = ({ tabView, post, refetch }) => {
  // Other Hooks
  const [toggleLike] = useMutation(TOGGLE_LIKE, { variables: { id: post.id } });
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handler
  const handleToggleLike = async () => {
    try {
      debug.log("Svg clicked");
      await toggleLike();
      refetch();
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

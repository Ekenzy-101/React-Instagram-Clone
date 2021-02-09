import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import React from "react";

import { TOGGLE_COMMENT_LIKE } from "../../utils/mutations/comment";
import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import { debug } from "../../utils/services/debugService";
import { updateCommentLikes } from "../../utils/helpers/like";
import { Post } from "../../utils/types/post";
import CustomToast from "../toast";

const useComment = () => {
  const { user } = useUser();

  // Other Hooks
  const [toggleCommentLike, { loading }] = useMutation(TOGGLE_COMMENT_LIKE);
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handlers
  const handleToggleCommentLike = async (options: {
    post: Post;
    id: string;
  }) => {
    const { post, id } = options;
    try {
      debug.log("Svg clicked");
      await toggleCommentLike({
        variables: { id },
        update(cache) {
          updateCommentLikes({ cache, user: user!, post, commentId: id });
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
        toast(<CustomToast message="Couldn't like comment" />);
      }
    }
  };

  // JSX
  return {
    handleToggleCommentLike,
    isLikeSubmitted: loading,
  };
};

export default useComment;

import { useMutation } from "@apollo/client";
import React, { createContext, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { TOGGLE_COMMENT_LIKE } from "../mutations/comment";
import { TO_LOGIN_PAGE } from "../constants/routes";
import { useUser } from "./user";
import { debug } from "../services/debugService";
import { updateCommentLikes } from "../helpers/like";
import { Post } from "../types/post";

const CommentContext = createContext<
  | {
      handleToggleCommentLike: (options: { post: Post; id: string }) => void;
      isLikeSubmitted: boolean;
    }
  | undefined
>(undefined);

export const CommentProvider: React.FC = ({ children }) => {
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
        toast(error?.message);
      }
    }
  };

  // JSX
  return (
    <CommentContext.Provider
      value={{
        handleToggleCommentLike,
        isLikeSubmitted: loading,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};

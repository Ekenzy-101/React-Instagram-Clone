import { useMutation } from "@apollo/client";
import React, { createContext, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { TOGGLE_POST_LIKE, TOGGLE_POST_SAVE } from "../mutations/post";
import { TO_LOGIN_PAGE } from "../constants/routes";
import { useUser } from "./user";
import { debug } from "../services/debugService";
import { updatePostLikes, updatePostSaves } from "../helpers/like";
import { Post } from "../types/post";

const PostContext = createContext<
  | {
      handleTogglePostLike: (post: Post) => void;
      handleTogglePostSave: (post: Post) => void;
      isLikeSubmitted: boolean;
      isSaveSubmitted: boolean;
    }
  | undefined
>(undefined);

export const PostProvider: React.FC = ({ children }) => {
  // Other Hooks
  const [togglePostLike, { loading }] = useMutation(TOGGLE_POST_LIKE);
  const [togglePostSave, { loading: loading1 }] = useMutation(TOGGLE_POST_SAVE);
  const { user } = useUser();
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handlers
  const handleTogglePostLike = async (post: Post) => {
    try {
      debug.log("Svg clicked");
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
        toast(error?.message);
      }
    }
  };

  const handleTogglePostSave = async (post: Post) => {
    try {
      debug.log("Svg clicked");
      await togglePostSave({
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
        toast(error?.message);
      }
    }
  };

  // JSX
  return (
    <PostContext.Provider
      value={{
        handleTogglePostLike,
        handleTogglePostSave,
        isLikeSubmitted: loading,
        isSaveSubmitted: loading1,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

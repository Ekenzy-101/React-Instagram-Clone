import React from "react";
import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";
import { Post } from "../../../utils/types/post";

interface Props {
  tabView?: boolean;
  post: Post;
}

const PostCard: React.FC<Props> = ({ tabView, post }) => {
  if (tabView) {
    return <PostCardTabView post={post} />;
  }
  return <PostCardDesktopView post={post} />;
};

export default PostCard;

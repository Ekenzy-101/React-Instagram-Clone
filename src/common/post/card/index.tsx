import React, { useState } from "react";
import PostCardTabView from "./tab-view";
import PostCardDesktopView from "./desktop-view";

interface Props {
  tabView?: boolean;
}

const PostCard: React.FC<Props> = ({ tabView }) => {
  if (tabView) {
    return <PostCardTabView />;
  }
  return <PostCardDesktopView />;
};

export default PostCard;

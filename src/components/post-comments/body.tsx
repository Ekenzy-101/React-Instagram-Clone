import { AppBar, Avatar, Toolbar } from "@material-ui/core";
import React, { useState } from "react";

import PostCardCommonComments from "../../common/post/card/common/comments";
import PostCardCommonForm from "../../common/post/card/common/form";
import { PROFILE_PIC_URL } from "../../utils/constants/url";
import { Post, PostComment } from "../../utils/types/post";
import { useStyles } from "./styles";
interface Props {
  post: Post;
}

const PostCommentsBody: React.FC<Props> = ({ post }) => {
  // State Hooks
  const [commentToReply, setCommentToReply] = useState<undefined | PostComment>(
    undefined
  );

  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <>
      <AppBar position="sticky" className={classes.commentWrapper}>
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.avatar} src={PROFILE_PIC_URL} />
          <PostCardCommonForm
            post={post}
            rounded
            commentToReply={commentToReply}
          />
        </Toolbar>
      </AppBar>
      <div style={{ padding: "1rem" }}>
        <PostCardCommonComments
          post={post}
          setCommentToReply={setCommentToReply}
          divider
        />
      </div>
    </>
  );
};

export default PostCommentsBody;

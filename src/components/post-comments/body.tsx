import { AppBar, Avatar, Toolbar } from "@material-ui/core";
import React from "react";

import PostCardCommonComments from "../../common/post/card/common/comments";
import PostCardCommonForm from "../../common/post/card/common/form";
import PostCommentModal from "../../common/post/modal/comment";
import { PROFILE_PIC_URL } from "../../utils/constants/url";
import { Post, PostComment } from "../../utils/types/post";
import { useStyles } from "./styles";

interface Props {
  post: Post;
  open: boolean;
  activeComment: undefined | PostComment;
  onToggleCommentLike: (id: string) => void;
  onDelete: () => void;
  setActiveComment: React.Dispatch<
    React.SetStateAction<PostComment | undefined>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostCommentsBody: React.FC<Props> = (props) => {
  const {
    post,
    open,
    setOpen,
    activeComment,
    setActiveComment,
    onToggleCommentLike,
    onDelete,
  } = props;
  // Global Hook
  const classes = useStyles();

  return (
    <>
      <PostCommentModal
        open={open}
        onClose={() => setOpen(false)}
        comment={activeComment}
        onDelete={onDelete}
      />
      <AppBar position="sticky" className={classes.commentWrapper}>
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.avatar} src={PROFILE_PIC_URL} />
          <PostCardCommonForm post={post} rounded />
        </Toolbar>
      </AppBar>
      <div style={{ padding: "1rem" }}>
        <PostCardCommonComments
          post={post}
          setActiveComment={setActiveComment}
          setOpen={setOpen}
          onToggleCommentLike={onToggleCommentLike}
          divider
        />
      </div>
    </>
  );
};

export default PostCommentsBody;

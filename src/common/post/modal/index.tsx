import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent } from "@material-ui/core";
import { useStyles } from "./styles";
import { useHistory, useParams } from "react-router-dom";
import { Post } from "../../../utils/types/post";
import { useUserContext } from "../../../utils/context/user";

interface Props {
  open: boolean;
  post: Post;
  onClose: () => void;
}

const PostModal: React.FC<Props> = ({ open, post, onClose }) => {
  // Global Context
  const { user } = useUserContext()!;
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const params = useParams() as { id: string };

  // JSX

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      {user?.username !== post.user.username ? (
        <DialogContent
          className={clsx(classes.dialogBtn, classes.dangerBtn)}
          dividers
        >
          Unfollow
        </DialogContent>
      ) : null}
      {user?.username === post.user.username ? (
        <DialogContent
          className={clsx(classes.dialogBtn, classes.dangerBtn)}
          dividers
        >
          Delete
        </DialogContent>
      ) : null}
      {!params.id ? (
        <DialogContent
          onClick={() => history.push(`/p/${post.id}/`)}
          className={classes.dialogBtn}
          dividers
        >
          Go to post
        </DialogContent>
      ) : null}{" "}
      <DialogContent className={classes.dialogBtn} dividers>
        Copy Link
      </DialogContent>
      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;

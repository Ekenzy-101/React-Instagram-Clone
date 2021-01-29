import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent } from "@material-ui/core";

import { useStyles } from "./styles";
import { useUser } from "../../../utils/context/user";
import { PostComment, ReplyComment } from "../../../utils/types/post";

interface Props {
  open: boolean;
  comment?: PostComment | ReplyComment;
  onDelete: () => void;
  onClose: () => void;
}
const PostCommentModal: React.FC<Props> = ({
  open,
  onClose,
  onDelete,
  comment,
}) => {
  // Global Hooks
  const { user: authUser } = useUser()!;

  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      {authUser?.id === comment?.user?.id ? (
        <DialogContent
          className={clsx(classes.dialogBtn, classes.dangerBtn)}
          dividers
          onClick={onDelete}
        >
          Delete
        </DialogContent>
      ) : null}

      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default PostCommentModal;

import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
}
const PostDeleteModal: React.FC<Props> = ({ open, onClose, onDelete }) => {
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      <DialogContent className={classes.dialogBtn} dividers>
        <Typography variant="h6">Delete Post?</Typography>
        <Typography
          style={{ fontSize: "0.8rem", textAlign: "center" }}
          color="textSecondary"
        >
          Are you sure you want to delete this post?
        </Typography>
      </DialogContent>
      <DialogContent
        className={clsx(classes.dialogBtn, classes.dangerBtn)}
        dividers
        onClick={onDelete}
      >
        Delete
      </DialogContent>

      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default PostDeleteModal;

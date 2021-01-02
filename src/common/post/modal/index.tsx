import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent } from "@material-ui/core";
import { useStyles } from "./styles";

const PostModal: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={true}
    >
      <DialogContent
        className={clsx(classes.dialogBtn, classes.dangerBtn)}
        dividers
      >
        Unfollow
      </DialogContent>
      <DialogContent className={classes.dialogBtn} dividers>
        Go to post
      </DialogContent>
      <DialogContent className={classes.dialogBtn} dividers>
        Copy Link
      </DialogContent>
      <DialogContent className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;

import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}
const PostNotSupportedModal: React.FC<Props> = ({ open, onClose }) => {
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
      <DialogContent className={classes.dialogBtn} dividers>
        <Typography variant="h6">Not Supported?</Typography>
        <Typography style={{ fontSize: "0.8rem" }} color="textSecondary">
          This feature is not supported yet. Please try again later
        </Typography>
      </DialogContent>

      <DialogContent
        onClick={onClose}
        className={clsx(classes.dialogBtn, classes.primaryBtn)}
        dividers
      >
        Continue
      </DialogContent>
    </Dialog>
  );
};

export default PostNotSupportedModal;

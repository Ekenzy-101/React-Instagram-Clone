import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import { Close } from "@material-ui/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}
const ProfileTitleModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className={classes.title}>
        <Typography></Typography>
        <Typography>Following</Typography>
        <Close />
      </DialogTitle>
      <DialogContent className={classes.dialogBtn} dividers>
        <div>
          <Avatar />
          <div>
            <Typography variant="h6">Not Supported?</Typography>
            <Typography style={{ fontSize: "0.8rem" }} color="textSecondary">
              This feature is not supported yet. Please try again later
            </Typography>
          </div>
          <Button>Follow</Button>
        </div>
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

export default ProfileTitleModal;

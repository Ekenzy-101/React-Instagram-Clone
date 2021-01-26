import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  mobileView?: boolean;
  onClose: () => void;
  onLogout?: () => void;
}
const LogoutModal: React.FC<Props> = ({
  open,
  onClose,
  onLogout,
  mobileView,
}) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  if (mobileView) {
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        className={classes.root}
        open={open}
        onClose={onClose}
      >
        <DialogContent className={classes.dialogBtn} dividers>
          <Typography variant="h6">Log Out?</Typography>
          <Typography
            style={{ fontSize: "0.8rem", textAlign: "center" }}
            color="textSecondary"
          >
            Are you sure you want to log out of your account?
          </Typography>
        </DialogContent>

        <DialogContent
          onClick={onLogout}
          className={clsx(classes.dialogBtn, classes.primaryBtn)}
          dividers
        >
          Log Out
        </DialogContent>
        <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
          Cancel
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
    >
      <DialogContent className={classes.dialogBtn} dividers>
        <Typography variant="h6">Logging Out</Typography>
        <Typography style={{ fontSize: "0.8rem" }} color="textSecondary">
          You need to log back in
        </Typography>
      </DialogContent>

      <DialogContent className={clsx(classes.dialogBtn)} dividers>
        Log in
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;

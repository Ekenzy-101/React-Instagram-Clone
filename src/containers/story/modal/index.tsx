import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
  onSwitchModal: () => void;
}
const StoryModal: React.FC<Props> = ({ open, onClose, onSwitchModal }) => {
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      <DialogContent
        className={clsx(classes.dialogBtn, classes.dangerBtn)}
        dividers
        onClick={onSwitchModal}
      >
        Delete
      </DialogContent>

      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;

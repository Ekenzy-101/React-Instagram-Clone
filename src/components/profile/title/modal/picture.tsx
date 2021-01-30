import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProfileTitlePictureModal: React.FC<Props> = ({
  open,
  onClose,
  onDelete,
  onUpload,
}) => {
  // Other Hooks
  const classes = useStyles();

  // Event Handlers
  const handleDelete = () => {
    onClose();
    onDelete();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClose();
    onUpload(e);
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Change Profile Photo
        </Typography>
      </DialogTitle>
      <DialogContent
        className={clsx(classes.dialogBtn, classes.primaryBtn)}
        dividers
      >
        <div className="file-input-wrapper">
          <input
            type="file"
            id="file-input"
            accept="image/png,image/jpeg"
            style={{ width: 208 }}
            onChange={handleUpload}
          />
          Upload Photo
        </div>
      </DialogContent>
      <DialogContent
        className={clsx(classes.dialogBtn, classes.dangerBtn)}
        dividers
        onClick={handleDelete}
      >
        Remove Current Photo
      </DialogContent>

      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default ProfileTitlePictureModal;

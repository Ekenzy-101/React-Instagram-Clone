import { Avatar, Dialog, DialogContent, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import { UserProfile } from "../../../../utils/types/user";
import { PROFILE_PIC_URL } from "../../../../utils/constants/url";

interface Props {
  open: boolean;
  onClose: () => void;
  onToggleFollow: (userId: string) => void;
  user: UserProfile;
}
const ProfileTitleUnfollowModal: React.FC<Props> = ({
  open,
  onClose,
  user,
  onToggleFollow,
}) => {
  // Other Hooks
  const classes = useStyles();

  // Event Handlers
  const handleClick = async () => {
    await onToggleFollow(user?.id!);
    onClose();
  };

  // JSX
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      <DialogContent className={classes.dialogBtn} dividers>
        <Avatar
          src={user?.image_url ? user?.image_url : PROFILE_PIC_URL}
          className={classes.avatar}
        />
        <Typography variant="body1" style={{ marginBottom: "1rem" }}>
          Unfollow @{user?.username}?
        </Typography>
      </DialogContent>
      <DialogContent
        onClick={handleClick}
        className={clsx(classes.dialogBtn, classes.dangerBtn)}
        dividers
      >
        Unfollow
      </DialogContent>
      <DialogContent
        style={{ fontWeight: 400 }}
        onClick={onClose}
        className={classes.dialogBtn}
        dividers
      >
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default ProfileTitleUnfollowModal;

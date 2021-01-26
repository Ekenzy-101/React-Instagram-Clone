import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ProfileTitleUnfollowModal from "../../components/profile/title/modal/unfollow";

import { PROFILE_PIC_URL } from "../../utils/constants/url";
import { UserProfile } from "../../utils/types/user";
import LoadingSpinner from "../loading/spinner";
import { modalState } from "../../utils/types/modal";

interface Props {
  open: boolean;
  submitted: boolean;
  title: string;
  users: UserProfile[];
  profile?: UserProfile;
  onClose?: () => void;
  onToggleFollow: (userId: string) => void;
}
const UsersModal: React.FC<Props> = (props) => {
  const {
    open,
    submitted,
    onClose,
    title,
    users,
    profile,
    onToggleFollow,
  } = props;
  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Other Hooks
  const classes = useStyles();

  // Event Handlers
  const handleOpen = (user: UserProfile) => {
    setSelectedUser(user);
    setShow("unfollow");
  };

  const handleClick = (user: UserProfile) => {
    setSelectedUser(user);
    onToggleFollow(user.id!);
  };

  const isFollowingUser = (id: string) => {
    return profile?.followers?.some((f) => f.id === id);
  };

  const isFollowedByUser = (id: string) => {
    return profile?.following?.some((f) => f.id === id);
  };

  // JSX
  return (
    <>
      <ProfileTitleUnfollowModal
        open={show === "unfollow"}
        onClose={() => setShow("none")}
        onToggleFollow={() => onToggleFollow(selectedUser?.id!)}
        user={selectedUser!}
      />
      <Dialog
        aria-labelledby="simple-dialog-title"
        className={classes.root}
        open={open}
        onClose={onClose}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography>
          <p></p>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <Close className={classes.closeButton} onClick={onClose} />
        </DialogTitle>
        <DialogContent className={classes.content} dividers>
          {users
            ?.filter((u) => u.id !== profile?.id)
            ?.map((u) => (
              <div className={classes.wrapper} key={u.id}>
                <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
                <div style={{ flexGrow: 1, margin: "auto 12px" }}>
                  <Typography className={classes.text}>
                    <strong>
                      <Link className={classes.link} to={`/${u.username}/`}>
                        {u.username}
                      </Link>
                    </strong>
                  </Typography>
                  <Typography className={classes.text}>{u.name}</Typography>
                </div>
                {isFollowedByUser(u.id!) ? (
                  <Button
                    onClick={() => handleOpen(u)}
                    className={classes.followingBtn}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleClick(u)}
                    className={classes.followBtn}
                  >
                    {submitted && selectedUser?.id === u.id ? (
                      <LoadingSpinner width={24} height={24} />
                    ) : isFollowingUser(u.id!) ? (
                      "Follow Back"
                    ) : (
                      "Follow"
                    )}
                  </Button>
                )}
              </div>
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersModal;

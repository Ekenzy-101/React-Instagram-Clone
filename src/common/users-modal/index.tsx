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

import LoadingSpinner from "../loading/spinner";
import ProfileTitleUnfollowModal from "../../components/profile/title/modal/unfollow";
import { PROFILE_PIC_URL } from "../../utils/constants/url";
import { User } from "../../utils/types/user";
import { modalState } from "../../utils/types/modal";
import { useUser } from "../../utils/context/user";
import { useFollow } from "../../utils/context/follow";

interface Props {
  open: boolean;
  title: string;
  users: User[];
  onClose?: () => void;
}
const UsersModal: React.FC<Props> = (props) => {
  const { open, onClose, title, users } = props;

  // Global State Hooks
  const { user: authUser } = useUser();
  const { handleToggleFollow, submitted } = useFollow();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Other Hooks
  const classes = useStyles();

  // Event Handlers
  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setShow("unfollow");
  };

  const handleClick = (user: User) => {
    setSelectedUser(user);
    handleToggleFollow(user);
  };

  // Other Logic
  const isFollowingUser = (id: string) => {
    return authUser?.followers?.some((f) => f.id === id);
  };

  const isFollowedByUser = (id: string) => {
    return authUser?.following?.some((f) => f.id === id);
  };

  // JSX
  return (
    <>
      <ProfileTitleUnfollowModal
        open={show === "unfollow"}
        onClose={() => setShow("none")}
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
            ?.filter((u) => u.id !== authUser?.id)
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

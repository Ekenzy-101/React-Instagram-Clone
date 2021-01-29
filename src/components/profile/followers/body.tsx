import { Avatar, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../../../common/loading/spinner";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useFollow } from "../../../utils/context/follow";
import { useUser } from "../../../utils/context/user";
import { User } from "../../../utils/types/user";
import ProfileTitleUnfollowModal from "../../profile/title/modal/unfollow";
import { useStyles } from "./styles";

interface Props {
  user: User;
}
const ProfileFollowersBody: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUser();
  const { handleToggleFollow, submitted } = useFollow();

  // State Hooks
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Other Hooks
  const classes = useStyles();

  // Event Handlers
  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
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
        open={open}
        onClose={() => setOpen(false)}
        user={selectedUser!}
      />
      <br />
      {user?.followers
        ?.filter((l) => l?.id !== authUser?.id)
        .map((l) => (
          <div className={classes.wrapper} key={l.id}>
            <Avatar
              src={l.image_url ? l.image_url : PROFILE_PIC_URL}
              className={classes.avatar}
            />
            <div style={{ flexGrow: 1, margin: "auto 12px" }}>
              <Typography className={classes.text}>
                <strong>
                  <Link className={classes.link} to={`/${l.username}/`}>
                    {l.username}
                  </Link>
                </strong>
              </Typography>
              <Typography className={classes.text}>{l.name}</Typography>
            </div>
            {isFollowedByUser(l.id!) ? (
              <Button
                onClick={() => handleOpen(l)}
                className={classes.followingBtn}
              >
                Following
              </Button>
            ) : (
              <Button
                onClick={() => handleClick(l)}
                className={classes.followBtn}
              >
                {submitted && selectedUser?.id === l.id ? (
                  <LoadingSpinner width={24} height={24} />
                ) : isFollowingUser(l.id!) ? (
                  "Follow Back"
                ) : (
                  "Follow"
                )}
              </Button>
            )}
          </div>
        ))}
    </>
  );
};

export default ProfileFollowersBody;

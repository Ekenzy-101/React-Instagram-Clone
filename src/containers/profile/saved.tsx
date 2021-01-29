import React from "react";
import { Paper } from "@material-ui/core";
import ProfileBodySaved from "../../components/profile/body/saved";
import ProfileWrapper from "../../components/profile/wrapper";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";

interface Props {
  user: User;
}

const ProfileSavedPage: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper user={user}>
        <ProfileBodySaved savedPosts={user.savedPosts!} />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfileSavedPage;

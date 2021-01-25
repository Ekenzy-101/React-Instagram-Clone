import React from "react";
import { Paper } from "@material-ui/core";
import ProfileBodySaved from "../../components/profile/body/saved";
import ProfileWrapper from "../../components/profile/wrapper";
import { UserProfile } from "../../utils/types/user";
import { useStyles } from "./styles";

interface Props {
  profile: UserProfile;
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: (userId: string) => void;
}

const ProfileSavedPage: React.FC<Props> = (props) => {
  const { user } = props;

  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper {...props}>
        <ProfileBodySaved savedPosts={user.savedPosts!} />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfileSavedPage;

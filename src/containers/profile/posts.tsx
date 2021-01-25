import React from "react";
import { Paper } from "@material-ui/core";

import ProfileBodyPosts from "../../components/profile/body/posts";
import { UserProfile } from "../../utils/types/user";
import { useStyles } from "./styles";
import ProfileWrapper from "../../components/profile/wrapper";

interface Props {
  profile: UserProfile;
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: (userId: string) => void;
}

const ProfilePostsPage: React.FC<Props> = (props) => {
  const { user } = props;
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper {...props}>
        <ProfileBodyPosts posts={user.posts!} />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfilePostsPage;

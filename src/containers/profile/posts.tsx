import React from "react";
import { Paper } from "@material-ui/core";

import ProfileBodyPosts from "../../components/profile/body/posts";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";
import ProfileWrapper from "../../components/profile/wrapper";
interface Props {
  user: User;
}

const ProfilePostsPage: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper user={user}>
        <ProfileBodyPosts posts={user.posts!} />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfilePostsPage;

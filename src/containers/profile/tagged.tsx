import React from "react";
import { Paper } from "@material-ui/core";

import ProfileBodyTagged from "../../components/profile/body/tagged";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";
import ProfileWrapper from "../../components/profile/wrapper";
interface Props {
  user: User;
}

const ProfileTaggedPage: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper user={user}>
        <ProfileBodyTagged />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfileTaggedPage;

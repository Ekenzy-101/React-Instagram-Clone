import React from "react";
import { Paper } from "@material-ui/core";

import ProfileBodyTagged from "../../components/profile/body/tagged";
import { UserProfile } from "../../utils/types/user";
import { useStyles } from "./styles";
import ProfileWrapper from "../../components/profile/wrapper";

interface Props {
  profile: UserProfile;
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: (userId: string) => void;
}

const ProfileTaggedPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper {...props}>
        <ProfileBodyTagged />
      </ProfileWrapper>
    </Paper>
  );
};

export default ProfileTaggedPage;

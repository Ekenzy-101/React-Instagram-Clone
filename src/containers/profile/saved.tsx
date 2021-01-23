import React from "react";
import { Paper } from "@material-ui/core";
import ProfileBodySaved from "../../components/profile/body/saved";
import ProfileWrapper from "../../components/profile/wrapper";
import Footer from "../../common/footer";
import { UserProfile } from "../../utils/types/user";
import { useStyles } from "./styles";

interface Props {
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: () => void;
}

const ProfileSavedPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileWrapper {...props}>
        <ProfileBodySaved />
      </ProfileWrapper>
      <Footer />
    </Paper>
  );
};

export default ProfileSavedPage;

import { Paper } from "@material-ui/core";
import React from "react";
import ProfileBody from "../../components/profile/body";
import ProfileTitle from "../../components/profile/title";
import { useStyles } from "./styles";
import ProfileHeader from "../../components/profile/header";
import Footer from "../../common/footer";

const ProfilePage: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileHeader />
      <ProfileTitle />
      <ProfileBody />
      <Footer />
    </Paper>
  );
};

export default ProfilePage;

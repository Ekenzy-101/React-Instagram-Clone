import { Hidden, Paper } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ProfileBody from "../../components/profile/body";
import ProfileTitle from "../../components/profile/title";
import ProfileHeader from "../../components/profile/header";
import Footer from "../../common/footer";
import { GET_USER } from "../../utils/queries/user";
import { useStyles } from "./styles";
import LoadingPage from "../../common/loading/page";
import { debug } from "../../utils/services/debugService";
import { UserProfile } from "../../utils/types/user";
import ProfileBodyDesktopView from "../../components/profile/body/desktop-view";
import ProfileBodyMobileView from "../../components/profile/body/mobile-view";
import ProfileTitleDesktopView from "../../components/profile/title/desktop-view";
import ProfileTitleMobileView from "../../components/profile/title/mobile-view";
import usePageTitle from "../../common/hooks/usePageTitle";

const ProfilePage: React.FC = () => {
  // Other Hooks
  const { username } = useParams() as { username: string };
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const classes = useStyles();

  // Effect Hooks
  usePageTitle(`@${username} - Instagram photos and videos`);

  debug.log(data);

  // JSX
  if (loading) return <LoadingPage />;

  if (!data?.user) return <div></div>;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileHeader user={data.user as UserProfile} />
      <div>
        <ProfileTitle>
          <Hidden smUp>
            <ProfileTitleMobileView user={data.user as UserProfile} />
          </Hidden>
          <Hidden xsDown>
            <ProfileTitleDesktopView user={data.user as UserProfile} />
          </Hidden>
        </ProfileTitle>
        <ProfileBody>
          <Hidden smUp>
            <ProfileBodyMobileView user={data.user as UserProfile} />
          </Hidden>
          <Hidden xsDown>
            <ProfileBodyDesktopView user={data.user as UserProfile} />
          </Hidden>
        </ProfileBody>
      </div>
      <Footer />
    </Paper>
  );
};

export default ProfilePage;

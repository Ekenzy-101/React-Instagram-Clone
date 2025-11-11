import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React from "react";
import { useTitle } from "react-use";
import { useParams } from "react-router-dom";

import Footer from "../../common/footer";
import ProfileFollowersHeader from "../../components/profile/followers/header";
import ProfileFollowersBody from "../../components/profile/followers/body";
import { GET_USER_FOLLOWERS } from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";
import NotFoundPage from "../../common/not-found";
import LoadingPage from "../../common/loading/page";

interface Props {
  username?: string;
}

const ProfileFollowersPage: React.FC<Props> = (props) => {
  // Other Hooks
  const classes = useStyles();
  const { username } = useParams() as { username: string };
  const { data, loading } = useQuery(GET_USER_FOLLOWERS, {
    variables: { username: props?.username ? props?.username : username },
  });
  useTitle("Kenzygram");

  // Other Logic
  const user = data?.user as User;
  debug.log("user", user);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!user) return <NotFoundPage />;
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileFollowersHeader />
      <ProfileFollowersBody user={user} />
      <Footer />
    </Paper>
  );
};

export default ProfileFollowersPage;

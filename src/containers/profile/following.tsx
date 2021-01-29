import { Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import React from "react";
import { useTitle } from "react-use";
import { useParams } from "react-router-dom";

import { GET_USER_FOLLOWING } from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import Footer from "../../common/footer";
import ProfileFollowingBody from "../../components/profile/following/body";
import ProfileFollowingHeader from "../../components/profile/following/header";
import { useStyles } from "./styles";
import NotFoundPage from "../../common/not-found";
import LoadingPage from "../../common/loading/page";

interface Props {
  username?: string;
}

const ProfileFollowingPage: React.FC<Props> = (props) => {
  // Other Hooks
  const classes = useStyles();
  const { username } = useParams() as { username: string };
  const { data, loading } = useQuery(GET_USER_FOLLOWING, {
    variables: { username: props?.username ? props?.username : username },
  });
  useTitle("Instagram");

  // Other Logic
  const user = data?.user as User;

  debug.log("user", user);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!user) return <NotFoundPage />;
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileFollowingHeader />
      <ProfileFollowingBody user={user} />
      <Footer />
    </Paper>
  );
};

export default ProfileFollowingPage;

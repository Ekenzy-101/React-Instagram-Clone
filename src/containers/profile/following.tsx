import { Paper } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import toast from "react-hot-toast";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { updateAuthUserFollowers } from "../../utils/helpers/user";
import { TOGGLE_FOLLOW } from "../../utils/mutations/user";
import {
  GET_RELATED_USERS,
  GET_USER_FOLLOWING,
} from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { UserProfile } from "../../utils/types/user";
import LoadingPage from "../../common/loading/page";
import Footer from "../../common/footer";
import ProfileFollowingBody from "../../components/profile/following/body";
import ProfileFollowingHeader from "../../components/profile/following/header";
import { useStyles } from "./styles";
import NotFoundPage from "../../common/not-found";

const ProfileFollowingPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { username } = useParams() as { username: string };
  const { pathname } = useLocation();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_USER_FOLLOWING, {
    variables: { username },
  });
  const { data: data1, loading: loading1, error: error1 } = useQuery(
    GET_RELATED_USERS
  );
  const [toggleFollow, { loading: submitted }] = useMutation(TOGGLE_FOLLOW);

  // Event Handler
  const handleToggleFollow = async (userId: string) => {
    try {
      await toggleFollow({
        variables: { id: userId },
        update(cache) {
          const authUser = data1?.profile as UserProfile | null;
          updateAuthUserFollowers(cache, authUser, userId);
        },
      });
    } catch (error) {
      debug.error(error?.message);
      if (error?.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?redirect_to=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(error?.message);
      }
    }
  };

  // Other Logic
  const user = data?.user as UserProfile;
  const profile = data1?.profile as UserProfile | null;

  debug.log("profile", profile);
  debug.log("user", user);

  // JSX
  if (loading || loading1) return <LoadingPage />;
  if (error || error1) return <div></div>;
  if (!user) return <NotFoundPage />;
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ProfileFollowingHeader />
      <ProfileFollowingBody
        onToggleFollow={handleToggleFollow}
        user={user}
        profile={profile}
        submitted={submitted}
      />
      <Footer />
    </Paper>
  );
};

export default ProfileFollowingPage;
import { useTitle } from "react-use";
import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import {
  TO_PROFILESAVED_PAGE,
  TO_PROFILETAGGED_PAGE,
  TO_PROFILE_PAGE,
} from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import ProfileSavedPage from "./saved";
import ProfileTaggedPage from "./tagged";
import ProfilePostsPage from "./posts";
import NotFoundPage from "../../common/not-found";
import LoadingPage from "../../common/loading/page";
interface Props {
  username?: string;
}

const ProfilePage: React.FC<Props> = (props) => {
  // Global Hooks
  const { user: authUser } = useUser()!;

  // Other Hooks
  const { username } = useParams() as { username: string };
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: props?.username ? props?.username : username },
  });
  useTitle(`@${username} - Instagram photos and videos`);

  const user = data?.user as User;
  const isAuthUser = authUser?.id === user?.id;

  debug.log("UserProfile", user);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!user) return <NotFoundPage />;
  return (
    <>
      <Switch>
        <Route path={TO_PROFILESAVED_PAGE} exact>
          {isAuthUser ? <ProfileSavedPage user={user} /> : <NotFoundPage />}
        </Route>
        <Route path={TO_PROFILETAGGED_PAGE} exact>
          <ProfileTaggedPage user={user} />
        </Route>
        <Route path={TO_PROFILE_PAGE} exact>
          <ProfilePostsPage user={user} />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default ProfilePage;

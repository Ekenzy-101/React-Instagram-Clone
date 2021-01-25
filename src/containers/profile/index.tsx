import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RELATED_USERS, GET_USER } from "../../utils/queries/user";
import LoadingPage from "../../common/loading/page";
import { debug } from "../../utils/services/debugService";
import { UserProfile } from "../../utils/types/user";
import usePageTitle from "../../common/hooks/usePageTitle";
import { TOGGLE_FOLLOW } from "../../utils/mutations/user";
import {
  TO_LOGIN_PAGE,
  TO_PROFILESAVED_PAGE,
  TO_PROFILETAGGED_PAGE,
  TO_PROFILE_PAGE,
} from "../../utils/constants/routes";
import { useUserContext } from "../../utils/context/user";
import { updateAuthUserFollowers } from "../../utils/helpers/user";
import ProfileSavedPage from "./saved";
import ProfileTaggedPage from "./tagged";
import ProfilePostsPage from "./posts";
import NotFoundPage from "../../common/not-found";

const ProfilePage: React.FC = () => {
  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // Other Hooks
  const { username } = useParams() as { username: string };
  const history = useHistory();
  const { pathname } = useLocation();
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { username },
  });
  const { data: data1, loading: loading1 } = useQuery(GET_RELATED_USERS);

  const [toggleFollow, { loading: submitted }] = useMutation(TOGGLE_FOLLOW);

  // Effect Hooks
  usePageTitle(`@${username} - Instagram photos and videos`);
  useEffect(() => {
    const controller = new AbortController();
    refetch();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = data?.user as UserProfile;
  const profile = data1?.profile as UserProfile;
  const isAuthUser = authUser?.id === user?.id;

  // Event Handler
  const handleToggleFollow = async (userId: string) => {
    try {
      await toggleFollow({
        variables: { id: userId },
        update(cache) {
          updateAuthUserFollowers(cache, profile, userId);
        },
      });
    } catch (error) {
      debug.error(error.message);
      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?redirect_to=${encodeURIComponent(pathname)}`,
          pathname
        );
      }
    }
  };

  debug.table(data);
  debug.table(data1);

  // JSX
  if (loading || loading1) return <LoadingPage />;
  if (!user) return <NotFoundPage />;

  return (
    <>
      <Switch>
        <Route path={TO_PROFILESAVED_PAGE} exact>
          {isAuthUser ? (
            <ProfileSavedPage
              onToggleFollow={handleToggleFollow}
              user={user}
              profile={profile}
              submitted={submitted}
            />
          ) : (
            <NotFoundPage />
          )}
        </Route>
        <Route path={TO_PROFILETAGGED_PAGE} exact>
          <ProfileTaggedPage
            onToggleFollow={handleToggleFollow}
            user={user}
            submitted={submitted}
            profile={profile}
          />
        </Route>
        <Route path={TO_PROFILE_PAGE} exact>
          <ProfilePostsPage
            onToggleFollow={handleToggleFollow}
            user={user}
            profile={profile}
            submitted={submitted}
          />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default ProfilePage;

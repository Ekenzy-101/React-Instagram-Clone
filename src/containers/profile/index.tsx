import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries/user";
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
import { updateUserFollowers } from "../../utils/helpers/user";
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
  const [toggleFollow, { loading: loading1 }] = useMutation(TOGGLE_FOLLOW);

  // Effect Hooks
  usePageTitle(`@${username} - Instagram photos and videos`);
  useEffect(() => {
    const controller = new AbortController();
    refetch();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event Handler
  const handleToggleFollow = async () => {
    const { id } = data?.user as UserProfile;
    try {
      await toggleFollow({
        variables: { id },
        update(cache) {
          updateUserFollowers(cache, data as { user: UserProfile }, authUser!);
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

  debug.log(data);

  const user = data?.user as UserProfile;
  const isAuthUser = authUser?.id === user?.id;
  // JSX
  if (loading) return <LoadingPage />;

  if (!user) return <NotFoundPage />;

  return (
    <Switch>
      <Route path={TO_PROFILESAVED_PAGE} exact>
        {isAuthUser ? (
          <ProfileSavedPage
            onToggleFollow={handleToggleFollow}
            user={user}
            submitted={loading1}
          />
        ) : (
          <NotFoundPage />
        )}
      </Route>
      <Route path={TO_PROFILETAGGED_PAGE} exact>
        <ProfileTaggedPage
          onToggleFollow={handleToggleFollow}
          user={user}
          submitted={loading1}
        />
      </Route>
      <Route path={TO_PROFILE_PAGE} exact>
        <ProfilePostsPage
          onToggleFollow={handleToggleFollow}
          user={user}
          submitted={loading1}
        />
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default ProfilePage;

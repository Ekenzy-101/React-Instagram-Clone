import { Switch, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import {
  TO_ACTIVITY_PAGE,
  TO_CREATEDETAILS_PAGE,
  TO_CREATESTYLE_PAGE,
  TO_EDITPROFILE_PAGE,
  TO_EXPLORE_PAGE,
  TO_EXPLORESEARCH_PAGE,
  TO_LOGIN_PAGE,
  TO_PASSWORDCHANGE_PAGE,
  TO_PASSWORDRESET_PAGE,
  TO_POSTCOMMENTS_PAGE,
  TO_POSTLIKES_PAGE,
  TO_POST_PAGE,
  TO_PROFILEFOLLOWERS_PAGE,
  TO_PROFILEFOLLOWING_PAGE,
  TO_PROFILE_PAGE,
  TO_SIGNUP_PAGE,
  TO_VERIFYEMAIL_PAGE,
} from "../utils/constants/routes";
import ProtectedRoute from "./protected-route";
import RedirectedRoute from "./redirected-route";
import HomeRoute from "./home-route";
import MobileRoute from "./mobile-route";
import LoadingPage from "../common/loading/page";
import ErrorBoundary from "./error-boundary";
const NotFoundPage = lazy(() => import("../common/not-found"));
const ExplorePage = lazy(() => import("../containers/explore"));
const ProfilePage = lazy(() => import("../containers/profile"));
const ProfileFollowingPage = lazy(
  () => import("../containers/profile/following")
);
const ProfileFollowersPage = lazy(
  () => import("../containers/profile/followers")
);
const PostPage = lazy(() => import("../containers/post"));
const PostCommentsPage = lazy(() => import("../containers/post-comments"));
const PostLikesPage = lazy(() => import("../containers/post-likes"));
const AddPostPage = lazy(() => import("../containers/add-post"));
const SignupPage = lazy(() => import("../containers/signup"));
const VerifyEmailPage = lazy(() => import("../containers/verify-email"));
const LoginPage = lazy(() => import("../containers/login"));
const PasswordResetPage = lazy(() => import("../containers/password-reset"));
const PasswordChangePage = lazy(() => import("../containers/password-change"));
const ActivityPage = lazy(() => import("../containers/activity"));
const EditProfilePage = lazy(() => import("../containers/edit-profile"));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage spinner />}>
        <Switch>
          <MobileRoute
            path={TO_POSTCOMMENTS_PAGE}
            exact
            authenticated
            component={PostCommentsPage}
          />
          <MobileRoute
            path={TO_POSTLIKES_PAGE}
            exact
            authenticated
            component={PostLikesPage}
          />
          <MobileRoute
            path={TO_CREATESTYLE_PAGE}
            exact
            authenticated
            component={AddPostPage}
          />
          <MobileRoute
            path={TO_CREATEDETAILS_PAGE}
            exact
            authenticated
            component={AddPostPage}
          />
          <MobileRoute
            path={TO_PROFILEFOLLOWING_PAGE}
            exact
            authenticated
            component={ProfileFollowingPage}
          />
          <MobileRoute
            path={TO_PROFILEFOLLOWERS_PAGE}
            exact
            authenticated
            component={ProfileFollowersPage}
          />
          <ProtectedRoute
            path={TO_ACTIVITY_PAGE}
            exact
            component={ActivityPage}
          />
          <ProtectedRoute
            path={TO_EDITPROFILE_PAGE}
            exact
            component={EditProfilePage}
          />
          <ProtectedRoute
            path={TO_PASSWORDCHANGE_PAGE}
            exact
            component={PasswordChangePage}
          />
          <ProtectedRoute
            path={TO_EXPLORE_PAGE}
            exact
            component={ExplorePage}
          />
          <ProtectedRoute
            path={TO_EXPLORESEARCH_PAGE}
            exact
            component={ExplorePage}
          />
          <RedirectedRoute path={TO_SIGNUP_PAGE} exact component={SignupPage} />
          <RedirectedRoute
            path={TO_VERIFYEMAIL_PAGE}
            exact
            component={VerifyEmailPage}
          />
          <RedirectedRoute
            path={TO_LOGIN_PAGE}
            exact={false}
            component={LoginPage}
          />
          <RedirectedRoute
            path={TO_PASSWORDRESET_PAGE}
            exact
            component={PasswordResetPage}
          />
          <Route path={TO_POST_PAGE} exact component={PostPage} />
          <Route path={TO_PROFILE_PAGE} component={ProfilePage} />
          <HomeRoute />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;

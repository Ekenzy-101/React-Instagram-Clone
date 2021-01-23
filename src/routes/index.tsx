import { Switch, Route } from "react-router-dom";
import React from "react";
import {
  TO_ACTIVITY_PAGE,
  TO_CREATEDETAILS_PAGE,
  TO_CREATESTYLE_PAGE,
  TO_EDITPROFILE_PAGE,
  TO_EXPLORE_PAGE,
  TO_LOGIN_PAGE,
  TO_PASSWORDCHANGE_PAGE,
  TO_PASSWORDRESET_PAGE,
  TO_POSTCOMMENTS_PAGE,
  TO_POSTLIKES_PAGE,
  TO_POST_PAGE,
  TO_PROFILE_PAGE,
  TO_SIGNUP_PAGE,
  TO_VERIFYEMAIL_PAGE,
} from "../utils/constants/routes";
import ProtectedRoute from "./protected-route";
import RedirectedRoute from "./redirected-route";
import HomeRoute from "./home-route";
import NotFoundPage from "../common/not-found";
import ExplorePage from "../containers/explore";
import ProfilePage from "../containers/profile";
import PostPage from "../containers/post";
import PostCommentsPage from "../containers/post-comments";
import PostLikesPage from "../containers/post-likes";
import AddPostPage from "../containers/add-post";
import SignupPage from "../containers/signup";
import VerifyEmailPage from "../containers/verify-email";
import LoginPage from "../containers/login";
import PasswordResetPage from "../containers/password-reset";
import PasswordChangePage from "../containers/password-change";
import ActivityPage from "../containers/activity";
import EditProfilePage from "../containers/edit-profile";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute
        path={TO_CREATESTYLE_PAGE}
        exact
        component={AddPostPage}
      />
      <ProtectedRoute
        path={TO_CREATEDETAILS_PAGE}
        exact
        component={AddPostPage}
      />
      <ProtectedRoute path={TO_ACTIVITY_PAGE} exact component={ActivityPage} />
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
      <ProtectedRoute path={TO_EXPLORE_PAGE} exact component={ExplorePage} />
      <Route path={TO_POST_PAGE} exact component={PostPage} />
      <Route path={TO_POSTCOMMENTS_PAGE} exact component={PostCommentsPage} />
      <Route path={TO_POSTLIKES_PAGE} exact component={PostLikesPage} />
      <RedirectedRoute path={TO_SIGNUP_PAGE} exact component={SignupPage} />
      <RedirectedRoute
        path={TO_VERIFYEMAIL_PAGE}
        exact
        component={VerifyEmailPage}
      />
      <RedirectedRoute path={TO_LOGIN_PAGE} exact component={LoginPage} />
      <RedirectedRoute
        path={TO_PASSWORDRESET_PAGE}
        exact
        component={PasswordResetPage}
      />
      <Route path={TO_PROFILE_PAGE} component={ProfilePage} />
      <HomeRoute />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;

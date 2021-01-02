import { Switch, Route } from "react-router-dom";
import React from "react";
import {
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_LOGIN_PAGE,
  TO_PASSWORDRESET_PAGE,
  TO_POST_PAGE,
  TO_PROFILE_PAGE,
  TO_SIGNUP_PAGE,
} from "../utils/constants/routes";
import HomePage from "../containers/home";
import ExplorePage from "../containers/explore";
import ProfilePage from "../containers/profile";
import PostPage from "../containers/post";
import SignupPage from "../containers/signup";
import LoginPage from "../containers/login";
import PasswordResetPage from "../containers/password-reset";

const Routes = () => {
  return (
    <Switch>
      <Route path={TO_HOME_PAGE} exact component={HomePage} />
      <Route path={TO_EXPLORE_PAGE} exact component={ExplorePage} />
      <Route path={TO_PROFILE_PAGE} exact component={ProfilePage} />
      <Route path={TO_POST_PAGE} exact component={PostPage} />
      <Route path={TO_SIGNUP_PAGE} exact component={SignupPage} />
      <Route path={TO_LOGIN_PAGE} exact component={LoginPage} />
      <Route path={TO_PASSWORDRESET_PAGE} exact component={PasswordResetPage} />
    </Switch>
  );
};

export default Routes;

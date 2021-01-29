import React from "react";
import LoadingWrapper from "../../common/loading/wrapper";
import HomePage from "../../containers/home";
import PostCommentsPage from "../../containers/post-comments";
import PostLikesPage from "../../containers/post-likes";
import AddPostPage from "../../containers/add-post";
import ProfilePage from "../../containers/profile";
import ProfileFollowersPage from "../../containers/profile/followers";
import ProfileFollowingPage from "../../containers/profile/following";
import ActivityPage from "../../containers/activity";
import EditProfilePage from "../../containers/edit-profile";
import ExplorePage from "../../containers/explore";
import PostPage from "../../containers/post";
import LoadingPage from "../../common/loading/page";
import {
  TO_ACTIVITY_PAGE,
  TO_CREATEDETAILS_PAGE,
  TO_CREATESTYLE_PAGE,
  TO_EDITPROFILE_PAGE,
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_POSTCOMMENTS_PAGE,
  TO_POSTLIKES_PAGE,
  TO_POST_PAGE,
  TO_PROFILEFOLLOWERS_PAGE,
  TO_PROFILEFOLLOWING_PAGE,
  TO_PROFILE_PAGE,
} from "../constants/routes";

export interface RedirectState {
  from: string;
  id?: string;
  username?: string;
}

export const renderPreviousView = (state: RedirectState) => {
  switch (state?.from) {
    case TO_POSTCOMMENTS_PAGE:
      return (
        <LoadingWrapper
          component={PostCommentsPage}
          AppProps={{ id: state?.id }}
        />
      );
    case TO_POSTLIKES_PAGE:
      return (
        <LoadingWrapper
          component={PostLikesPage}
          AppProps={{ id: state?.id }}
        />
      );
    case TO_CREATESTYLE_PAGE:
    case TO_CREATEDETAILS_PAGE:
      return <LoadingWrapper component={AddPostPage} />;
    case TO_PROFILE_PAGE:
      return (
        <LoadingWrapper
          component={ProfilePage}
          AppProps={{ username: state?.username }}
        />
      );
    case TO_PROFILEFOLLOWERS_PAGE:
      return (
        <LoadingWrapper
          component={ProfileFollowersPage}
          AppProps={{ username: state?.username }}
        />
      );
    case TO_PROFILEFOLLOWING_PAGE:
      return (
        <LoadingWrapper
          component={ProfileFollowingPage}
          AppProps={{ username: state?.username }}
        />
      );
    case TO_ACTIVITY_PAGE:
      return <LoadingWrapper component={ActivityPage} />;
    case TO_EDITPROFILE_PAGE:
      return <LoadingWrapper component={EditProfilePage} />;
    case TO_EXPLORE_PAGE:
      return <LoadingWrapper component={ExplorePage} />;
    case TO_POST_PAGE:
      return (
        <LoadingWrapper component={PostPage} AppProps={{ id: state?.id }} />
      );
    case TO_HOME_PAGE:
      return <LoadingWrapper component={HomePage} />;
    default:
      return <LoadingPage spinner />;
  }
};

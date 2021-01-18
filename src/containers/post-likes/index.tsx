import { Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import Footer from "../../common/footer";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST_LIKES } from "../../utils/queries/post";
import { GET_RELATED_USERS } from "../../utils/queries/user";
import LoadingPage from "../../common/loading/page";
import { debug } from "../../utils/services/debugService";
import { Post } from "../../utils/types/post";
import { useHistory, useParams, useLocation } from "react-router-dom";
import PostLikesHeader from "../../components/post-likes/header";
import PostLikesBody from "../../components/post-likes/body";
import { UserProfile } from "../../utils/types/user";
import { TOGGLE_FOLLOW } from "../../utils/mutations/user";
import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import toast from "react-hot-toast";
import { useTitle } from "react-use";
import { updateAuthUserFollowers } from "../../utils/helpers/user";

const PostLikesPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { id } = useParams() as { id: string };
  const { pathname } = useLocation();
  const history = useHistory();
  const [toggleFollow, { loading: loading2 }] = useMutation(TOGGLE_FOLLOW);
  const { data, loading, error } = useQuery(GET_POST_LIKES, {
    variables: { id },
  });
  const { data: data1, loading: loading1, error: error1 } = useQuery(
    GET_RELATED_USERS
  );

  useTitle("Instagram");

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
  const post = data?.post as Post;
  const profile = data1?.profile as UserProfile | null;

  debug.log(post);
  debug.log(profile);

  // JSX
  if (loading || loading1) return <LoadingPage />;
  if (error || error1) return <div></div>;

  return (
    <Paper className={classes.root} square variant="outlined">
      <PostLikesHeader />
      <PostLikesBody
        post={post}
        profile={profile}
        onToggleFollow={handleToggleFollow}
        submitted={loading2}
      />
      <Footer />
    </Paper>
  );
};

export default PostLikesPage;

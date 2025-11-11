import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React from "react";
import { useTitle } from "react-use";
import { useParams } from "react-router-dom";

import { useStyles } from "./styles";
import { GET_POST_LIKES } from "../../utils/queries/post";
import { debug } from "../../utils/services/debugService";
import { Post } from "../../utils/types/post";
import PostLikesHeader from "../../components/post-likes/header";
import PostLikesBody from "../../components/post-likes/body";
import NotFoundPage from "../../common/not-found";
import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";

interface Props {
  id?: string;
}

const PostLikesPage: React.FC<Props> = (props) => {
  // Other Hooks
  const classes = useStyles();
  const { id } = useParams() as { id: string };
  const { data, loading } = useQuery(GET_POST_LIKES, {
    variables: { id: props.id ? props.id : id },
  });

  useTitle("Kenzygram");

  // Other Logic
  const post = data?.post as Post;
  debug.log(post);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!post) return <NotFoundPage />;

  return (
    <Paper className={classes.root} square variant="outlined">
      <PostLikesHeader />
      <PostLikesBody post={post} />
      <Footer />
    </Paper>
  );
};

export default PostLikesPage;

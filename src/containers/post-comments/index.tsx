import { Paper } from "@material-ui/core";
import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useTitle } from "react-use";

import { useStyles } from "./styles";
import { Post } from "../../utils/types/post";
import { GET_POST_COMMENTS } from "../../utils/queries/post";
import PostCommentsHeader from "../../components/post-comments/header";
import PostCommentsBody from "../../components/post-comments/body";
import Footer from "../../common/footer";
import NotFoundPage from "../../common/not-found";
import LoadingPage from "../../common/loading/page";
interface Props {
  id?: string;
}

const PostCommentsPage: React.FC<Props> = (props) => {
  // Other Hooks
  const classes = useStyles();
  const { id } = useParams() as { id: string };
  const { data, loading } = useQuery(GET_POST_COMMENTS, {
    variables: { id: props.id ? props.id : id },
  });

  const post = data?.post as Post;
  const title = post
    ? `${post.user.username} on Instagram: "${post.caption}"`
    : "Instagram";
  useTitle(title);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!post) return <NotFoundPage />;

  return (
    <Paper className={classes.root} square variant="outlined">
      <PostCommentsHeader />
      <PostCommentsBody post={post} />
      <Footer />
    </Paper>
  );
};

export default PostCommentsPage;

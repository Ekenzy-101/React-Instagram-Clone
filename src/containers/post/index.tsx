import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useMedia, useTitle } from "react-use";

import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import NotFoundPage from "../../common/not-found";
import PostCard from "../../common/post/card";
import PostBody from "../../components/post/body";
import PostHeader from "../../components/post/header";
import { GET_POST } from "../../utils/queries/post";
import { debug } from "../../utils/services/debugService";
import { Post } from "../../utils/types/post";
import { useStyles } from "./styles";
interface Props {
  id?: string;
}

const PostPage: React.FC<Props> = (props) => {
  // Other Hooks
  const { id } = useParams() as { id: string };
  const { data, loading } = useQuery(GET_POST, {
    variables: { id: props.id ? props.id : id },
  });
  const classes = useStyles();
  const tabView = useMedia(`(max-width: 735px)`);
  useTitle(`Instagram`);

  const post = data?.post as Post;
  debug.table(post);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!post) return <NotFoundPage />;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <PostHeader />
      <div className={classes.wrapper}>
        <PostCard tabView={tabView} post={post} />
        <PostBody post={post} />
      </div>
      <Footer />
    </Paper>
  );
};

export default PostPage;

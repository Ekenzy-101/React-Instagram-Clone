import { useQuery } from "@apollo/client";
import { Paper, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../common/footer";
import usePageTitle from "../../common/hooks/usePageTitle";
import LoadingPage from "../../common/loading/page";
import PostCard from "../../common/post/card";
import PostBody from "../../components/post/body";
import PostHeader from "../../components/post/header";
import { GET_POST } from "../../utils/queries/post";
import { debug } from "../../utils/services/debugService";
import { Post } from "../../utils/types/post";
import { useStyles } from "./styles";

const PostPage: React.FC = () => {
  // Other Hooks
  const { id } = useParams() as { id: string };
  const { data, loading, refetch } = useQuery(GET_POST, { variables: { id } });
  const classes = useStyles();
  const tabView = useMediaQuery(`(max-width: 735px)`);

  // Effect Hooks
  usePageTitle(`Instagram`);

  debug.log(data);
  const post = data?.post as Post;
  // JSX
  if (loading) return <LoadingPage />;

  if (!post) return <div></div>;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <PostHeader />
      <div className={classes.wrapper}>
        <PostCard tabView={tabView} post={post} refetch={refetch} />
        <PostBody post={post} />
      </div>
      <Footer />
    </Paper>
  );
};

export default PostPage;

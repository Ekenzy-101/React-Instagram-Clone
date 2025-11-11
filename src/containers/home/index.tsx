import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTitle } from "react-use";

import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import PostCard from "../../common/post/card";
import HomeHeader from "../../components/home/header";
import HomeStatus from "../../components/home/status";
import { GET_POSTS } from "../../utils/queries/post";
import { GET_STORIES } from "../../utils/queries/story";
import { Post } from "../../utils/types/post";
import { useStyles } from "./styles";

const HomePage: React.FC = () => {
  // Other Hooks
  const { data, loading, refetch: refetchPosts } = useQuery(GET_POSTS);
  const {
    data: data1,
    loading: loading1,
    refetch: refetchStories,
  } = useQuery(GET_STORIES);
  const classes = useStyles();
  useTitle("Kenzygram");

  useEffect(() => {
    refetchPosts();
    refetchStories();
    return () => {};
    // eslint-disable-next-line
  }, []);

  // JSX
  if (data1 && data)
    return (
      <Paper variant="outlined" square className={classes.root}>
        <HomeHeader />
        <div className={classes.wrapper}>
          <HomeStatus stories={data1?.stories} />
          {(data?.posts as Post[])?.map((post) => (
            <PostCard tabView post={post} key={post.id} />
          ))}
        </div>
        <Footer />
      </Paper>
    );
  if (loading || loading1) return <LoadingPage spinner />;
  if (!data) return <div></div>;

  return null;
};

export default HomePage;

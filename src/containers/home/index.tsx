import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "react-use";

import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import PostCard from "../../common/post/card";
import HomeHeader from "../../components/home/header";
import HomeStatus from "../../components/home/status";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { GET_POSTS } from "../../utils/queries/post";
import { Post } from "../../utils/types/post";
import { useStyles } from "./styles";

const HomePage: React.FC = () => {
  // Other Hooks
  const { data, loading, refetch } = useQuery(GET_POSTS);
  const classes = useStyles();
  const { pathname } = useLocation();
  useTitle("Instagram");

  // Effect Hooks
  useEffect(() => {
    if (pathname === TO_HOME_PAGE) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!data) return <div></div>;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <HomeHeader />
      <div className={classes.wrapper}>
        <HomeStatus />
        {(data.posts as Post[]).map((post) => (
          <PostCard tabView post={post} key={post.id} />
        ))}
      </div>
      <Footer />
    </Paper>
  );
};

export default HomePage;

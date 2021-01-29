import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React from "react";
import { useTitle } from "react-use";
import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import ExploreBody from "../../components/explore/body";
import ExploreHeader from "../../components/explore/header";
import { GET_RANDOM_POSTS } from "../../utils/queries/post";
import { Post } from "../../utils/types/post";
import { useStyles } from "./styles";

const ExplorePage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { data, loading } = useQuery(GET_RANDOM_POSTS);
  useTitle("Instagram");

  // JSX
  if (loading) return <LoadingPage spinner />;
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ExploreHeader />
      <ExploreBody posts={data?.posts as Post[]} />
      <Footer />
    </Paper>
  );
};

export default ExplorePage;

import { Paper } from "@material-ui/core";
import React from "react";
import Footer from "../../common/footer";
import PostCard from "../../common/post/card";
import HomeHeader from "../../components/home/header";
import HomeStatus from "../../components/home/status";
import { useStyles } from "./styles";

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <HomeHeader />
      <div className={classes.wrapper}>
        <HomeStatus />
        <PostCard tabView />
        <PostCard tabView />
      </div>
      <Footer />
    </Paper>
  );
};

export default HomePage;

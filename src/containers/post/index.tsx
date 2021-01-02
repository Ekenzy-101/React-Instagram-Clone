import { Paper, useMediaQuery } from "@material-ui/core";
import React from "react";
import Footer from "../../common/footer";
import PostCard from "../../common/post/card";
import PostBody from "../../components/post/body";
import PostHeader from "../../components/post/header";
import { useStyles } from "./styles";

const PostPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const tabView = useMediaQuery(`(max-width: 735px)`);

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <PostHeader />
      <div className={classes.wrapper}>
        <PostCard tabView={tabView} />
        <PostBody />
      </div>
      <Footer />
    </Paper>
  );
};

export default PostPage;

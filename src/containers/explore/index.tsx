import { Paper } from "@material-ui/core";
import React from "react";
import Footer from "../../common/footer";
import ExploreBody from "../../components/explore/body";
import ExploreHeader from "../../components/explore/header";
import { useStyles } from "./styles";

const ExplorePage: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <ExploreHeader />
      <ExploreBody />
      <Footer />
    </Paper>
  );
};

export default ExplorePage;

import { Paper } from "@material-ui/core";
import React from "react";

import { useStyles } from "./styles";
import ActivityHeader from "../../components/activity/header";
import ActivityBody from "../../components/activity/body";
import Footer from "../../common/footer";

const ActivityPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Paper variant="outlined" className={classes.root}>
      <ActivityHeader />
      <ActivityBody />
      <Footer />
    </Paper>
  );
};

export default ActivityPage;

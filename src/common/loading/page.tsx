import { Avatar, Paper } from "@material-ui/core";
import React from "react";
import { IG_GREY_LOGO_URL } from "../../utils/constants/url";
import { useStyles } from "./styles";

const LoadingPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <Avatar src={IG_GREY_LOGO_URL} className={classes.greyLogo} />
    </Paper>
  );
};

export default LoadingPage;

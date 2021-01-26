import { Avatar, Paper } from "@material-ui/core";
import React from "react";
import { IG_GREY_LOGO_URL, LOADING_GIF_URL } from "../../utils/constants/url";
import { useStyles } from "./styles";
interface Props {
  spinner?: boolean;
}

const LoadingPage: React.FC<Props> = ({ spinner }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      {spinner ? (
        <Avatar src={LOADING_GIF_URL} className={classes.spinner} />
      ) : (
        <Avatar src={IG_GREY_LOGO_URL} className={classes.greyLogo} />
      )}
    </Paper>
  );
};

export default LoadingPage;

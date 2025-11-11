import { Avatar, Paper } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import React from "react";
import { LOADING_GIF_URL } from "../../utils/constants/url";
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
        <Instagram className={classes.greyLogo} />
      )}
    </Paper>
  );
};

export default LoadingPage;

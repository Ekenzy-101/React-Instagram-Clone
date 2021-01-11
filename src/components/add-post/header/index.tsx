import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { ArrowBackIos, Close } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

import { useStyles } from "./styles";
import { TO_CREATEDETAILS_PAGE } from "../../../utils/constants/routes";

interface Props {
  images: string[];
  onSubmit: () => void;
}

const AddPostHeader: React.FC<Props> = ({ images, onSubmit }) => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {pathname.includes("style") ? (
          <>
            <Close className={classes.icon} onClick={() => history.goBack()} />
            <Typography variant="h6" className={classes.text}>
              New Photo Post
            </Typography>
            <Button
              variant="text"
              onClick={() => history.push(TO_CREATEDETAILS_PAGE, images)}
              className={classes.btn}
              disabled={!images.length}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <ArrowBackIos
              className={classes.icon}
              onClick={() => history.goBack()}
            />
            <Typography variant="h6" className={classes.text}>
              New Post
            </Typography>
            <Button
              onClick={() => onSubmit()}
              variant="text"
              className={classes.btn}
              disabled={!images.length}
            >
              Share
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AddPostHeader;

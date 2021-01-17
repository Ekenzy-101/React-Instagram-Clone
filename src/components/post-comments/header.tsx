import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";

import { useStyles } from "./styles";
import DirectSvg from "../../common/svgs/DirectSvg";
import NotSupportedModal from "../../common/not-supported-modal";

const PostCommentsHeader: React.FC = () => {
  // State Hooks
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <>
      <NotSupportedModal open={open} onClose={() => setOpen(false)} />
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <ArrowBackIos
            className={classes.backIcon}
            onClick={() => history.goBack()}
          />{" "}
          <Typography variant="h6" color="textPrimary">
            Comments
          </Typography>
          <DirectSvg onClick={() => setOpen(true)} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PostCommentsHeader;

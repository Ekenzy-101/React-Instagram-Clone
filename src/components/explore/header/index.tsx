import { AppBar, Toolbar, Hidden } from "@material-ui/core";
import React from "react";

import CustomSearchMobileView from "../../../common/search/moblie-view";
import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";
import { User } from "../../../utils/types/user";
interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ExploreHeader: React.FC<Props> = ({ setUsers }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <CustomSearchMobileView setUsers={setUsers} />
        </Hidden>

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default ExploreHeader;

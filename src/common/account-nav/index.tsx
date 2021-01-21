import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  TO_EDITPROFILE_PAGE,
  TO_PASSWORDCHANGE_PAGE,
} from "../../utils/constants/routes";
import { useStyles } from "./styles";

const AccountNav: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <List className={classes.list}>
        <ListItem className={classes.listItem} button>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.navLink}
            to={TO_EDITPROFILE_PAGE}
          >
            <ListItemText
              primaryTypographyProps={{
                style: { fontWeight: "inherit" },
              }}
              primary="Edit Profile"
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem} button>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.navLink}
            to={TO_PASSWORDCHANGE_PAGE}
          >
            <ListItemText
              primaryTypographyProps={{
                style: { fontWeight: "inherit" },
              }}
              primary="Change Password"
            />
          </NavLink>
        </ListItem>
      </List>
    </Grid>
  );
};

export default AccountNav;

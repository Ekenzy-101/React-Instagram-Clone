import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { useLocation, Link, useRouteMatch } from "react-router-dom";

import ProfileSvg from "../svgs/ProfileSvg";
import SavedSvg from "../svgs/SavedSvg";
import SettingsSvg from "../svgs/SettingsSvg";
import SwitchAccountSvg from "../svgs/SwitchAccountSvg";
import { debug } from "../../utils/services/debugService";
import { useUser } from "../../utils/context/user";
import { logout } from "../../utils/services/authService";
import toast from "react-hot-toast";
import {
  TO_EDITPROFILE_PAGE,
  TO_HOME_PAGE,
} from "../../utils/constants/routes";
import NotSupportedModal from "../not-supported-modal";
import LogoutModal from "../logout-modal";
import { useStyles } from "./styles";
import { modalState } from "../../utils/types/modal";
import CustomToast from "../toast";
interface Props {
  anchorElement: null | HTMLElement;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
const HeaderMenu: React.FC<Props> = ({ anchorElement, setAnchorElement }) => {
  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const { pathname } = useLocation();
  const { path, params } = useRouteMatch();
  const { user } = useUser();
  const classes = useStyles();

  const handleLogout = async () => {
    setShow("logout");
    try {
      await logout();
      setAnchorElement(null);

      pathname === TO_HOME_PAGE
        ? window.location.reload()
        : window.location.replace(TO_HOME_PAGE);
    } catch (error) {
      debug.error(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        toast(<CustomToast message={error?.response?.data} />);
      } else {
        toast(
          <CustomToast message="An unexpected error occured. Please try again" />
        );
      }
    }
  };

  // JSX
  return (
    <>
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <LogoutModal open={show === "logout"} onClose={() => setShow("none")} />
      <Menu
        id="header-menu"
        anchorEl={anchorElement}
        style={{ left: 30 }}
        keepMounted
        transformOrigin={{
          vertical: -30,
          horizontal: "right",
        }}
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
      >
        <Link
          className={classes.link}
          to={{
            pathname: `/${user?.username}/`,
            state: { from: path, ...params },
          }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <ProfileSvg width={16} height={16} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
        </Link>
        <Link
          className={classes.link}
          to={{
            pathname: `/${user?.username}/saved/`,
            state: { from: path, ...params },
          }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <SavedSvg width={16} height={16} />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </MenuItem>
        </Link>
        <Link
          className={classes.link}
          to={{
            pathname: TO_EDITPROFILE_PAGE,
            state: { from: path, ...params },
          }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsSvg width={16} height={16} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
        </Link>
        <MenuItem
          className={classes.menuItem}
          onClick={() => setShow("not-supported")}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <SwitchAccountSvg />
          </ListItemIcon>
          <ListItemText primary="Switch Accounts" />
        </MenuItem>
        <Divider />
        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;

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
import { useUserContext } from "../../utils/context/user";
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
  const { user } = useUserContext()!;
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
        toast(error?.response?.data);
      } else {
        toast("An unexpected error occured. Please try again");
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
        style={{ width: "25rem", left: 0 }}
        keepMounted
        transformOrigin={{
          vertical: -30,
          horizontal: "left",
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
          <MenuItem>
            <ListItemIcon>
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
          <MenuItem>
            <ListItemIcon>
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
          <MenuItem>
            <ListItemIcon>
              <SettingsSvg width={16} height={16} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
        </Link>
        <MenuItem onClick={() => setShow("not-supported")}>
          <ListItemIcon>
            <SwitchAccountSvg />
          </ListItemIcon>
          <ListItemText primary="Switch Account" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;

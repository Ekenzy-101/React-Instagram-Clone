import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import ProfileSvg from "../svgs/ProfileSvg";
import SavedSvg from "../svgs/SavedSvg";
import SettingsSvg from "../svgs/SettingsSvg";
import SwitchAccountSvg from "../svgs/SwitchAccountSvg";
import { debug } from "../../utils/services/debugService";
import { useUserContext } from "../../utils/context/user";
import { logout } from "../../utils/services/authService";
import toast from "react-hot-toast";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import NotSupportedModal from "../not-supported-modal";
import LogoutModal from "../logout-modal";
import { GET_AUTH_USER } from "../../utils/queries/user";
interface Props {
  anchorElement: null | HTMLElement;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
const HeaderMenu: React.FC<Props> = ({ anchorElement, setAnchorElement }) => {
  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Hooks
  const history = useHistory();
  const { pathname } = useLocation();
  const { user } = useUserContext()!;
  const client = useApolloClient();

  // Event Handler
  const handleClick = (path: string) => {
    setAnchorElement(null);
    history.push(path);
  };

  const handleLogout = async () => {
    setOpen1(true);
    try {
      await logout();
      setAnchorElement(null);

      await client.cache.writeQuery({
        query: GET_AUTH_USER,
        data: { profile: null },
      });

      pathname === TO_HOME_PAGE
        ? history.push(TO_HOME_PAGE)
        : history.push(TO_HOME_PAGE);
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
      <NotSupportedModal open={open} onClose={() => setOpen(false)} />
      <LogoutModal open={open1} onClose={() => setOpen1(false)} />
      <Menu
        id="header-menu"
        anchorEl={anchorElement}
        style={{ width: "25rem", left: 0 }}
        keepMounted
        transformOrigin={{
          vertical: -50,
          horizontal: "left",
        }}
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
      >
        <MenuItem onClick={() => handleClick(`/${user?.username}/`)}>
          <ListItemIcon>
            <ProfileSvg width={16} height={16} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={() => handleClick(`/${user?.username}/saved/`)}>
          <ListItemIcon>
            <SavedSvg width={16} height={16} />
          </ListItemIcon>
          <ListItemText primary="Saved" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsSvg width={16} height={16} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={() => setOpen(true)}>
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

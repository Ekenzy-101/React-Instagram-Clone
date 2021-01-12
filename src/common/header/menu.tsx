import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../utils/context/user";

import ProfileSvg from "../svgs/ProfileSvg";
import SavedSvg from "../svgs/SavedSvg";
import SettingsSvg from "../svgs/SettingsSvg";
import SwitchAccountSvg from "../svgs/SwitchAccountSvg";

interface Props {
  anchorElement: null | HTMLElement;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
const HeaderMenu: React.FC<Props> = ({ anchorElement, setAnchorElement }) => {
  // Other Hooks
  const history = useHistory();
  const { user } = useUserContext()!;

  // Event Handler
  const handleClick = (path: string) => {
    setAnchorElement(null);
    history.push(path);
  };

  // JSX
  return (
    <Menu
      id="header-menu"
      anchorEl={anchorElement}
      style={{ width: "25rem", left: 0 }}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
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
      <MenuItem>
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
      <MenuItem>
        <ListItemIcon>
          <SwitchAccountSvg />
        </ListItemIcon>
        <ListItemText primary="Switch Account" />
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
};

export default HeaderMenu;

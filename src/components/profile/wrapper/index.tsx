import React, { useState } from "react";
import Footer from "../../../common/footer";
import { User } from "../../../utils/types/user";
import ProfileBodyDesktopView from "../body/desktop-view";
import ProfileBodyMobileView from "../body/mobile-view";
import ProfileHeader from "../header";
import ProfileTitleDesktopView from "../title/desktop-view";
import ProfileTitleMobileView from "../title/mobile-view";
import AccountNavMobileView from "../../../common/account-nav/mobile-view";
import { useStyles } from "./styles";
import { Paper } from "@material-ui/core";
interface Props {
  user: User;
}

const ProfileWrapper: React.FC<Props> = ({ user, children }) => {
  // State Hooks
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  // JSX
  if (open) return <AccountNavMobileView onClose={() => setOpen(false)} />;
  return (
    <Paper variant="outlined" className={classes.root}>
      <ProfileHeader user={user} onOpen={() => setOpen(true)} />
      <div>
        <ProfileTitleMobileView user={user} />
        <ProfileTitleDesktopView user={user} />
        <ProfileBodyMobileView user={user} />
        <ProfileBodyDesktopView user={user} />
        {children}
      </div>
      <Footer />
    </Paper>
  );
};

export default ProfileWrapper;

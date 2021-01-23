import React from "react";
import Footer from "../../../common/footer";
import { UserProfile } from "../../../utils/types/user";
import ProfileBodyDesktopView from "../body/desktop-view";
import ProfileBodyMobileView from "../body/mobile-view";
import ProfileHeader from "../header";
import ProfileTitleDesktopView from "../title/desktop-view";
import ProfileTitleMobileView from "../title/mobile-view";

interface Props {
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: () => void;
}

const ProfileWrapper: React.FC<Props> = (props) => {
  const { user, children } = props;
  return (
    <>
      <ProfileHeader user={user} />
      <div>
        <ProfileTitleMobileView {...props} />
        <ProfileTitleDesktopView {...props} />
        <ProfileBodyMobileView user={user} />
        <ProfileBodyDesktopView user={user} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ProfileWrapper;

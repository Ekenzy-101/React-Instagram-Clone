import React from "react";

import ProfileBodyTagged from "../../components/profile/body/tagged";
import { User } from "../../utils/types/user";
import ProfileWrapper from "../../components/profile/wrapper";
interface Props {
  user: User;
}

const ProfileTaggedPage: React.FC<Props> = ({ user }) => {
  return (
    <ProfileWrapper user={user}>
      <ProfileBodyTagged />
    </ProfileWrapper>
  );
};

export default ProfileTaggedPage;

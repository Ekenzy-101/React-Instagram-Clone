import React from "react";
import ProfileBodySaved from "../../components/profile/body/saved";
import ProfileWrapper from "../../components/profile/wrapper";
import { User } from "../../utils/types/user";
interface Props {
  user: User;
}

const ProfileSavedPage: React.FC<Props> = ({ user }) => {
  return (
    <ProfileWrapper user={user}>
      <ProfileBodySaved savedPosts={user.savedPosts!} />
    </ProfileWrapper>
  );
};

export default ProfileSavedPage;

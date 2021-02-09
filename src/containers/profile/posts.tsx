import React from "react";

import ProfileBodyPosts from "../../components/profile/body/posts";
import { User } from "../../utils/types/user";
import ProfileWrapper from "../../components/profile/wrapper";
interface Props {
  user: User;
}

const ProfilePostsPage: React.FC<Props> = ({ user }) => {
  return (
    <ProfileWrapper user={user}>
      <ProfileBodyPosts posts={user.posts!} />
    </ProfileWrapper>
  );
};

export default ProfilePostsPage;

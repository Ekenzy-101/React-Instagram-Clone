import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../../common/footer";
import { fileOptions, resizeFile } from "../../../utils/helpers";
import { UPDATE_PROFILE_PIC } from "../../../utils/mutations/user";
import { GET_AUTH_USER_INFO } from "../../../utils/queries/user";
import http from "../../../utils/services/httpService";
import { debug } from "../../../utils/services/debugService";
import { UserProfile } from "../../../utils/types/user";
import ProfileBodyDesktopView from "../body/desktop-view";
import ProfileBodyMobileView from "../body/mobile-view";
import ProfileHeader from "../header";
import ProfileTitleDesktopView from "../title/desktop-view";
import ProfileTitleMobileView from "../title/mobile-view";
import AccountNavMobileView from "../../../common/account-nav/mobile-view";

interface Props {
  profile: UserProfile;
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: (userId: string) => void;
}

const ProfileWrapper: React.FC<Props> = (props) => {
  const { user, children } = props;

  const [open, setOpen] = useState(false);

  const [updateProfilePic, { loading }] = useMutation(UPDATE_PROFILE_PIC);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const supportedTypes = ["image/png", "image/jpeg"];

    if (supportedTypes.every((type) => file?.type !== type)) {
      toast("Image is not a supported format");
      return;
    }

    const options: fileOptions = {
      file,
      maxHeight: 100,
      maxWidth: 100,
      minHeight: 50,
      minWidth: 50,
    };
    if (file) {
      try {
        const image = (await resizeFile(options)) as Blob;
        debug.log(image);

        let presignedUrl = "";
        let newImageUrl = "";
        await updateProfilePic({
          update(cache, { data }) {
            presignedUrl = data.updateProfilePicture as string;
            newImageUrl = presignedUrl.split("?", 1)[0];
            cache.writeQuery({
              query: GET_AUTH_USER_INFO,
              data: { profile: { ...user, image_url: newImageUrl } },
            });
          },
        });

        await http.put(presignedUrl, image, {
          headers: {
            "Content-Type": "image/jpeg",
          },
          withCredentials: false,
        });
      } catch (error) {
        debug.error(error?.message);
        toast(error?.message);
      }
    }
  };

  if (open) return <AccountNavMobileView onClose={() => setOpen(false)} />;
  return (
    <>
      <ProfileHeader user={user} onOpen={() => setOpen(true)} />
      <div>
        <ProfileTitleMobileView
          {...props}
          onUpload={handleUpload}
          isUploading={loading}
        />
        <ProfileTitleDesktopView
          {...props}
          onUpload={handleUpload}
          isUploading={loading}
        />
        <ProfileBodyMobileView user={user} />
        <ProfileBodyDesktopView user={user} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ProfileWrapper;

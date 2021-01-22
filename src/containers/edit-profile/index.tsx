import { Paper } from "@material-ui/core";
import React from "react";
import toast from "react-hot-toast";
import { useTitle } from "react-use";
import { useMutation, useQuery } from "@apollo/client";

import EditProfileHeader from "../../components/edit-profile/header";
import EditProfileBody from "../../components/edit-profile/body";
import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import { GET_AUTH_USER_INFO } from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { UserProfile } from "../../utils/types/user";
import { fileOptions, resizeFile } from "../../utils/helpers";
import http from "../../utils/services/httpService";
import { UPDATE_PROFILE_PIC } from "../../utils/mutations/user";
import { useStyles } from "./styles";

const EditProfilePage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { data, loading } = useQuery(GET_AUTH_USER_INFO);
  const [updateProfilePic, { loading: loading1 }] = useMutation(
    UPDATE_PROFILE_PIC
  );

  useTitle("Edit Profile - Instagram");

  debug.table(data?.profile);

  // Event Handlers
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
              data: { profile: { ...profile, image_url: newImageUrl } },
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

  const profile = data?.profile as UserProfile;

  // JSX
  if (loading) return <LoadingPage />;
  if (!data) return <div></div>;
  return (
    <Paper className={classes.root} square variant="outlined">
      <EditProfileHeader />
      <div className={classes.wrapper}>
        <EditProfileBody
          profile={profile}
          onUpload={handleUpload}
          isUploading={loading1}
        />
      </div>
      <Footer />
    </Paper>
  );
};

export default EditProfilePage;

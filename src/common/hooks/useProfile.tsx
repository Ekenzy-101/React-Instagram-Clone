import { useMutation } from "@apollo/client";
import React from "react";
import toast from "react-hot-toast";

import { fileOptions, resizeFile } from "../../utils/helpers";
import {
  DELETE_PROFILE_PIC,
  UPDATE_PROFILE_PIC,
} from "../../utils/mutations/user";
import { GET_USER, GET_AUTH_USER_INFO } from "../../utils/queries/user";
import http from "../../utils/services/httpService";
import { debug } from "../../utils/services/debugService";
import { useUser } from "../../utils/context/user";
import { User } from "../../utils/types/user";
import { useParams } from "react-router-dom";
import CustomToast from "../toast";

const useProfile = () => {
  // Global State Hooks
  const { user } = useUser();

  // Other Hooks
  const params = useParams() as { username: string };
  const [updateProfilePic, { loading }] = useMutation(UPDATE_PROFILE_PIC);
  const [deleteProfilePic, { loading: loading1 }] = useMutation(
    DELETE_PROFILE_PIC
  );

  // Event Handlers
  const handleUploadProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    const supportedTypes = ["image/png", "image/jpeg"];

    if (supportedTypes.every((type) => file?.type !== type)) {
      toast(<CustomToast message="Image is not a supported format" />);
      return;
    }

    const options: fileOptions = {
      file,
      maxHeight: 200,
      maxWidth: 200,
      minHeight: 150,
      minWidth: 150,
    };
    if (file) {
      try {
        const image = (await resizeFile(options)) as Blob;
        debug.log(image);

        await updateProfilePic({
          update: async (cache, { data }) => {
            const presignedUrl = data.updateProfilePicture as string;
            const newImageUrl = presignedUrl.split("?", 1)[0];

            await http.put(presignedUrl, image, {
              headers: {
                "Content-Type": "image/jpeg",
              },
              withCredentials: false,
            });

            if (params.username) {
              const userData = cache.readQuery({
                query: GET_USER,
                variables: { username: user?.username },
              }) as { user: User };

              cache.writeQuery({
                query: GET_USER,
                variables: { username: user?.username },
                data: {
                  user: { ...userData.user, image_url: newImageUrl },
                },
              });
            } else {
              const userData = cache.readQuery({
                query: GET_AUTH_USER_INFO,
              }) as { profile: User };

              cache.writeQuery({
                query: GET_AUTH_USER_INFO,
                data: {
                  profile: { ...userData.profile, image_url: newImageUrl },
                },
              });
            }
          },
        });
        toast(<CustomToast message="Profile photo added" />);
      } catch (error) {
        debug.error(error?.message);
        toast(<CustomToast message="Upload failed" />);
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      await deleteProfilePic({
        update(cache) {
          const data = cache.readQuery({
            query: GET_USER,
            variables: { username: user?.username },
          }) as { user: User };

          cache.writeQuery({
            query: GET_USER,
            variables: { username: user?.username },
            data: { user: { ...data.user, image_url: "" } },
          });
        },
      });
      toast(<CustomToast message="Profile photo removed" />);
    } catch (error) {
      debug.error(error?.message);
      toast(<CustomToast message="Couldn't remove photo" />);
    }
  };

  return {
    handleDeleteProfilePicture,
    handleUploadProfilePicture,
    isUploading: loading,
    isDeleting: loading1,
  };
};

export default useProfile;

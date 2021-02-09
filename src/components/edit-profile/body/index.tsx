import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { useMedia } from "react-use";

import { LOADING_GIF_URL, PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";
import { User } from "../../../utils/types/user";
import { UPDATE_PROFILE_INFO } from "../../../utils/mutations/user";
import { GET_AUTH_USER_INFO } from "../../../utils/queries/user";
import { modalState } from "../../../utils/types/modal";
import ProfileTitlePictureModal from "../../profile/title/modal/picture";
import EditProfileBodyWrapper from "./wrapper";
import useForm from "../../../common/hooks/useForm";
import useProfile from "../../../common/hooks/useProfile";
import LoadingSpinner from "../../../common/loading/spinner";
import AccountNav from "../../../common/account-nav";
import CustomToast from "../../../common/toast";
interface Props {
  profile: User;
}

const obj = {
  name: "",
  gender: "",
  email: "",
  website: "",
  username: "",
  bio: "",
};

const EditProfileBody: React.FC<Props> = ({ profile }) => {
  const {
    name,
    username,
    bio,
    gender,
    website,
    email,
    phone_no,
    image_url,
  } = profile;

  const [show, setShow] = useState<modalState>("none");
  // Other Hooks
  const classes = useStyles();
  const {
    handleUploadProfilePicture,
    handleDeleteProfilePicture,
    isDeleting,
    isUploading,
  } = useProfile();
  const {
    renderInput,
    renderSelect,
    renderTextArea,
    setFormData,
    formData,
  } = useForm({ ...obj }, {});
  const [updateProfileInfo, { loading }] = useMutation(UPDATE_PROFILE_INFO);
  const tabView = useMedia(`(max-width: 735px)`);

  // Effect Hooks
  useEffect(() => {
    setFormData({ name, username, bio, gender, website, email, phone_no });
  }, [name, username, bio, gender, website, email, phone_no, setFormData]);

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfileInfo({
        variables: { ...formData },
        update(cache) {
          cache.writeQuery({
            query: GET_AUTH_USER_INFO,
            data: { profile: formData },
          });
        },
      });
      toast(<CustomToast message="Profile saved" />);
    } catch (error) {
      toast(
        <CustomToast
          message="Couldn't save profile"
          btnText="Retry"
          onClick={() => handleSubmit(e)}
        />
      );
      setFormData({ name, username, bio, gender, website, email, phone_no });
    }
  };

  // JSX
  const avatarElement = (
    <div
      style={{ justifyContent: "flex-start" }}
      className="file-input-wrapper"
    >
      {image_url ? null : (
        <input
          type="file"
          id="file-input"
          accept="image/png,image/jpeg"
          style={{ width: 40 }}
          onChange={handleUploadProfilePicture}
        />
      )}
      <Avatar
        src={
          isUploading || isDeleting
            ? LOADING_GIF_URL
            : image_url
            ? image_url
            : PROFILE_PIC_URL
        }
        onClick={() => setShow("profile-picture")}
        className={classes.avatar}
      />
    </div>
  );

  const buttonElement = (
    <Button type="submit" disabled={loading} className={classes.submitBtn}>
      {loading ? <LoadingSpinner width={24} height={24} /> : "Submit"}
    </Button>
  );

  const changePictureElement = (
    <>
      <Typography>{username}</Typography>
      <div
        style={{ justifyContent: "flex-start" }}
        className="file-input-wrapper"
      >
        {image_url ? null : (
          <input
            type="file"
            id="file-input"
            accept="image/png,image/jpeg"
            style={{ width: 160 }}
            onChange={handleUploadProfilePicture}
          />
        )}
        <Button
          className={classes.selectBtn}
          onClick={() => setShow("profile-picture")}
          variant="text"
          color="primary"
        >
          Change Profile Photo
        </Button>
      </div>
    </>
  );

  const nameInfoElement = (
    <Typography className={classes.secondaryText} color="textSecondary">
      Help people discover your account by using the name you're known by:
      either your full name, nickname, or business name
    </Typography>
  );

  const personalInfoElement = (
    <>
      <Typography
        className={classes.text}
        variant="body1"
        color="textSecondary"
      >
        <strong>Personal Information</strong>
      </Typography>
      <Typography className={classes.secondaryText} color="textSecondary">
        Provide your personal information, even if the account is used for a
        business, a pet or something else. This won't be a part of your public
        profile
      </Typography>
    </>
  );
  return (
    <>
      <ProfileTitlePictureModal
        open={show === "profile-picture"}
        onClose={() => setShow("none")}
        onDelete={handleDeleteProfilePicture}
        onUpload={handleUploadProfilePicture}
      />
      <Paper className={classes.root}>
        <Grid container>
          {tabView ? null : (
            <>
              <AccountNav />
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <Grid item xs={tabView ? 12 : 8}>
            <br />
            <br />
            <EditProfileBodyWrapper
              centerComponent={
                <div className={classes.wrapper}>
                  {avatarElement}
                  <div>{changePictureElement}</div>
                </div>
              }
              leftComponent={avatarElement}
              rightComponent={changePictureElement}
            />

            <form onSubmit={handleSubmit}>
              {renderInput({
                variant: tabView ? "align-center" : "justify-center",
                name: "name",
                label: "Name",
                placeholder: "Name",
              })}

              <EditProfileBodyWrapper
                centerComponent={nameInfoElement}
                rightComponent={nameInfoElement}
              />

              {renderInput({
                variant: tabView ? "align-center" : "justify-center",
                name: "username",
                label: "Username",
                placeholder: "Username",
              })}

              {renderInput({
                variant: tabView ? "align-center" : "justify-center",
                name: "website",
                label: "Website",
                placeholder: "Website",
              })}

              {renderTextArea({
                variant: tabView ? "align-center" : "justify-center",
                name: "bio",
                label: "Bio",
              })}

              <EditProfileBodyWrapper
                centerComponent={personalInfoElement}
                rightComponent={personalInfoElement}
              />

              {renderInput({
                variant: tabView ? "align-center" : "justify-center",
                name: "email",
                label: "Email",
                placeholder: "Email",
              })}

              {renderInput({
                variant: tabView ? "align-center" : "justify-center",
                name: "phone_no",
                label: "Phone Number",
                placeholder: "Phone Number",
              })}

              {renderSelect({
                variant: tabView ? "align-center" : "justify-center",
                name: "gender",
                label: "Gender",
                options: [
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Prefer Not to say", value: "" },
                ],
              })}

              <EditProfileBodyWrapper
                centerComponent={
                  <div className={classes.wrapper}>{buttonElement}</div>
                }
                rightComponent={buttonElement}
              />
            </form>
            <br />
            <br />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default EditProfileBody;

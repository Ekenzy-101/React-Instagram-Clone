import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { LOADING_GIF_URL, PROFILE_PIC_URL } from "../../../utils/constants/url";
import AccountNav from "../../../common/account-nav";
import { useStyles } from "./styles";
import EditProfileBodyWrapper from "./wrapper";
import useForm from "../../../common/hooks/useForm";
import { UserProfile } from "../../../utils/types/user";
import { UPDATE_PROFILE_INFO } from "../../../utils/mutations/user";
import LoadingSpinner from "../../../common/loading/spinner";
import { GET_AUTH_USER_INFO } from "../../../utils/queries/user";

interface Props {
  profile: UserProfile;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}
const obj = {
  name: "",
  gender: "",
  email: "",
  website: "",
  username: "",
  bio: "",
};

const EditProfileBody: React.FC<Props> = (props) => {
  const { profile, onUpload, isUploading } = props;
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

  // Other Hooks
  const classes = useStyles();
  const {
    renderInput,
    renderSelect,
    renderTextArea,
    setFormData,
    formData,
  } = useForm({ ...obj }, {});
  const [updateProfileInfo, { loading }] = useMutation(UPDATE_PROFILE_INFO);
  const tabView = useMediaQuery(`(max-width: 735px)`);

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
      toast("Profile saved");
    } catch (error) {
      toast(error?.message);
      setFormData({ name, username, bio, gender, website, email, phone_no });
    }
  };

  // JSX
  const avatarElement = (
    <Avatar
      src={
        isUploading
          ? LOADING_GIF_URL
          : image_url
          ? PROFILE_PIC_URL
          : PROFILE_PIC_URL
      }
      className={classes.avatar}
    />
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
        <input
          type="file"
          id="file-input"
          accept="image/png,image/jpeg"
          style={{ width: 160 }}
          onChange={onUpload}
        />
        <Button className={classes.selectBtn} variant="text" color="primary">
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

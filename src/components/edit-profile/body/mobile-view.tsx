import { useMutation } from "@apollo/client";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import useForm from "../../../common/hooks/useForm";
import LoadingSpinner from "../../../common/loading/spinner";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { UPDATE_PROFILE_INFO } from "../../../utils/mutations/user";
import { GET_AUTH_USER_INFO } from "../../../utils/queries/user";
import { UserProfile } from "../../../utils/types/user";
import { useStyles } from "./styles";
import EditProfileBodyWrapper from "./wrapper";

interface Props {
  profile: UserProfile;
}

const obj = {
  name: "",
  gender: "",
  email: "",
  website: "",
  username: "",
  bio: "",
};

const EditProfileBodyMobileView: React.FC<Props> = ({ profile }) => {
  const { name, username, bio, gender, website, email, phone_no } = profile;

  const classes = useStyles();
  const {
    renderInput,
    renderSelect,
    renderTextArea,
    setFormData,
    formData,
  } = useForm({ ...obj }, {});
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE_INFO);

  useEffect(() => {
    setFormData({ name, username, bio, gender, website, email, phone_no });
  }, [name, username, bio, gender, website, email, phone_no, setFormData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile({
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

  return (
    <>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <br />
            <br />
            <EditProfileBodyWrapper
              centerComponent={
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className={classes.wrapper}
                >
                  <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />

                  <div>
                    <Typography>Onyekaba Ekene</Typography>
                    <div
                      style={{ justifyContent: "flex-start" }}
                      className="file-input-wrapper"
                    >
                      <input
                        type="file"
                        id="file-input"
                        style={{ width: 160 }}
                      />
                      <Button
                        className={classes.selectBtn}
                        variant="text"
                        color="primary"
                      >
                        Change Profile Photo
                      </Button>
                    </div>
                  </div>
                </div>
              }
            />
            <form onSubmit={handleSubmit}>
              {renderInput({
                variant: "align-center",
                name: "name",
                label: "Name",
                placeholder: "Name",
              })}

              <EditProfileBodyWrapper
                centerComponent={
                  <Typography
                    className={classes.secondaryText}
                    color="textSecondary"
                  >
                    Help people discover your account by using the name you're
                    known by: either your full name, nickname, or business name
                  </Typography>
                }
              />

              {renderInput({
                variant: "align-center",
                name: "username",
                label: "Username",
                placeholder: "Username",
              })}

              {renderInput({
                variant: "align-center",
                name: "website",
                label: "Website",
                placeholder: "Website",
              })}

              {renderTextArea({
                variant: "align-center",
                name: "bio",
                label: "Bio",
              })}

              <EditProfileBodyWrapper
                centerComponent={
                  <>
                    <Typography
                      className={classes.text}
                      variant="body1"
                      color="textSecondary"
                    >
                      <strong>Personal Information</strong>
                    </Typography>
                    <Typography
                      className={classes.secondaryText}
                      color="textSecondary"
                    >
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile
                    </Typography>
                  </>
                }
              />

              {renderInput({
                variant: "align-center",
                name: "email",
                label: "Email",
                placeholder: "Email",
              })}

              {renderInput({
                variant: "align-center",
                name: "phone_no",
                label: "Phone Number",
                placeholder: "Phone Number",
              })}

              {renderSelect({
                variant: "align-center",
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
                  <div className={classes.wrapper}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className={classes.submitBtn}
                    >
                      {loading ? <LoadingSpinner /> : "Submit"}
                    </Button>
                  </div>
                }
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

export default EditProfileBodyMobileView;

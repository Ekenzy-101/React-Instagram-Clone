import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useMutation } from "@apollo/client";

import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import AccountNav from "../../../common/account-nav";
import { useStyles } from "./styles";
import PasswordChangeBodyWrapper from "./wrapper";
import useForm from "../../../common/hooks/useForm";
import { UPDATE_PASSWORD } from "../../../utils/mutations/user";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../common/loading/spinner";
import { useUserContext } from "../../../utils/context/user";

const obj = {
  password: "",
  new_password: "",
  new_password_confirmation: "",
};

const PasswordChangeBodyDesktopView: React.FC = () => {
  // Global State Hooks
  const { user } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const { renderInput, formData, setFormData } = useForm({ ...obj }, {});
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePassword({
        variables: { ...formData },
      });
      toast("Password changed");
      setFormData({ ...obj });
    } catch (error) {
      toast(error?.message);
    }
  };

  const areFormInputsEmpty = () => {
    return Object.values(formData).some((v) => !v);
  };

  const isDisabled = loading || areFormInputsEmpty();
  return (
    <>
      <Paper className={classes.root}>
        <Grid container>
          <AccountNav />
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8}>
            <br />
            <br />
            <PasswordChangeBodyWrapper
              leftComponent={
                <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
              }
              rightComponent={
                <Typography variant="h5">{user?.username}</Typography>
              }
            />
            <form onSubmit={handleSubmit}>
              {renderInput({
                variant: "justify-center",
                name: "password",
                label: "Old Password",
                type: "password",
              })}

              {renderInput({
                variant: "justify-center",
                name: "new_password",
                label: "New Password",
                type: "password",
              })}

              {renderInput({
                variant: "justify-center",
                name: "new_password_confirmation",
                label: "Confirm New Password",
                type: "password",
              })}

              <PasswordChangeBodyWrapper
                rightComponent={
                  <Button
                    type="submit"
                    style={{ opacity: isDisabled ? 0.5 : 1, minWidth: "139px" }}
                    disabled={isDisabled}
                    className={classes.submitBtn}
                  >
                    {loading ? <LoadingSpinner /> : "Change Password"}
                  </Button>
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

export default PasswordChangeBodyDesktopView;

import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import AccountNav from "../../../common/account-nav";
import { useStyles } from "./styles";
import PasswordChangeBodyWrapper from "./wrapper";
import useForm from "../../../common/hooks/useForm";
import { UPDATE_PASSWORD } from "../../../utils/mutations/user";
import LoadingSpinner from "../../../common/loading/spinner";
import { useUser } from "../../../utils/context/user";
import CustomToast from "../../../common/toast";
import { useHistory, useLocation } from "react-router-dom";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";

const obj = {
  password: "",
  new_password: "",
  new_password_confirmation: "",
};

const PasswordChangeBody: React.FC = () => {
  // Global State Hooks
  const { user } = useUser();

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { renderInput, formData, setFormData } = useForm({ ...obj }, {});
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);
  const tabView = useMediaQuery(`(max-width: 735px)`);

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePassword({
        variables: { ...formData },
      });
      toast(<CustomToast message="Password changed" />);

      setFormData({ ...obj });
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(
          <CustomToast
            message="Couldn't change password"
            btnText="Retry"
            onClick={() => handleSubmit(e)}
          />
        );
      }
    }
  };

  // Other Logic
  const areFormInputsEmpty = () => {
    return Object.values(formData).some((v) => !v);
  };

  const isDisabled = loading || areFormInputsEmpty();

  // JSX
  const buttonElement = (
    <Button
      type="submit"
      style={{
        opacity: isDisabled ? 0.5 : 1,
        minWidth: "139px",
      }}
      disabled={isDisabled}
      className={classes.submitBtn}
    >
      {loading ? <LoadingSpinner /> : "Change Password"}
    </Button>
  );

  return (
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
          <PasswordChangeBodyWrapper
            leftComponent={
              <Avatar
                src={user?.image_url ? user?.image_url : PROFILE_PIC_URL}
                className={classes.avatar}
              />
            }
            rightComponent={
              <Typography variant="h5">{user?.username}</Typography>
            }
            centerComponent={
              <div className={classes.wrapper}>
                <Avatar
                  src={user?.image_url ? user?.image_url : PROFILE_PIC_URL}
                  className={classes.avatar}
                />
                <Typography variant="h5">{user?.username}</Typography>
              </div>
            }
          />
          <form onSubmit={handleSubmit}>
            {renderInput({
              variant: tabView ? "align-center" : "justify-center",
              name: "password",
              label: "Old Password",
              type: "password",
            })}

            {renderInput({
              variant: tabView ? "align-center" : "justify-center",
              name: "new_password",
              label: "New Password",
              type: "password",
            })}

            {renderInput({
              variant: tabView ? "align-center" : "justify-center",
              name: "new_password_confirmation",
              label: "Confirm New Password",
              type: "password",
            })}

            <PasswordChangeBodyWrapper
              rightComponent={buttonElement}
              centerComponent={
                <div className={classes.wrapper}>{buttonElement}</div>
              }
            />
          </form>
          <br />
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PasswordChangeBody;

import { useMutation } from "@apollo/client";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import toast from "react-hot-toast";
import useForm from "../../../common/hooks/useForm";
import LoadingSpinner from "../../../common/loading/spinner";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useUserContext } from "../../../utils/context/user";
import { UPDATE_PASSWORD } from "../../../utils/mutations/user";
import { useStyles } from "./styles";
import PasswordChangeBodyWrapper from "./wrapper";

const obj = {
  password: "",
  new_password: "",
  new_password_confirmation: "",
};

const PasswordChangeBodyMobileView: React.FC = () => {
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
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <br />
          <br />
          <PasswordChangeBodyWrapper
            centerComponent={
              <div className={classes.wrapper}>
                <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
                <Typography variant="h5">{user?.username}</Typography>
              </div>
            }
          />

          <form onSubmit={handleSubmit}>
            {renderInput({
              variant: "align-center",
              name: "password",
              label: "Old Password",
              type: "password",
            })}

            {renderInput({
              variant: "align-center",
              name: "new_password",
              label: "New Password",
              type: "password",
            })}

            {renderInput({
              variant: "align-center",
              name: "new_password_confirmation",
              label: "Confirm New Password",
              type: "password",
            })}

            <PasswordChangeBodyWrapper
              centerComponent={
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    style={{ opacity: isDisabled ? 0.5 : 1, minWidth: "139px" }}
                    disabled={isDisabled}
                    className={classes.submitBtn}
                  >
                    {loading ? <LoadingSpinner /> : "Change Password"}
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
  );
};

export default PasswordChangeBodyMobileView;

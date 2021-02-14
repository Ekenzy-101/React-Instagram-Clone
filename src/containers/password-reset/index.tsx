import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";

import useForm from "../../common/hooks/useForm";
import CustomToast from "../../common/toast";
import PasswordResetFooter from "../../components/password-reset/footer";
import PasswordResetHeader from "../../components/password-reset/header";
import { TO_SIGNUP_PAGE } from "../../utils/constants/routes";
import { PASSWORD_LOCK_LOGO_URL } from "../../utils/constants/url";
import { validateEmail } from "../../utils/helpers/validation";
import { forgotPassword } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";

const PasswordResetPage: React.FC = () => {
  const classes = useStyles();
  const { renderButton, renderInput, formData, setFormState } = useForm({
    email: "",
  });
  useTitle("Reset Password - Instagram");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState("submitted");
    try {
      await forgotPassword(formData.email);
      toast(
        <CustomToast
          message={`We have sent an email to ${formData.email} with a link to get back into your account`}
        />
      );
    } catch (error) {
      debug.log(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        toast(<CustomToast message={error?.response?.data} />);
      } else {
        toast(
          <CustomToast message="An unexpected error occured. Please try again" />
        );
      }
    }
    setFormState("initial");
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <PasswordResetHeader />
      <div>
        <div className={classes.wrapper}>
          <div className={classes.formWrapper}>
            <Avatar
              src={PASSWORD_LOCK_LOGO_URL}
              className={classes.icon}
              variant="square"
            />
            <Typography className={classes.text}>Trouble Logging in</Typography>
            <Typography className={classes.text} color="textSecondary">
              Enter your email and we'll send you a link to get back into your
              account
            </Typography>
            <form onSubmit={handleSubmit}>
              {renderInput({
                label: "Email",
                name: "email",
                validate: validateEmail,
              })}
              {renderButton("Send Login Link")}
            </form>
            <div className={classes.dividerGroup}>
              <div className={classes.divider}></div>
              <Typography
                variant="body1"
                style={{ marginBottom: 0 }}
                className={classes.legend}
              >
                OR
              </Typography>
              <div className={classes.divider}></div>
            </div>
            <Typography className={classes.text}>
              <Link to={TO_SIGNUP_PAGE} className={classes.link}>
                Create New Account
              </Link>
            </Typography>
          </div>
          <PasswordResetFooter />
        </div>
      </div>
    </Paper>
  );
};

export default PasswordResetPage;

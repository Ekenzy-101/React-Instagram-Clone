import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import PasswordResetFooter from "../../components/password-reset/footer";
import PasswordResetHeader from "../../components/password-reset/header";
import { TO_SIGNUP_PAGE } from "../../utils/constants/routes";
import { PASSWORD_LOCK_LOGO_URL } from "../../utils/constants/url";
import { useStyles } from "./styles";

const PasswordResetPage: React.FC = () => {
  const classes = useStyles();
  const { renderButton, renderInput } = useForm({});

  // Effect Hooks
  usePageTitle("Reset Password - Instagram");
  return (
    <Paper variant="outlined" square className={classes.root}>
      <PasswordResetHeader />
      <div>
        <div className={classes.wrapper}>
          <div className={classes.formWrapper}>
            <Avatar
              src={PASSWORD_LOCK_LOGO_URL}
              className={classes.icon}
              alt=""
              variant="square"
            />
            <Typography className={classes.text}>Trouble Logging in</Typography>
            <Typography className={classes.text} color="textSecondary">
              Enter your email and we'll send you a link to get back into your
              account
            </Typography>
            {renderInput("Email", "email")}
            {renderButton("Send Login Link")}
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

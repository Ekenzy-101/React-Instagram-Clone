import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";
import toast from "react-hot-toast";
import { useTitle } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import qs from "querystring";

import useForm from "../../common/hooks/useForm";
import CustomToast from "../../common/toast";
import PasswordConfirmHeader from "../../components/password-confirm/header";
import { DEFAULT_PROFILE_PIC_URL } from "../../utils/constants/url";
import { validatePassword } from "../../utils/helpers/validation";
import { resetPassword } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";
import { GET_AUTH_USER, GET_USER_BY_TOKEN } from "../../utils/queries/user";
import LoadingPage from "../../common/loading/page";
import { User } from "../../utils/types/user";
import { TO_HOME_PAGE } from "../../utils/constants/routes";

const PasswordConfirmPage: React.FC = () => {
  // Other Hooks
  const { search } = useLocation();
  const classes = useStyles();
  const client = useApolloClient();
  const history = useHistory();
  const result = qs.parse(search.replace("?", "")) as {
    token: string | undefined;
  };
  const { data, loading } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: result.token ? result.token : null },
  });
  const { renderButton, renderInput, formData, setFormState } = useForm({
    password: "",
    password_confirmation: "",
  });
  useTitle("Kenzygram");

  const user = data?.user as User | null;

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState("submitted");
    const { password, password_confirmation } = formData;
    try {
      const { data: userInfo } = (await resetPassword({
        password,
        password_confirmation,
        email: user?.email,
        token: result.token,
      })) as { data: User };

      const authUser = { ...userInfo, __typename: "User" };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });

      history.push(TO_HOME_PAGE);
    } catch (error) {
      setFormState("initial");
      debug.log(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        toast(<CustomToast message={error?.response?.data} />);
      } else {
        toast(
          <CustomToast message="An unexpected error occured. Please try again" />
        );
      }
    }
  };

  // JSX
  if (loading) return <LoadingPage spinner />;
  return (
    <Paper variant="outlined" square className={classes.root}>
      <PasswordConfirmHeader />
      {user ? (
        <div className={classes.wrapper}>
          <div className={classes.formWrapper}>
            <Avatar
              src={user?.image_url ? user?.image_url : DEFAULT_PROFILE_PIC_URL}
              className={classes.icon}
            />
            <Typography className={classes.text}>{user?.username}</Typography>
            <form onSubmit={handleSubmit}>
              {renderInput({
                label: "New Password",
                name: "password",
                type: "password",
                validate: validatePassword,
              })}
              {renderInput({
                label: "Confirm New Password",
                name: "password_confirmation",
                type: "password",
                validate: validatePassword,
              })}
              {renderButton("Change Password")}
            </form>
          </div>
        </div>
      ) : (
        <Typography className={classes.errorMessage}>
          The token is invalid or may have expired
        </Typography>
      )}
    </Paper>
  );
};

export default PasswordConfirmPage;

import { useApolloClient } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTitle } from "react-use";

import useForm from "../../common/hooks/useForm";
import LoadingPage from "../../common/loading/page";
import SignupFooter from "../../components/signup/footer";
import SignupHeader from "../../components/signup/header";
import SignupWrapper from "../../components/signup/wrapper";
import {
  TO_HOME_PAGE,
  TO_VERIFYEMAIL_PAGE,
} from "../../utils/constants/routes";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../../utils/helpers/validation";
import { GET_AUTH_USER } from "../../utils/queries/user";
import { loginWithFacebook, register } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";

const SignupPage: React.FC = () => {
  // State Hooks
  const [pageLoading, setPageLoading] = useState(false);

  // Other Hooks
  const client = useApolloClient();
  const history = useHistory();
  const { state } = useLocation();
  const classes = useStyles();
  const {
    renderInput,
    renderButton,
    renderErrorMessage,
    setErrorMessage,
    setFormState,
    formData,
  } = useForm({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  useTitle("Signup - Instagram");

  // Event Handlers
  const handleFacebookResponse = async (response: any) => {
    setPageLoading(true);
    debug.log(response);

    const email = response.email as string;
    const name = response.name as string;
    const image_url = response.picture.data.url as string;

    try {
      const { data } = await loginWithFacebook({ email, name, image_url });

      debug.log(data);

      const authUser = { __typename: "User", ...data };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });
      state ? history.push(state as string) : history.push(TO_HOME_PAGE);
    } catch (error) {
      debug.log(error?.response?.status, error?.response?.data);

      setPageLoading(false);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");

    const { email, password, username, name } = formData;
    try {
      const { data } = await register({ email, password, username, name });
      debug.log(data);

      history.push(TO_VERIFYEMAIL_PAGE, formData.email);
    } catch (error) {
      setFormState("initial");
      debug.log(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  // JSX
  if (pageLoading) return <LoadingPage />;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <SignupHeader />
      <SignupWrapper onFacebookResponse={handleFacebookResponse}>
        <form onSubmit={handleSubmit}>
          {renderInput({
            label: "Email",
            name: "email",
            validate: validateEmail,
          })}
          {renderInput({
            label: "Fullname",
            name: "name",
            validate: validateName,
          })}
          {renderInput({
            label: "Username",
            name: "username",
            validate: validateUsername,
          })}
          {renderInput({
            label: "Password",
            name: "password",
            validate: validatePassword,
            type: "password",
          })}
          {renderButton("Sign up")}
          <p></p>
          {renderErrorMessage()}
        </form>
      </SignupWrapper>
      <SignupFooter onFacebookResponse={handleFacebookResponse} />
    </Paper>
  );
};

export default SignupPage;

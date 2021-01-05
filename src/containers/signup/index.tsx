import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import LoadingPage from "../../common/loading/page";
import SignupFooter from "../../components/signup/footer";
import SignupHeader from "../../components/signup/header";
import SignupWrapper from "../../components/signup/wrapper";
import {
  TO_HOME_PAGE,
  TO_VERIFYEMAIL_PAGE,
} from "../../utils/constants/routes";
import { useUserContext } from "../../utils/context/user";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../../utils/helpers/validation";
import { loginWithFacebook, register } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";

const SignupPage: React.FC = () => {
  // Global State Hooks
  const { setUser } = useUserContext()!;

  // State Hooks
  const [pageLoading, setPageLoading] = useState(false);

  // Other Hooks
  const history = useHistory();
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

  // Effect Hooks
  usePageTitle("Signup - Instagram");

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

      setUser(data as User);
      history.push(TO_HOME_PAGE);
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
          {renderInput("Email", "email", validateEmail)}
          {renderInput("Full Name", "name", validateName)}
          {renderInput("User Name", "username", validateUsername)}
          {renderInput(
            "Password",
            "password",
            validatePassword,
            undefined,
            "password"
          )}
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

import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTitle } from "react-use";
import useFacebookLogin from "../../common/hooks/useFacebookLogin";

import useForm from "../../common/hooks/useForm";
import LoadingPage from "../../common/loading/page";
import SignupFooter from "../../components/signup/footer";
import SignupHeader from "../../components/signup/header";
import SignupWrapper from "../../components/signup/wrapper";
import { TO_VERIFYEMAIL_PAGE } from "../../utils/constants/routes";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../../utils/helpers/validation";
import { register } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";

const SignupPage: React.FC = () => {
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
  const { handleFacebookResponse, loading, errorMessage } = useFacebookLogin();
  useTitle("Signup - Instagram");

  useEffect(() => {
    setErrorMessage(errorMessage);
    // eslint-disable-next-line
  }, [errorMessage]);

  // Event Handlers
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
  if (loading) return <LoadingPage />;

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

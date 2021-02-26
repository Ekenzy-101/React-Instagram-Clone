import { useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../../utils/helpers/validation";
import { GET_AUTH_USER } from "../../utils/queries/user";
import { login } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import useForm from "../hooks/useForm";
import DesktopViewLoginModal from "./desktop-view";
import useFacebookLogin from "../hooks/useFacebookLogin";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    renderInput,
    renderButton,
    setFormState,
    setErrorMessage,
    renderErrorMessage,
    formData,
  } = useForm({ email: "", password: "" });
  const client = useApolloClient();
  const history = useHistory();
  const { pathname } = useLocation();
  const { handleFacebookResponse, errorMessage, loading } = useFacebookLogin(
    pathname
  );

  useEffect(() => {
    if (loading) {
      setFormState("submitted");
    } else {
      setFormState("error");
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    setErrorMessage(errorMessage);
    // eslint-disable-next-line
  }, [errorMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");
    const { email, password } = formData;

    try {
      const { data } = await login({ email, password });

      debug.log(data);

      const authUser = { __typename: "User", ...data };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });
      onClose();
      history.push(pathname);
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

  return (
    <>
      <DesktopViewLoginModal
        renderErrorMessage={renderErrorMessage}
        open={open}
        onClose={onClose}
        onFacebookResponse={handleFacebookResponse}
      >
        <form onSubmit={handleSubmit}>
          {renderInput({
            name: "email",
            label: "Email",
            validate: validateEmail,
          })}
          {renderInput({
            name: "password",
            type: "password",
            label: "Password",
            validate: validatePassword,
          })}
          {renderButton("Log In")}
        </form>
      </DesktopViewLoginModal>
    </>
  );
};

export default LoginModal;

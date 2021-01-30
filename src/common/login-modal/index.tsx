import { useApolloClient } from "@apollo/client";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../../utils/helpers/validation";
import { GET_AUTH_USER } from "../../utils/queries/user";
import { login, loginWithFacebook } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import useForm from "../hooks/useForm";
import DesktopViewLoginModal from "./desktop-view";

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

  const handleFacebookResponse = async (response: any) => {
    setFormState("submitted");
    debug.log(response);

    const email = response.email as string;
    const name = response.name as string;
    const image_url = response.picture.data.url as string;

    try {
      const { data } = await loginWithFacebook({ email, name, image_url });

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

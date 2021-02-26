import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory, useLocation } from "react-router-dom";

import { loginWithFacebook } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { GET_AUTH_USER } from "../../utils/queries/user";
import { TO_HOME_PAGE } from "../../utils/constants/routes";

const useFacebookLogin = (path?: string) => {
  // State Hooks
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Other Hooks
  const history = useHistory();
  const { state } = useLocation();
  const client = useApolloClient();

  // Event Handler
  const handleFacebookResponse = async (response: ReactFacebookLoginInfo) => {
    setLoading(true);
    debug.log(response);

    const dataArray = ["email", "name", "picture"];
    const isPresent = dataArray.every((key) =>
      Object.keys(response).includes(key)
    );

    if (isPresent) {
      try {
        const name = response.name!;
        const image_url = response.picture?.data.url!;
        const email = response.email!;
        const { data } = await loginWithFacebook({ email, name, image_url });

        debug.log(data);

        const authUser = { __typename: "User", ...data };
        client.writeQuery({
          query: GET_AUTH_USER,
          data: { profile: authUser },
        });

        path
          ? history.push(path)
          : state
          ? history.push(state as string)
          : history.push(TO_HOME_PAGE);
      } catch (error) {
        debug.log(error?.response?.status, error?.response?.data);

        setLoading(false);
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          setErrorMessage(error?.response?.data);
        } else {
          setErrorMessage("An unexpected error occured. Please try again");
        }
      }
    } else {
      setLoading(false);
      setErrorMessage("Couldn't sign in with facebook. Please try again");
    }
  };

  return {
    handleFacebookResponse,
    loading,
    errorMessage,
  };
};

export default useFacebookLogin;

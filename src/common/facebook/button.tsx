import React from "react";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

interface Props {
  onFacebookResponse: (response: any) => void;
  render: (renderProps: {
    onClick:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | undefined;
  }) => JSX.Element;
}

const FacebookButton: React.FC<Props> = ({ onFacebookResponse, render }) => {
  return (
    <ReactFacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={onFacebookResponse}
      render={render}
    />
  );
};

export default FacebookButton;

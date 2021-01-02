import { Paper } from "@material-ui/core";
import React from "react";

import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import SignupFooter from "../../components/signup/footer";
import SignupHeader from "../../components/signup/header";
import SignupWrapper from "../../components/signup/wrapper";
import { useStyles } from "./styles";

const SignupPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { renderInput, renderButton } = useForm({});

  // Effect Hooks
  usePageTitle("Signup - Instagram");

  // Event Handlers
  const handleFacebookResponse = (response: any) => {
    console.log(response);
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <SignupHeader />
      <SignupWrapper onFacebookResponse={handleFacebookResponse}>
        <form>
          {renderInput("name", "email")}
          {renderInput("name", "password")}
          {renderButton("Sign up")}
        </form>
      </SignupWrapper>
      <SignupFooter onFacebookResponse={handleFacebookResponse} />
    </Paper>
  );
};

export default SignupPage;

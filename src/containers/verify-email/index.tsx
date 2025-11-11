import { useApolloClient, useMutation } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTitle } from "react-use";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";

import useForm from "../../common/hooks/useForm";
import VerifyEmailHeader from "../../components/verify-email/header";
import VerifyEmailWrapper from "../../components/verify-email/wrapper";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { RESEND_VERIFICATION_CODE } from "../../utils/mutations/user";
import { validateCode } from "../../utils/helpers/validation";
import { verifyEmail } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";
import { GET_AUTH_USER } from "../../utils/queries/user";
import CustomToast from "../../common/toast";

const VerifyEmailPage: React.FC = () => {
  // Other Hooks
  const [resendCode] = useMutation(RESEND_VERIFICATION_CODE);
  const client = useApolloClient();
  const classes = useStyles();
  const { state } = useLocation();
  const history = useHistory();
  const {
    renderInput,
    renderButton,
    renderErrorMessage,
    setFormState,
    setErrorMessage,
    formData,
  } = useForm({ code: "" });

  // Effect Hooks
  useTitle("Verify Email - Kenzygram");

  useEffect(() => {
    if (!state) {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Event Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");

    try {
      const { data } = await verifyEmail({
        code: parseInt(formData.code as string),
        email: state as string,
      });
      debug.log(data);

      const authUser = { __typename: "User", ...data };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });
      history.push(TO_HOME_PAGE);
    } catch (error) {
      debug.error(error?.response?.status, error?.response?.data);

      setFormState("initial");
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const { data } = await resendCode({
        variables: { email: state },
      });
      debug.log(data);
      toast(
        <CustomToast
          message={`We have sent a confirmation code to your email ${state}`}
        />
      );
    } catch (error) {
      debug.error(error?.message);

      toast(<CustomToast message={error?.messaage} />);
    }
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <VerifyEmailHeader />
      <div className={classes.wrapper}>
        <VerifyEmailWrapper onClick={handleClick} email={state as string}>
          <form onSubmit={handleSubmit}>
            {renderInput({
              label: "Confirmation Code",
              name: "code",
              validate: validateCode,
            })}
            {renderButton("Next")}
            {renderErrorMessage()}
          </form>
        </VerifyEmailWrapper>
      </div>
    </Paper>
  );
};

export default VerifyEmailPage;

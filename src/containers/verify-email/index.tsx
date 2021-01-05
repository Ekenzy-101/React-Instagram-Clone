import { useMutation } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import VerifyEmailHeader from "../../components/verify-email/header";
import VerifyEmailWrapper from "../../components/verify-email/wrapper";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { useUserContext } from "../../utils/context/user";
import { RESEND_VERIFICATION_CODE } from "../../utils/mutations/user";
import { validateCode } from "../../utils/helpers/validation";
import { verifyEmail } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";
import toast from "react-hot-toast";

const VerifyEmailPage: React.FC = () => {
  // Global State Hooks
  const { setUser } = useUserContext()!;

  // Other Hooks
  const [resendCode] = useMutation(RESEND_VERIFICATION_CODE);
  const classes = useStyles();
  const { state } = useLocation();
  const history = useHistory();
  const {
    renderInput,
    renderButton,
    renderErrorMessage,
    setFormState,
    formData,
  } = useForm({ code: "" });

  // Effect Hooks
  usePageTitle("Verify Email - Instagram");

  useEffect(() => {
    if (!state) {
      history.goBack();
    }
  }, [state]);

  // Event Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");

    // const email = state as string;

    try {
      const { data } = await verifyEmail({
        code: parseInt(formData.code as string),
        email: state as string,
      });
      debug.log(data);

      setUser(data as User);
      history.push(TO_HOME_PAGE);
    } catch (error) {
      debug.error(error?.response?.status, error?.response?.data);

      setFormState("initial");
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        toast(error?.response?.data);
      } else {
        toast("An unexpected error occured. Please try again");
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

      toast(`We have sent a confirmation code to your email ${state}`);
    } catch (error) {
      debug.error(error?.message);

      toast(error?.message);
    }
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <VerifyEmailHeader />
      <div className={classes.wrapper}>
        <VerifyEmailWrapper onClick={handleClick} email={state as string}>
          <form onSubmit={handleSubmit}>
            {renderInput("Confirmation Code", "code", validateCode)}
            {renderButton("Next")}
            {renderErrorMessage()}
          </form>
        </VerifyEmailWrapper>
      </div>
    </Paper>
  );
};

export default VerifyEmailPage;

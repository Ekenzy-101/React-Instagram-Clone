import { Button } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  onClick?: () => void;
  btnText?: string;
  message?: string;
}

const CustomToast: React.FC<Props> = (props) => {
  const { onClick, btnText, message } = props;

  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <span className={classes.root}>
      {message}
      {btnText ? (
        <Button onClick={onClick} className={classes.retryBtn}>
          {btnText}
        </Button>
      ) : null}
    </span>
  );
};

CustomToast.defaultProps = {
  message: "An unexpected error occured",
};

export default CustomToast;

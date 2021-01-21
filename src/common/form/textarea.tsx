import { Grid } from "@material-ui/core";
import React from "react";
import { inputName, inputValue } from "../../utils/types/form";
import { useStyles } from "../styles/form";

interface Props {
  placeholder?: string;
  variant?: "align-center" | "floating" | "justify-center";
  value: inputValue;
  name: inputName;
  label?: string;
  error: inputValue;
  showError?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormTextArea: React.FC<Props> = (props) => {
  const { value, name, label, placeholder, variant, onChange } = props;
  const classes = useStyles();

  if (variant === "justify-center")
    return (
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={4}>
          <label className={classes.label} htmlFor={name}>
            {label}
          </label>
        </Grid>
        <Grid item xs={8}>
          <textarea
            id={name}
            name={name}
            value={value}
            className={classes.textarea}
            onChange={onChange}
            placeholder={placeholder}
          ></textarea>
        </Grid>
      </Grid>
    );

  if (variant === "align-center")
    return (
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <label className={classes.label} htmlFor={name}>
            {label}
          </label>
          <textarea
            id={name}
            name={name}
            value={value}
            className={classes.textarea}
            onChange={onChange}
            placeholder={placeholder}
          ></textarea>
        </Grid>
      </Grid>
    );
  return null;
};

export default FormTextArea;

import { Grid, InputBase } from "@material-ui/core";
import React from "react";
import { inputName, inputValue } from "../../utils/types/form";
import { useStyles } from "../styles/form";

interface Props {
  placeholder?: string;
  variant?: "align-center" | "floating" | "justify-center";
  value: inputValue;
  name: inputName;
  label: string;
  type?: string;
  error: inputValue;
  showError?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormInput: React.FC<Props> = (props) => {
  const {
    name,
    variant,
    type,
    label,
    placeholder,
    value,
    error,
    showError,
    onChange,
  } = props;
  const classes = useStyles();
  if (variant === "justify-center") {
    return (
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={4}>
          <label className={classes.label} htmlFor={name}>
            {label}
          </label>
        </Grid>
        <Grid item xs={8}>
          <InputBase
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classes.input}
          />
        </Grid>
      </Grid>
    );
  }

  if (variant === "align-center") {
    return (
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <label className={classes.label} htmlFor={name}>
            {label}
          </label>
          <InputBase
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classes.input}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className={value ? "form-group-label" : ""}>{label}</label>
      {showError && error ? (
        <small className="form-group-error">{error}</small>
      ) : null}
    </div>
  );
};

export default FormInput;

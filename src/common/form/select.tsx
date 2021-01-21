import { FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { inputName, inputValue } from "../../utils/types/form";
import { useStyles } from "../styles/form";

interface Props {
  label?: string;
  options: { label: string; value: string }[];
  variant?: "align-center" | "floating" | "justify-center";
  name: inputName;
  value: inputValue;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error: inputValue;
  showError?: boolean;
}

const FormSelect: React.FC<Props> = (props) => {
  const { onChange, label, name, value, variant, placeholder, options } = props;
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
          <FormControl style={{ padding: "0" }} className={classes.input}>
            <Select
              labelId={label}
              id={name}
              placeholder={placeholder}
              name={name}
              value={value}
              className={classes.select}
              onChange={(e) =>
                onChange(e as React.ChangeEvent<HTMLInputElement>)
              }
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl style={{ padding: "0" }} className={classes.input}>
            <Select
              labelId={label}
              id={name}
              placeholder={placeholder}
              name={name}
              value={value}
              className={classes.select}
              onChange={(e) =>
                onChange(e as React.ChangeEvent<HTMLInputElement>)
              }
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );

  return null;
};

export default FormSelect;

import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  inputName,
  initialValues,
  validateFunction,
  formState,
} from "../../utils/types/form";
import LoadingSpinner from "../loading/spinner";

const useForm = (initialValues: initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formState, setFormState] = useState<formState>("initial");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Object.keys(formErrors).length) {
      setFormState("error");
    } else {
      setFormState("noerror");
    }
  }, [formErrors]);

  const isDisabled = () => {
    if (formState === "submitted" || formState === "error") return true;
    return false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    validate?: validateFunction
  ) => {
    const errors = { ...formErrors };
    const data = { ...formData };
    const { name, value, valueAsNumber } = e.target;
    const inputName = name as inputName;

    if (validate) {
      if (typeof data[inputName] === "number") {
        data[inputName] = valueAsNumber;
      } else {
        data[inputName] = value;
      }
      const error = validate(data[inputName]);
      if (error) errors[inputName] = error;
      else {
        delete errors[inputName];
      }
    } else {
      if (typeof data[inputName] === "number") {
        data[inputName] = valueAsNumber;
      } else {
        data[inputName] = value;
      }
    }

    setFormData(data);
    setFormErrors(errors);
  };

  const renderButton = (label: string) => {
    return (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disableElevation
        fullWidth
        disabled={isDisabled()}
        className="submit-button"
        style={{ textTransform: "none" }}
      >
        {formState === "submitted" ? <LoadingSpinner /> : label}
      </Button>
    );
  };

  const renderInput = (
    label: string,
    name: inputName,
    validate?: validateFunction,
    placeholder?: string,
    type?: string,
    error?: boolean
  ) => {
    return (
      <div className="form-group">
        <input
          type={type}
          name={name}
          value={formData[name]}
          placeholder={placeholder}
          onChange={(e) => handleChange(e, validate)}
        />
        <label className={formData[name] ? "form-group-label" : ""}>
          {label}
        </label>
        {formErrors[name] && error ? (
          <small className="form-group-error">{formErrors[name]}</small>
        ) : null}
      </div>
    );
  };

  const renderErrorMessage = () =>
    errorMessage && <small className="form-error">{errorMessage}</small>;

  return {
    renderButton,
    renderInput,
    renderErrorMessage,
    setErrorMessage,
    setFormState,
    formData,
  };
};

export default useForm;

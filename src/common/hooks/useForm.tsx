import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  inputName,
  initialValues,
  validateFunction,
  formState,
  inputOptions,
  selectOptions,
  textAreaOptions,
} from "../../utils/types/form";
import LoadingSpinner from "../loading/spinner";
import FormInput from "../form/input";
import FormSelect from "../form/select";
import FormTextArea from "../form/textarea";

const useForm = (
  initialValues: initialValues,
  initialErrors?: initialValues
) => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(
    initialErrors ? initialErrors : initialValues
  );
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    validate?: validateFunction
  ) => {
    const errors = { ...formErrors };
    const data = { ...formData };
    const { name, value } = e.target;
    const inputName = name as inputName;

    if (validate) {
      data[inputName] = value;
      const error = validate(data[inputName]);
      if (error) errors[inputName] = error;
      else {
        delete errors[inputName];
      }
    } else {
      data[inputName] = value;
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

  const renderInput = (options: inputOptions) => {
    const { name, validate, ...rest } = options;

    return (
      <FormInput
        {...rest}
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(e, validate)}
        error={formErrors[name]}
      />
    );
  };

  const renderSelect = (options: selectOptions) => {
    const { name, validate, ...rest } = options;

    return (
      <FormSelect
        {...rest}
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(e, validate)}
        error={formErrors[name]}
      />
    );
  };

  const renderTextArea = (options: textAreaOptions) => {
    const { name, validate, ...rest } = options;

    return (
      <FormTextArea
        {...rest}
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(e, validate)}
        error={formErrors[name]}
      />
    );
  };

  const renderErrorMessage = () =>
    errorMessage && <small className="form-error">{errorMessage}</small>;

  return {
    renderButton,
    renderInput,
    renderSelect,
    renderTextArea,
    renderErrorMessage,
    setErrorMessage,
    setFormState,
    setFormData,
    formData,
  };
};

export default useForm;

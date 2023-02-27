import React, { useState } from "react";
import { useNavigate } from "react-router";

import AuthService from "../../api/AuthService";
import { FORMS } from "../../constants/forms";
import { ROUTES } from "../../constants/routes";
import { HelperFunctions } from "../../util/helperFunctions";
import Button from "../helper/Button";

const RegisterForm = () => {
  const registerForm = FORMS.registerForm;
  const [registerData, setRegisterData] = useState({
    userName: "",
    firstname: "",
    lastName: "",
    password: "",
    email: "",
    sectorId: "",
    companyId: "",
    role: "",
    superiorId: "",
    workVisible: "",
    authority: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    messages: [],
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const checkForEmptyFields = () => {
    if (!HelperFunctions.checkForEmptyFields(registerData)) {
      setErrors({ title: "Fields can't be empty", messages: [] });
      return true;
    } else return false;
  };

  const checkEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
      setErrors({
        title: "Invalid Email",
        messages: ["Email should be a valid address"],
      });
      return false;
    } else return true;
  };

  const checkPassword = () => {
    const passwordValidator = HelperFunctions.checkPasswordRequirements(
      registerData.password
    );

    if (!passwordValidator.isValid) {
      setErrors({
        title: "Password does not meet the requirements",
        messages: passwordValidator.messages,
      });
    }

    return passwordValidator.isValid;
  };

  const checkPasswordsAreMatching = () => {
    if (registerData.password !== registerData.confirmPassword) {
      setErrors({ title: "Passwords do not match", messages: [] });
      return false;
    } else return true;
  };

  const handleRegister = async () => {
    let isValidRegister =
      !checkForEmptyFields() &&
      checkEmail() &&
      checkPassword() &&
      checkPasswordsAreMatching();

    if (isValidRegister) {
      setErrors({
        title: "",
        messages: [],
      });
      setIsLoading(true);

      await AuthService.register(registerData)
        .then(() => setIsRegistered(true))
        .catch((error) =>
          setErrors({
            title: error.message,
            messages: [],
          })
        )
        .finally(() => setIsLoading(false));
    }
  };

  return !isRegistered ? (
    <>
      <form action={registerForm.action} className="form">
        <h1 className="form__title">{registerForm.formTitle}</h1>
        {registerForm.formGroups.map((group) => (
          <div key={group.id} className="form__group">
            {group.icon}
            <input
              id={group.id}
              type={group.type}
              className="input"
              placeholder={group.placeholder}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [`${group.id}`]: e.currentTarget.value,
                })
              }
            />
          </div>
        ))}

        <div className="form__actions">
          <Button
            onButtonClick={() => handleRegister()}
            text="Register"
            loading={isLoading}
          />
        </div>

        <p className="link" onClick={() => navigate(ROUTES.LOGIN)}>
          Already have an account? Click here to log in
        </p>

        {errors.title && (
          <>
            <p className="error">{errors.title}</p>
            {errors.messages.length > 0 &&
              errors.messages.map((m) => (
                <p key={m} className="error__message">
                  {m}
                </p>
              ))}
          </>
        )}
      </form>
    </>
  ) : (
    <>
      <h1 className="container__title">You have been registered!</h1>
      <Button text={"Log In"} onButtonClick={() => navigate(ROUTES.LOGIN)} />
    </>
  );
};

export default RegisterForm;

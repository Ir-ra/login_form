import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>("");
  const [passwordError, setPasswordError] = useState<string | undefined>("");
  const [validEmail, setValidEmail] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailFocused(false);
    const email = e.target.value;
    const isValid = Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .isValidSync(email);
    setValidEmail(isValid);
  };

  const login = async (values: { email: string; password: string; }) => {
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please check your credentials.');
      setPasswordError('Incorrect email or password');
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/\d/, 'Password must contain at least 1 number')
                .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\//-]/, 'Password must contain at least 1 symbol')
                .required('Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setIsLoading(true);
              login(values);
              setTimeout(() => {
                console.log('values', values);
                setIsLoading(false);
                setSubmitting(false);
              }, 100);
            }}
          >
            {({ errors, handleSubmit, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit} className="form">
                  <div className="form__inputs-container">
                    <div className="form__input">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="username"
                        placeholder="Email"
                        onFocus={() => setEmailFocused(true)}
                        onBlur={handleEmailBlur}
                        className={emailFocused ? 'form__input-field focused' : 'form__input-field'}
                        error={errors.email || loginError}
                      />
                      <ErrorMessage name="email" component="div" className="form__input--error-message" />
                    </div>
                    {validEmail && (
                      <>
                        <div className="form__input">
                          <div className="form__password-container">
                            <Field
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              autoComplete="current-password"
                              placeholder="Password"
                              onFocus={() => setPasswordFocused(true)}
                              onBlur={() => setPasswordFocused(false)}
                              className={passwordFocused ? 'form__input-field focused' : 'form__input-field'}
                            />
                            <button
                              type="button"
                              onClick={handlePasswordVisibility}
                              className={errors.password || passwordError ? 'form__password-container--btn error' : 'form__password-container--btn'}
                            >
                              {showPassword ? (
                                <MdOutlineVisibility style={{ width: "20px", height: "20px" }} />
                              ) : (
                                <AiOutlineEyeInvisible style={{ width: "20px", height: "20px" }} />
                              )}
                            </button>
                          </div>
                          <ErrorMessage name="password" component="div" className="form__input--error-message" />
                        </div>
                      </>
                    )}
                  </div>
                  <NavLink to="/forgot-password" className="form__forgot-link">
                    Forgot your password?
                  </NavLink>

                  <Button
                    title="Log in to Qencode"
                    disabled={isSubmitting}
                    type="submit"
                  />

                  <div>
                    <p className="form__info">
                      Is your company new to Qencode?
                      <NavLink to='#' className="form__info--link">
                        <span> Sign up</span>
                      </NavLink>
                    </p>
                  </div>
                </Form>
              )
            }}
          </Formik>


        </>
      )}
    </>
  )
}

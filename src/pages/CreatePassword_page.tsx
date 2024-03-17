import { ErrorMessage, Field, Form, Formik } from "formik";
import Title from "../components/Title/Title";
import * as Yup from 'yup';
import { NavLink } from "react-router-dom";
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import Button from "../components/Button/Button";

export default function CreatePassword_page() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>("");

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <main>
      <Title title="Create new Password?" />

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
          // login(values);
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

                  <div className="form__createPass">
                    <label htmlFor="password" className="form__label">Password</label>
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
                  </div>

                  <div className="form__createPass">
                    <label htmlFor="confirmPassword" className="form__label">Confirm Password</label>
                    <div className="form__password-container">
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="confirmPassword"
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
                  </div>
                  <ErrorMessage name="password" component="div" className="form__input--error-message" />
                </div>
              </div>

              <div className="button__wraper">
                <Button
                  title="Reset Password"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>

            </Form>
          )
        }}
      </Formik>
    </main>
  )
}

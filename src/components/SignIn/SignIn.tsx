import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink } from "react-router-dom";

import Button from "../Button/Button";
import { useApiClient } from "../../api/apiClient";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useApiClient();

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
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
            .required('Password is required')
        })}

        onSubmit={(values, { setSubmitting, setFieldError }) => {
          login(values)
            .then((data) => {
              if (data.error) {
                setFieldError('password', data.detail);
              }
            },
              (error) => {
                throw error
              })
            .finally(() => {
              setSubmitting(false);
            })

        }}

        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ errors, handleSubmit, isSubmitting, touched }) => {
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
                    className='form__input-field'
                    aria-label="email"
                  />

                  <ErrorMessage name="email" component="div" className="form__input--error-message" />
                </div>

                {!errors.email && touched.email && (
                  <div className="form__input">
                    <div className="form__password-container">
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        className='form__input-field'
                        aria-label="password"
                      />

                      <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        className={errors.password ? 'form__password-container--btn error' : 'form__password-container--btn'}
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
                )}
              </div>

              {!errors.email && touched.email && (
                <NavLink to="/forgot-password" className="form__forgot-link">
                  Forgot your password?
                </NavLink>
              )}

              <div className="button__wraper">
                <Button
                  title="Log in to Qencode"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>

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
  )
}

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Button from "../Button/Button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApiClient } from "../../api/apiClient";

export default function ForgotPassword() {
  const [emailFocused, setEmailFocused] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useApiClient()

  return (
    <div className="forgot">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .min(15, 'Email must be at least 15 characters long')
            .matches(/^[^@]+@[^@]+\.[^@]+$/, 'Email address must contain a period after the @ sign')
            .required('Email is required'),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          resetPassword(values.email)
            .then((res) => {
              if (res.error) {
                setFieldError('email', res.error);
              } else {
                navigate('/create-password');
              }
            })
            .finally(() => {
              setSubmitting(false);
            })
        }}

        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ handleSubmit, isSubmitting }) => {
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
                    className={emailFocused ? 'form__input-field focused' : 'form__input-field'}
                    aria-label="email"
                  />
                  <ErrorMessage name="email" component="div" className="form__input--error-message" />
                </div>
              </div>

              <div className="button__wraper--forgot">
                <div className='button__wraper button__wraper--link'>
                  <Button title="Send" type="submit" disabled={isSubmitting} />
                </div>

                <NavLink to='/login' className='button__wraper button__wraper--link'>
                  <Button title="Cancel" type="reset" style="outline" />
                </NavLink>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

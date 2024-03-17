import { ErrorMessage, Field, Form, Formik } from "formik";
import Title from "../Title/Title";
import * as Yup from 'yup';
import Button from "../Button/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>("");
  const [validEmail, setValidEmail] = useState(false);

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailFocused(false);
    const email = e.target.value;
    const isValid = Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .isValidSync(email);
    setValidEmail(isValid);
  };

  return (
    <div className="forgot">
      <Title title="Forgot Password?" />

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
              </div>

              <div className="button__wraper--forgot">
                <NavLink to='/create-password' className='button__wraper button__wraper--link'>
                  <Button title="Send" type="submit" />
                </NavLink>

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

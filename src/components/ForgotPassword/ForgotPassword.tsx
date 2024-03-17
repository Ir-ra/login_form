import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Button from "../Button/Button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailFocused(false);
    const email = e.target.value;
    const isValid = Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .isValidSync(email);
    setValidEmail(isValid);
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log('data from forgot', data);
      
      // Assuming the response contains a link for setting a new password
      // Redirect to the page for setting a new password
      navigate('/create-password'); // Використовуємо navigate замість history.push
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="forgot">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);

          handleForgotPassword(values.email);

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
                    error={errors.email}
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

import * as Yup from 'yup';
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from '../Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

export default function CreatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const setNewPassword = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/password-set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });
      const data = await response.json();
      console.log('API response:', data);
      // Handle response and any further actions
      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('API error:', error);
      // Handle error appropriately
    }
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{
           password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
            .matches(/\d/, 'Password must contain at least 1 number')
            .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\//-]/, 'Password must contain at least 1 symbol')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}

        onSubmit={(values, { setSubmitting }) => {
          console.log('values from create', values);
          setNewPassword(values);
          setSubmitting(false);
        }}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="form">
            <div className="form__inputs-container">
              <div className="form__input">
                <div className="form__createPass">
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                  <div className="form__password-container">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={passwordFocused ? 'form__input-field focused' : 'form__input-field'}
                    />
                    <button
                      type="button"
                      onClick={handlePasswordVisibility}
                      className="form__password-container--btn"
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

                <div className="form__createPass">
                  <label htmlFor="confirmPassword" className="form__label">
                    Confirm Password
                  </label>
                  <div className="form__password-container">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={passwordFocused ? 'form__input-field focused' : 'form__input-field'}
                    />
                    <button
                      type="button"
                      onClick={handlePasswordVisibility}
                      className="form__password-container--btn"
                    >
                      {showPassword ? (
                        <MdOutlineVisibility style={{ width: "20px", height: "20px" }} />
                      ) : (
                        <AiOutlineEyeInvisible style={{ width: "20px", height: "20px" }} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="form__input--error-message" />
                </div>
              </div>
            </div>
            <div className="button__wraper">
              <Button
                title={isLoading ? "Loading..." : "Reset Password"}
                disabled={isSubmitting || isLoading}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
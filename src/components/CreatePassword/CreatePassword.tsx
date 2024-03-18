import * as Yup from 'yup';
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from '../Button/Button';
import { useState } from 'react';
import { useApiClient } from '../../api/apiClient';

export default function CreatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const { setNewPassword } = useApiClient();

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
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
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
        })}

        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setNewPassword(values)
            .then((res) => {
              if (res.error) {
                setFieldError('password', res.error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            })

        }}

        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ handleSubmit, isSubmitting }) => (
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
                      className='form__input-field'
                    />
                    <button
                      type="button"
                      onClick={handlePasswordVisibility}
                      className="form__password-container--btn"
                    >
                      {showPassword ? (
                        <MdOutlineVisibility
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ width: "20px", height: "20px" }}
                        />
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
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      className='form__input-field'
                    />
                    <button
                      type="button"
                      onClick={handleConfirmPasswordVisibility}
                      className="form__password-container--btn"
                    >
                      {showConfirmPassword ? (
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
                title="Reset Password"
                disabled={isSubmitting}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
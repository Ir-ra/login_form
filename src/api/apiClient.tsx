import { useCookies } from 'react-cookie'

export const useApiClient = () => {
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

  const setTokens = (data: {
    access_token: string,
    refresh_token: string,
    token_expire: number,
    refresh_token_expire: number
  }) => {
    const tokenExpire = new Date();
    const refreshTokenExpire = new Date();
    tokenExpire.setTime(tokenExpire.getTime() + (data.token_expire * 1000))
    refreshTokenExpire.setTime(refreshTokenExpire.getTime() + (data.refresh_token_expire * 1000))
    setCookie('access_token', data.access_token, { path: '/', expires: tokenExpire })
    setCookie('refresh_token', data.refresh_token, { path: '/', expires: refreshTokenExpire })
  }

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
      if (!data.error) {
        setTokens(data);
      }
      return { error: JSON.stringify(data.detail) };
    } catch (error) {
      console.error('Login failed:', error);
      return { error: JSON.stringify(error) };
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh_token: cookies.refresh_token,
        })
      });
      const data = await response.json();
      setTokens(data);

    } catch (error) {
      console.error('Token failed:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
        })
      });
      const data = await response.json();
      return { error: JSON.stringify(data.detail) };
    } catch (error) {
      console.error('Password can not be reset:', error);
      return { error: JSON.stringify(error) };
    }
  };

  const setNewPassword = async (values: { password: string; confirmPassword: string; }) => {
    try {
      const response = await fetch('https://auth-qa.qencode.com/v1/auth/password-set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: cookies.access_token,
          secret: 'CSRFsecret',
          password: values.password,
          password_confirm: values.confirmPassword
        })
      });
      const data = await response.json();
      return { error: JSON.stringify(data.detail) };
    } catch (error) {
      console.error('New password can not be set:', error);
      return { error: JSON.stringify(error) };
    }
  };

  return { login, resetPassword, refreshToken, setNewPassword }
}

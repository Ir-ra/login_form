export const login = async (values: { email: string; password: string; }) => {
  try {
    console.log('values', values)
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
    console.log('data', data)

    return data;
  } catch (error) {
    console.error('Login failed:', error);
  }
};
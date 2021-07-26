import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required')
        .test('isUnique', 'Username is already taken', (value)=> isUnique('username', value)),
    password: yup.string()
        .min(6, 'Password is too short')
        .max(20, 'Password is too long')
        .required('Password is required'),
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required')
        .test('isUnique', 'Email is already in use', (value)=> isUnique('email', value)),
   agreeToTerms: yup.mixed().oneOf([true], 'You must agree to terms')
  });

  const memo = {
    email: {},
    username: {}
      
  }

  function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    fetch(`http://localhost:4000/user/check?${field}=${value}`)
        .then(res => res.json())
        .then(res => {
            memo[field][value] = !res;
            return memo[field][value];
        })

  }
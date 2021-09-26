import * as yup from 'yup';
import environment from '../environments/index';

export const userEditSchema = yup.object().shape({
    image: yup.mixed(),
    username: yup.string()
        .min(3, 'Username is too short')
        .max(20, 'Username is too long')
        .test('isUnique', 'Username is already taken', (value)=> isUnique('username', value)),
    
    email: yup.string()
        .email('Email is invalid')
        .test('isUnique', 'Email is already in use', (value)=> isUnique('email', value))
  });

  const memo = {
    email: {},
    username: {}
      
  }

  function isUnique(field, value) {
    if (memo[field].hasOwnProperty(value)) {
        return memo[field][value];
    }
    fetch(environment.apiUrl+`/user/edit/check?${field}=${value}`)
        .then(res => res.json())
        .then(res => {
            memo[field][value] = !res;
            return memo[field][value];
        })

  }

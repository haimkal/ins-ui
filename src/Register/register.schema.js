import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3)
        .max(20)
        .required(),
    password: yup.string()
        .min(6)
        .max(20)
        .required(),
    email: yup.string()
        .max(100)
        .email()
        .required(),
   agreeToTerms: yup.mixed().oneOf([true], 'You must agree to terms')
  });
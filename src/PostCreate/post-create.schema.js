import * as yup from 'yup';

export const PostCreateSchema = yup.object().shape({
    image: yup.mixed()
        .required('Image is required'),
    description: yup.string()
        .max(2000, 'Description is too long'),
    whereItIsNow: yup.string()
        .required('You have to fill up where the dress is')    
})
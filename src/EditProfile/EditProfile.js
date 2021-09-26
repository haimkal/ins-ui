import React, { useState, useContext, useMemo } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { userEditSchema } from './EditProfile.schema';
import { UserContext } from '../user-context';
import './EditProfile.scss'
import { UserService } from '../services/user.service';
import { useHistory } from 'react-router';

export default function EditProfile() {

    const history = useHistory()
    const [imgPreview, setImgPreview] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [editedImage, setEdited] = useState('')
    
     
    function previewFile(file) {
        if(!file) return;
        setImgPreview(URL.createObjectURL(file));
    }

    async function submit(values) {
        if (values.username === '') {
            values.username = user.username;
        }
        if (values.email === '') {
            values.email = user.email;
        }
        if (editedImage) {
            const image = await fetch(editedImage)
            const newImage = await image.blob()
            values.image = newImage;
        }
        
        try {
            const newUser = await UserService.editUser(values, user._id)
            console.log(newUser);
            setUser(newUser)
            history.push(`/profile/${user.username}`)
        } catch (err) {
            console.log(err);
        }
       
    }
    


    return (
        <div className="d-flex row">
                <div className="col-lg-6 order-sm-0 order-lg-1 my-3">
                    <h2 className="EditProfile__title mx-4">Edit Profile</h2>
                    <Formik
                        initialValues= {{username: '', email: '', image: '' }}
                        validationSchema = {userEditSchema}
                        onSubmit = {submit}>
                        {({ setFieldValue, isSubmitting })=> (
                            <Form className="EditProfile__form mt-5 mx-4 col-lg-10 px-0" noValidate>
                                <div className="form-group my-3">
                                    <input type="file"
                                            id="image" 
                                            name="image" 
                                            className="form-control"
                                            onChange={(e)=> { 
                                                setFieldValue('image', e.target.files[0]);
                                                previewFile(e.target.files[0]);
                                                
                                            }}   
                                    />
                                    <ErrorMessage component="small" name="image" className="EditProfile__form__error" />
                                </div>
                                <div className="form-group my-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <Field as="input" className="form-control" name="username" id="username" />
                                    <ErrorMessage component="small" name="username" className="EditProfile__form__error" />
                                </div>
                                <div className="form-group my-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <Field as="input" className="form-control" name="email" id="email" placeholder={user.email} />
                                    <ErrorMessage component="small" name="email" className="EditProfile__form__error" />
                                </div>
                                <div className="from-group text-right my-3">
                                    <button type="submit" 
                                            className="mt-3 EditProfile__submit-btn" 
                                            disabled = {isSubmitting}>
                                            { isSubmitting ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
            </div>
            <div className="previewContainer col-lg-6 order-sm-0 order-lg-1 my-0 ">
                <img src={imgPreview} className="img-area"    />    
            </div>
        </div>
    )
}

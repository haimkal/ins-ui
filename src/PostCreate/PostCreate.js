import { Formik, Form, Field, ErrorMessage } from 'formik';

import {useHistory} from 'react-router-dom';
import React, { useState } from 'react'


import { UserService } from '../services/user.service';

export default function PostCreate() {
   
    const history = useHistory();

    const [imgPreview, setImagePreview] = useState('');
    
    function filePreview(file) {
        if(!file){
            return;
        }
        setImagePreview(URL.createObjectURL(file));
    }

    async function submit(values) {
        const data = new FormData();
        data.append('image', values.image);
        data.append('description', values.description);
        
        try {
            await fetch('http://localhost:3000/post', {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: UserService.getToken()
                }
            });
            history.push('/');
        } catch(err) {
            console.log(err);
        }
       
    }
    return (
             <div className="d-flex row">
                    <div className="col-lg-6 order-sm-0 order-lg-1 my-3">
                        <h2 className="PostCreate__title">Create Post</h2>
                        <img src={imgPreview} alt="" />
                        <Formik
                            initialValues={{ image: '', description: ''}}
                            
                            onSubmit={submit}>
                            {({setFieldValue, isSubmitting})=> (
                                <Form className="PostCreate__form mt-5 col-lg-8 px-0" noValidate>
                                    <div className="form-group my-3">  
                                        <input type="file" 
                                                id="image" 
                                                name="image" 
                                                className="form-control"
                                                onChange={(e) =>{
                                                 filePreview(e.target.files[0]);   
                                                 setFieldValue('image', e.target.files[0])
                                                }}
                                               
                                        />
                                    <ErrorMessage component="small" name="image" className="PostCreate__form__error" />
                                </div>    
                            
                                <div className="form-group my-3">
                                    <label className="form-label" htmlFor="description">Description</label>    
                                    <Field as="textarea"   className="form-control" name="description" id="description" />
                                    <ErrorMessage component="small" name="description" className="PostCreate__form__error" />
                                </div>
    
    
                                <div className="form-group text-right my-3">
                                    <button type="submit" 
                                        className="mt-3 PostCreate__submit-btn"
                                        disabled = {isSubmitting}>
                                        {isSubmitting ? 'Posting...' : 'Post'}
                                    </button>
                                </div>
    
                            </Form>
                            )}    
                    </Formik>
            
                    </div>
                </div>
                );
            }

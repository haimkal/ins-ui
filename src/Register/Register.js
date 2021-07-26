import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useHistory} from 'react-router-dom';
import './Register.scss';
import { registerSchema } from './register.schema';

export default function Register(props) {

    const history = useHistory();

    async function submit(values) {
        try {
            const res = await fetch('http://localhost:4000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
                if(res.status === 201){
                    history.push('/login');
                    return;
                }
        }
        catch(err) {
            console.log('failure!');
        };
    };
        
    return (
        <div className="Register d-flex justify-content-center">
            <div className="col col-lg-4  my-5">
                    <div className="text-center">
                        <h2 className="Register__title">Register</h2>
                        <h3 className="Register__subtitle">We're happy you're here! </h3>
                    </div>
                    <Formik initialValues={{ username: '', email: '', password: '', agreeToTerms: false }}
                            validationSchema={registerSchema}
                            onSubmit={submit}>
                        <Form className="Register__form mt-5 px-0">
                            <div className="form-group my-3">
                                    <label htmlFor="username">Username</label> 
                                    <Field id="username" className="form-control" name="username" />
                                    <ErrorMessage name="username" component="small" className="Register__form__error" /> 
                            </div>
                            <div className="form-group my-3">
                                    <label htmlFor="email">Email</label> 
                                    <Field id="email" type="email" className="form-control" name="email" /> 
                                    <ErrorMessage name="email" component="small" className="Register__form__error" />
                            </div>
                            <div className="form-group my-3">
                                    <label htmlFor="password">Password</label> 
                                    <Field id="password" type="password" className="form-control" name="password" />
                                    <ErrorMessage name="password" component="small" className="Register__form__error" /> 
                            </div>
                            <div className="form-group form-check my-3">
                                <div>
                                    <label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label> 
                                    <Field id="agreeToTerms" type="checkbox" className="form-check-input" name="agreeToTerms" /> 
                                </div>    
                                    <ErrorMessage name="agreeToTerms" component="small" className="text-danger" />
                            </div>
                            <div className= "form-group my-3">
                                <button type="submit" className="btn btn-success"> Register</button>
                            </div>
                        </Form>
                    </Formik>  
            </div>  
        </div>
    );
}

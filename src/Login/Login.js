import React from 'react'
import {useState} from 'react'
import {Formik, Form, Field} from 'formik';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import intro from '../Assets/Images/intro.jpg';
import {loginSchema} from './login.schema';
import './Login.scss'



export default function Login() {

    const history = useHistory();
    const [showError, setShowError] = useState(false);
    
    function submit(values){
        setShowError(false);
        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res=> {
            if(res.status === 200) {
                res.json()
                    .then(json => {
                       Cookies.set('nechavot-user', json.token, {expires: 30});
                       history.push('/');
                    });
                return;
            }
            setShowError(true);
        });
    }
    
    
    return (
        <div className="Login d-flex row justify-content-center">   
            <div className="col-lg-6 order-lg-1 my-lg-5">
                <h2 className="Login__title">Login</h2>
                {showError && <div className="alert alert-danger">
                    Incorrect username or password
                </div> }
                <Formik
                    initialValues={{username:'', password: ''}} 
                    validationSchema = {loginSchema}
                    onSubmit={submit}>
                    <Form className="Login__form mt-5 col-lg-8 px-0">
                        <div className="form-group my-3">
                            <label htmlFor="username" >Username</label>
                            <Field id="username" name="username" className="form-control" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                        </div>
                        <div className="form-group my-2 text-light">
                            <button type="submit" className="mt-3 Login__submit-btn">Login</button>
                        </div>
                        <hr className="mt-4"/>
                        <div className="text-center">
                            Don't have an account? <Link to="/register" className="Login__register-link">Register</Link> 
                        </div>
                    </Form>
                </Formik>    
            </div>
            <div className="col-lg-6 my-4 text-end">
                <img src={intro} className="Login__intro-image my-5 mx-3" alt="Instagram" />
            </div>
        </div>    
    );
}

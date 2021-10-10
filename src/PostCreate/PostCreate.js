import React, { useEffect, useState }from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {PostCreateSchema} from './post-create.schema';
import { useHistory } from 'react-router-dom';
import './PostCreate.scss';
import environment from '../environments';
import { UserService } from '../services/user.service';
import { set } from 'js-cookie';


export default function PostCreate() {

    const history = useHistory();
    const [imgPreview, setImgPreview] = useState('')
    const [myUsernames, setUsernames] = useState([]);

    useEffect(() => {
        async function getAllUsers() {
                const usernames = await UserService.getAllUsers();
                console.log(usernames)
                setUsernames([...usernames]);
        }
        getAllUsers();
    }, [])
      
    
    
    function previewFile(file) {
        if(!file) return;
        setImgPreview(URL.createObjectURL(file));
    }

    async function submit(values) {
        const data = new FormData();
        data.append('image', values.image);
        data.append('description', values.description);
        data.append('whereItIsNow', values.whereItIsNow);
        data.append('size', values.size);

        try {
            await fetch(environment.apiUrl + '/post', {
                method: 'PUT',
                body: data,
                headers: { 
                    Authorization: UserService.getToken()
                }
            });
            history.push('/');
        } catch (err) {
            console.log(err);
        }
     
    }
    
    return (
        <div className="d-flex row">
            <div className="col-lg-6 order-sm-0 order-lg-1 my-3">
                <h2 className="PostCreate__title mx-4">Add a dress</h2>
                <Formik
                    initialValues= {{image: '', description: '', whereItIsNow: '' }}
                    validationSchema = {PostCreateSchema}
                    onSubmit = {submit}>
                    {({ setFieldValue, isSubmitting })=> (
                        <Form className="PostCreate__form mt-5 mx-4 col-lg-10 px-0" noValidate>
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
                                <ErrorMessage component="small" name="image" className="PostCreate__form__error" />
                            </div>
                            <div className="form-group my-3">
                                <label className="form-label" htmlFor="description">description</label>
                                <Field as="textarea" className="form-control" name="description" id="description" />
                                <ErrorMessage component="small" name="description" className="PostCreate__form__error" />
                            </div>
                            <div class="form-group my-3">
                                <label className="form-label" htmlFor="whereItIsNow" >Where it is now</label>
                                <Field as="select"  className="form-control" name="whereItIsNow" id="whereItIsNow">
                                    <option key="empty" value="">Select who currently took the dress</option>
                                    {myUsernames.map((username, index) => (
                                        <option key={index} value={username} data={username}>
                                            {username}
                                        </option>
                                    ))} 
                                                             
                                </Field>
                                <ErrorMessage component="small" name="whereItIsNow" className="PostCreate__form__error" />
                            </div>
                            <div className="form-group my-3">
                                <label className="form-label" htmlFor="size">Size</label>
                                <Field as="select" className="form-control" name="size" id="size">
                                    <option key="empty" value="">Select dress size</option>
                                    <option value="OS">OS</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </Field>
                                <ErrorMessage component="small" name="size" className="PostCreate__form__error" />
                            </div>
                            <div className="from-group text-right my-3">
                                <button type="submit" 
                                        className="mt-3 PostCreate__submit-btn" 
                                        disabled = {isSubmitting}>
                                        { isSubmitting ? 'Posting...' : 'Post'}
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

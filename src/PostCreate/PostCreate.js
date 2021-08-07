import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {PostCreateSchema} from './post-create.schema';
import { useHistory } from 'react-router-dom';
import './PostCreate.scss';
import environment from '../environments';
import { UserService } from '../services/user.service';


export default function PostCreate() {

    const history = useHistory();

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
                <h2 className="PostCreate__title">Add a dress</h2>
                <Formik
                    initialValues= {{image: '', description: '', whereItIsNow: '' }}
                    validationSchema = {PostCreateSchema}
                    onSubmit = {submit}>
                    {({ setFieldValue, isSubmitting })=> (
                        <Form className="PostCreate__form mt-5 col-lg-8 px-0" noValidate>
                            <div className="form-group my-3">
                                <input type="file"
                                        id="image" 
                                        name="image" 
                                        className="form-control"
                                        onChange={(e)=> setFieldValue('image', e.target.files[0])}
                                        
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
                                <Field as="select" className="form-control" name="whereItIsNow" id="whereItIsNow">
                                    <option value="Ariel">Ariel</option>
                                    <option value="Julie">Julie</option>
                                    <option value="Almog">Almog</option>
                                    <option value="Gilor">Gilor</option>
                                    <option value="Racheli">Racheli</option>
                                    <option value="Bar">Bar</option>
                                </Field>
                                <ErrorMessage component="small" name="whereItIsNow" className="PostCreate__form__error" />
                            </div>
                            <div className="form-group my-3">
                                <label className="form-label" htmlFor="size">Size</label>
                                <Field as="select" className="form-control" name="size" id="size">
                                    <option value="OS">OS</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </Field>
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
        </div>
    )
}

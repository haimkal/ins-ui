import React, { useState, useRef, useContext, useMemo } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { userEditSchema } from './EditProfile.schema';
import Avatar from '../common/Avatar/Avatar';
import { UserContext } from '../user-context';
import { UserService } from '../services/user.service';
import { useHistory } from 'react-router';
import { getCroppedImg } from './imageCropper';
import './EditProfile.scss';


export default function EditProfile() {

    const history = useHistory()
    const [imgPreview, setImgPreview] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const [crop, setCrop] = useState({   
        unit: '%',
        width: 40,
        aspect: 1 / 1
    });
    const [image, setImage] = useState(null);
    
    const [result, setResult] = useState(null);
    const [isChosenFile, setIsChosenFile] = useState(false);
    
    
     
    function previewFile(file) {
        if(!file) return;
        setImgPreview(URL.createObjectURL(file));
       
    }


    async function submit(values) {
        console.log(user._id);
        const imageFile = await getCroppedImg(image, crop, 'croppedImg.jpg');
      
       console.log({imageFile});
        values.image = imageFile;
        try {
           
            // setUser(values);
            const newUser = await UserService.editUser(values, user._id)
            history.push(`/profile/${newUser.username}`);
            setUser(newUser);
            console.log(user);
           
        } catch (err) {
            console.log(err);
        }
       
    }
   



    return (
        <div className="ProfileEdit d-flex column">
                <div className="col-lg-6 order-sm-0 order-lg-1 my-3">
                    <h2 className="EditProfile__title mx-4">Edit Profile</h2>
                    <div className="form-container m-4 d-felx flex-column">
                        {isChosenFile ?
                        <div className="previewContainer  ">
                              
                            <ReactCrop onImageLoaded={setImage} src={imgPreview} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                        </div> :
                        <div className="postEdit-avatar d-flex justify-content-center"> <Avatar size="lg" image={user.avatar} /> </div> }
                        <Formik
                            initialValues= {{username: '', email: '', image: '' }}
                            validationSchema = {userEditSchema}
                            onSubmit = {submit}>
                            {({ setFieldValue, isSubmitting })=> (
                                <Form className="EditProfile__form mx-4 col-lg-10 px-0" noValidate>
                                    <div className="form-group my-3">
                                        <input type="file"
                                                id="image" 
                                                name="image" 
                                                className="form-control"
                                                accept="image/*"
                                                
                                                onChange={(e)=> {
                                                    if(e.target.files.length === 0) return; 
                                                    previewFile(e.target.files[0]);
                                                    // setFieldValue('image', e.target.files[0]);
                                                    // setChanged(true);
                                                    // setChosenFile(URL.createObjectURL(e.target.files[0]));
                                                    setIsChosenFile(true);
                                                    console.log(e.target.files[0]);
                                                    
                                                }}   
                                        />
                                        <ErrorMessage component="small" name="image" className="EditProfile__form__error" />
                                    </div>
                                    <div className="form-group my-3">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <Field as="input" className="form-control" name="username" id="username" placeholder={user.username} />
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
                </div>    
            
        </div>
    )
}

import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdopters, getAdoptersDetails, clearErrors } from '../../actions/adoptersAction'
import { UPDATE_ADOPTER_RESET } from '../../constants/adoptersConstant'

const UpdateAdopters = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.adopters);
    const { adopters } = useSelector(state => state.adoptersDetaisl)

    const {id} = useParams();

    useEffect(() => {

        
        if (adopters && adopters._id !== id) {
            dispatch(getAdoptersDetails(id))
        } else {
            setName(adopters.name);
            setEmail(adopters.email);
            setStatus(adopters.status)
            setAvatarPreview(adopters.avatar.url)

        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Adopter updated successfully')

            navigate('/admin/adopters')

            dispatch({
                type: UPDATE_ADOPTER_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, adopters])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('status', status);
        formData.set('avatar', avatar);


        dispatch(updateAdopters(adopters._id, formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }


    return (
        <Fragment>
            <MetaData title={`Update Adopters`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Adopters</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Status</label>

                                    <select
                                        id="status_field"
                                        className="form-control"
                                        name='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Inactive">Inactive</option>
                                        <option value="Approved">Approved</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                                

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateAdopters
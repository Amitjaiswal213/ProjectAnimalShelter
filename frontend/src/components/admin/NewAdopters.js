import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newAdopters, clearErrors } from '../../actions/adoptersAction'
import { NEW_ADOPTER_RESET } from '../../constants/adoptersConstant'

const NewAdopters = () => {

    const [adopters, setAdopters] = useState({
        name: '',
        email: '',
        password: '',
        status: '',

    })

    const { name, email, password, status } = adopters;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')


    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newAdopters);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/adopters');
            alert.success('Adopter created successfully');
            dispatch({ type: NEW_ADOPTER_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('status', status);

        formData.set('avatar', avatar);
        
        dispatch(newAdopters(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setAdopters({ ...adopters, [e.target.name]: e.target.value })
        }
    }


    return (
        <Fragment>
            <MetaData title={'New Adopter'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Adopter</h1>

                                <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                placeholder="Enter Name"

                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"

                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"

                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">Status</label>

                                    <select
                                        id="status_field"
                                        className="form-control"
                                        name='status'
                                        value={status}
                                        onChange={onChange}
                                        >
                                        <option value="">Select Adopter Status</option>
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
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default NewAdopters

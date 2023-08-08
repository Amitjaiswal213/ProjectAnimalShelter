import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newAnimals, clearErrors } from '../../actions/animalsAction'
import { NEW_ANIMAL_RESET } from '../../constants/animalsConstant'

const NewAnimals = () => {

    const [animals, setAnimals] = useState({
        name: '',
        type: '',
        breed: '',
        sex: '',
        age: '',
        healthstatus: '',
        adaptionstatus: '',


    })

    const { name, type, breed, sex, age, healthstatus, adaptionstatus } = animals;

    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('/images/default_avatar.jpg')


    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newAnimals);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/animals');
            alert.success('Animal created successfully');
            dispatch({ type: NEW_ANIMAL_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('type', type);
        formData.set('breed', breed);
        formData.set('sex', sex);
        formData.set('age', age);
        formData.set('healthstatus', healthstatus);
        formData.set('adaptionstatus', adaptionstatus);

        formData.set('image', image);
        
        dispatch(newAnimals(formData))
    }

    const onChange = e => {
        if (e.target.name === 'image') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result)
                    setImage(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setAnimals({ ...animals, [e.target.name]: e.target.value })
        }
    }


    return (
        <Fragment>
            <MetaData title={'New Animal'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Animal</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input
                                    type="name"
                                    placeholder="Enter Animal Name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Type</label>
                                <select
                                    type="type"
                                    id="name_field"
                                    className="form-control"
                                    name='type'
                                    value={type}
                                    onChange={onChange}
                                >
                                <option value="">Enter Animal Type</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                </select>
                                
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Breed</label>
                                <select
                                    type="breed"
                                    placeholder="Enter Animal Breed"
                                    id="name_field"
                                    className="form-control"
                                    name='breed'
                                    value={breed}
                                    onChange={onChange}
                                >
                                    <option value="">Enter Animal Breed</option>
                                    <option value="">-----Dog Breeds-----</option>
                                    <option value="Askal">Askal</option>
                                    <option value="Bulldog">Bulldog</option>
                                    <option value="Siberian Husky">Siberian Husky</option>
                                    <option value="Shih Tzu">Shih Tzu</option>
                                    <option value="Golden Retriever">Golden Retriever</option>
                                    <option value="Labrador">Labrador</option>
                                    <option value="Chihuahua">Chihuahua</option>
                                    <option value="">-----Cat Breeds-----</option>
                                    <option value="Puspin">Puspin</option>
                                    <option value="Persian">Persian</option>
                                    <option value="Siamese">Siamese </option>
                                    <option value="Himalayan">Himalayan</option>
                                    <option value="Bengal">Bengal</option>
                                    <option value="">-----Other Breeds-----</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Sex</label>
                                <select
                                    type="sex"
                                    id="name_field"
                                    className="form-control"
                                    name='sex'
                                    value={sex}
                                    onChange={onChange}
                                >
                                <option value="">Enter Animal Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                                
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Age</label>
                                <input
                                    type="age"
                                    placeholder="Enter Animal Age"
                                    id="name_field"
                                    className="form-control"
                                    name='age'
                                    value={age}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Health status</label>
                                <select
                                    type="healthstatus"
                                    id="name_field"
                                    className="form-control"
                                    name='healthstatus'
                                    value={healthstatus}
                                    onChange={onChange}
                                >
                                <option value="">Select Health Status</option>
                                <option value="Healthy">Healthy</option>
                                <option value="Sick">Sick</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Adoption status</label>
                                <select
                                    type="adaptionstatus"
                                    id="name_field"
                                    className="form-control"
                                    name='adaptionstatus'
                                    value={adaptionstatus}
                                    onChange={onChange}
                                >
                                <option value="">Select Adoption Status</option>
                                <option value="Ready">Ready</option>
                                <option value="Pending">Pending</option>
                                </select>
                            </div>


                        


                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Image</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={imagePreview}
                                            className='rounded-circle'
                                            alt=''
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='image'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Image
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
export default NewAnimals

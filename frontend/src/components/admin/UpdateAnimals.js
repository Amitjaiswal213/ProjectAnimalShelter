import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateAnimals, getAnimalsInfo, clearErrors } from '../../actions/animalsAction'
import { UPDATE_ANIMAL_RESET } from '../../constants/animalsConstant'

const UpdatePersonnels = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')
    const [age, setAge] = useState('')
    const [healthstatus, setHealthStatus] = useState('')
    const [adaptionstatus, setAdaptionStatus] = useState('')

    const [image, setImage] = useState([]);

    const [oldImage, setOldImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([])

    
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.animalsAdmin);
    const { animals } = useSelector(state => state.animalsInfo)

    const {id} = useParams();

    useEffect(() => {

        
        if (animals && animals._id !== id) {
            dispatch(getAnimalsInfo(id))
        } else {
            setName(animals.name);
            setType(animals.type);
            setBreed(animals.breed);
            setSex(animals.sex);
            setAge(animals.age);
            setHealthStatus(animals.healthstatus);
            setAdaptionStatus(animals.adaptionstatus);
            setOldImage(animals.image)


        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Animal updated successfully')

            navigate('/admin/animals')

            dispatch({
                type: UPDATE_ANIMAL_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, animals])

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

        image.forEach(images => {
            formData.append('image', images)
        })




        dispatch(updateAnimals(animals._id, formData))
    }


    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagePreview([]);
        setImage([])
        setOldImage([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(oldArray => [...oldArray, reader.result])
                    setImage(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }



    return (
        <Fragment>
            <MetaData title={`Update Animals`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Animals</h1>

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
                                    <label htmlFor="name_field">Type</label>
                                    <select
                                        type="type"
                                        id="name_field"
                                        className="form-control"
                                        name='type'
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Breed</label>
                                    <select
                                        type="breed"
                                        id="name_field"
                                        className="form-control"
                                        name='breed'
                                        value={breed}
                                        onChange={(e) => setBreed(e.target.value)}
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
                                    <label htmlFor="name_field">Sex</label>
                                    <select
                                        type="sex"
                                        id="name_field"
                                        className="form-control"
                                        name='sex'
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Age</label>
                                    <input
                                        type="age"
                                        id="name_field"
                                        className="form-control"
                                        name='age'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Health Status</label>
                                    <select
                                        type="healthstatus"
                                        id="name_field"
                                        className="form-control"
                                        name='healthstatus'
                                        value={healthstatus} 
                                        onChange={(e) => setHealthStatus(e.target.value)}
                                    >
                                        <option value="Healthy">Healthy</option>
                                        <option value="Sick">Sick</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Adoption Status</label>
                                    <select
                                        type="adaptionstatus"
                                        id="name_field"
                                        className="form-control"
                                        name='adaptionstatus'
                                        value={adaptionstatus}
                                        onChange={(e) => setAdaptionStatus(e.target.value)}
                                    >
                                        <option value="Ready">Ready</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                            <label htmlFor='avatar_upload'>Image</label>
                            <div className='d-flex align-items-center'>

                            {oldImage && oldImage.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagePreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                            ))}


                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='image'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Image
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

export default UpdatePersonnels
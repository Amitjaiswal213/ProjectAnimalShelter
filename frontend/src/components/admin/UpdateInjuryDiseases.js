import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateInjuryDiseases, getInjuryDiseasesDetails, clearErrors } from '../../actions/injurydiseasesAction'
import { UPDATE_INJURYDISEASE_RESET } from '../../constants/injurydiseasesConstant'

const UpdateInjuryDiseases = () => {

    const [name, setName] = useState('')
    
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.injurydiseases);
    const { injurydiseases } = useSelector(state => state.injurydiseasesDetails)

    const {id} = useParams();

    useEffect(() => {

        
        if (injurydiseases && injurydiseases._id !== id) {
            dispatch(getInjuryDiseasesDetails(id))
        } else {
            setName(injurydiseases.name);

        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('InjuryDiseases updated successfully')

            navigate('/admin/injurydiseases')

            dispatch({
                type: UPDATE_INJURYDISEASE_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, injurydiseases])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        dispatch(updateInjuryDiseases(injurydiseases._id, formData))
    }



    return (
        <Fragment>
            <MetaData title={`Update InjuryDiseases`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Injury Diseases</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        placeholder="Enter Injury or Disease Name"

                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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

export default UpdateInjuryDiseases
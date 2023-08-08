import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allInjuryDiseases, deleteInjuryDiseases, clearErrors } from '../../actions/injurydiseasesAction'

import { DELETE_INJURYDISEASE_RESET } from '../../constants/injurydiseasesConstant'



const InjuryDiseasesList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, injurydiseases,data } = useSelector(state => state.allInjury);
    const { isDeleted } = useSelector(state => state.injurydiseases)

    useEffect(() => {
        dispatch(allInjuryDiseases());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('InjuryDisease deleted successfully');
            navigate('/admin/injurydiseases');
            dispatch({ type: DELETE_INJURYDISEASE_RESET })
        }

    }, [dispatch, alert, error, navigate, isDeleted, data])


    const deleteInjuryDiseasesHandler = (id) => {
        dispatch(deleteInjuryDiseases(id))
    }

    const setInjuryDiseases = () => {
        const data = {
            columns: [
                {
                    label: 'InjuryDisease ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },


                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        injurydiseases.forEach(injurydisease => {
            data.rows.push({
                id: injurydisease._id,
                name: injurydisease.name,



                actions: <Fragment>
                    <Link to={`/admin/injurydiseases/${injurydisease._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteInjuryDiseasesHandler(injurydisease._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Injury and Diseases'} />
            <div className="dashboard-margin">
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
 
                        <h1 className="mt-3">All Injury and Diseases</h1>
                        <Link to={`/admin/injurydiseases/create`} className="btn btn-dark py-1 px-2 mt-2 mb-4 ml-4">
                            <i > Create New Record </i>
                        </Link>
                        {loading ? <Loader /> : (
                            
                            <MDBDataTable
                                data={setInjuryDiseases()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>
            </div>

        </Fragment>
    )
}

export default InjuryDiseasesList
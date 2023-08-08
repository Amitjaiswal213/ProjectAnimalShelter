import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allPersonnels, deletePersonnels, clearErrors } from '../../actions/personnelsAction'
import { DELETE_PERSONNEL_RESET } from '../../constants/personnelsConstant'



const PersonnelsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, personnels, data } = useSelector(state => state.allPersonnels);
    const { isDeleted } = useSelector(state => state.personnels)

    useEffect(() => {
        dispatch(allPersonnels());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }



        if (isDeleted) {
            alert.success('Personnels deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_PERSONNEL_RESET })
        }


    }, [dispatch, alert, error, navigate, isDeleted, data])


    const deletePersonnelsHandler = (id) => {
        dispatch(deletePersonnels(id))
    }

    const setPersonnels = () => {
        const data = {
            columns: [
                {
                    label: 'Personnel ID',
                    field: 'id',
                    sort: 'asc'
                },


                {
                    label: 'Avatar',
                    field: 'avatar',
                    sort: 'asc'
                },


                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },

                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },

                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        personnels.forEach(personnel => {
            data.rows.push({
                id: personnel._id,
                avatar: 
                    <Fragment>
                        <img src={personnel.avatar.url} className="img-fluid img-thumbnail" width="75" height="75" alt="" />
                    </Fragment>,
                name: personnel.name,
                email: personnel.email,
                role: personnel.role,


                actions: <Fragment>
                    <Link to={`/admin/personnels/${personnel._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelsHandler(personnel._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Personnels'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="mt-3">All Personnel</h1>
                        <Link to={`/admin/personnels/create`} className="btn btn-dark py-1 px-2 mt-2 mb-4 ml-4">
                            <i > Create New Record </i>
                        </Link>
                        {loading ? <Loader /> : (
                            
                            <MDBDataTable
                                data={setPersonnels()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default PersonnelsList
import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allAdopters, deleteAdopters, clearErrors } from '../../actions/adoptersAction'
import { DELETE_ADOPTER_RESET } from '../../constants/adoptersConstant'

const AdoptersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, adopters } = useSelector(state => state.allAdopters);
    const { isDeleted } = useSelector(state => state.adopters)

    useEffect(() => {
        dispatch(allAdopters());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        
        if (isDeleted) {
            alert.success('Adopter deleted successfully');
            navigate('/admin/adopters');
            dispatch({ type: DELETE_ADOPTER_RESET })
        }



    }, [dispatch, alert, error, navigate, isDeleted])

    const deleteAdoptersHandler = (id) => {
        dispatch(deleteAdopters(id))
    }

    const setAdopters = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
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
                    label: 'Status',
                    field: 'status',
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

        adopters.forEach(adopter => {
            data.rows.push({
                id: adopter._id,
                avatar: 
                <Fragment>
                    <img src={adopter.avatar.url} className="img-fluid img-thumbnail" width="75" height="75" alt="" />
                </Fragment>,
                
                name: adopter.name,
                email: adopter.email,
                status: adopter.status,

                role: adopter.role,

                actions: <Fragment>
                    <Link to={`/admin/adopters/${adopter._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAdoptersHandler(adopter._id)}  >
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Adopters'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-3">All Adopters</h1>
                        <Link to={`/admin/adopters/create`} className="btn btn-dark py-1 px-2 mb-4 ml-4">
                            <i > Create New Record </i>
                        </Link>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAdopters()}
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

export default AdoptersList
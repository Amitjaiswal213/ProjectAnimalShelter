import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allAdminAnimals, deleteAnimals, clearErrors } from '../../actions/animalsAction'
import { DELETE_ANIMAL_RESET } from '../../constants/animalsConstant'

const AnimalsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, animals } = useSelector(state => state.adminAnimalsAll);
    const { isDeleted } = useSelector(state => state.animalsAdmin)

    useEffect(() => {
        dispatch(allAdminAnimals());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Animal deleted successfully');
            navigate('/admin/animals');
            dispatch({ type: DELETE_ANIMAL_RESET })
        }


    }, [dispatch, alert, error, isDeleted, navigate])

    const deleteAnimalsHandler = (id) => {
        dispatch(deleteAnimals(id))
    }


    const setAnimals = () => {
        const data = {
            columns: [
                {
                    label: 'Animal ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'Image',
                    field: 'image',
                    sort: 'asc'
                },

                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc'
                },
                {
                    label: 'Breed',
                    field: 'breed',
                    sort: 'asc'
                },
                {
                    label: 'Sex',
                    field: 'sex',
                    sort: 'asc'
                },
                {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc'
                },
                {
                    label: 'Health Status',
                    field: 'healthstatus',
                    sort: 'asc'
                },
                {
                    label: 'Adoption Status',
                    field: 'adaptionstatus',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        animals.forEach(animal => {
            data.rows.push({
                id: animal._id,
                image: 
                <Fragment>
                    <div className="col-12 col-lg-5 img-fluid" id="animal_image">
                 
                        {animal.image && animal.image.map(images => (   
                           <img src={images.url} alt="" class=" ml-5" height ="70" width= "70"/>         
                                ))}
                   
                       </div>
                        
                </Fragment>,
                name: animal.name,
                type: animal.type,
                breed: animal.breed,
                sex: animal.sex,
                age: animal.age,
                healthstatus: animal.healthstatus,
                adaptionstatus: animal.adaptionstatus,
                
                


                actions: <Fragment>
                    <Link to={`/admin/animals/${animal._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAnimalsHandler(animal._id)}  >
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Animals'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-3">All Animals</h1>
                        <Link to={`/admin/animals/create`} className="btn btn-dark py-1 px-2 mb-4 ml-4">
                            <i > Create New Record </i>
                        </Link>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAnimals()}
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

export default AnimalsList
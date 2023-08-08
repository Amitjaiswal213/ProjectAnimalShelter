import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'


import { allAdminAnimals } from '../../actions/animalsAction'
import { allPersonnels } from '../../actions/personnelsAction'
import { allAdopters } from '../../actions/adoptersAction'
import { allInjuryDiseases } from '../../actions/injurydiseasesAction'




const Dashboard = () => {

    const dispatch = useDispatch();
    const { animals } = useSelector(state => state.animals)
    const { personnels } = useSelector(state => state.allPersonnels)
    const { adopters } = useSelector(state => state.allAdopters)
    const { injurydiseases } = useSelector(state => state.allInjury)



    useEffect(() => {
        dispatch(allAdminAnimals())
        dispatch(allPersonnels())
        dispatch(allAdopters())
        dispatch(allInjuryDiseases())

    }, [dispatch])

    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {false ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                    
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Animals<br /> <b>{animals && animals.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                    
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Injury and Diseases<br /> <b>{injurydiseases && injurydiseases.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                    
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Personnels<br /> <b>{personnels && personnels.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                    
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Adopters<br /> <b>{adopters && adopters.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>





                            </div>
                         

                         
                        </Fragment>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard
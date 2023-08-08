import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Sidebar = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">


                    {user && user.role === 'admin' && (

                        <Fragment>
                            <li>
                                <Link to="/dashboard"><i class="material-icons">dashboard</i>Dashboard</Link>
                            </li>

                            <li>
                                <Link to="/admin/users"><i class="material-icons">group</i>Users</Link>
                            </li>

                            <li>
                                <Link to="/admin/personnels"><i class="material-icons">person</i>Personnel</Link>
                            </li>

                            <li>
                                <Link to="/admin/adopters"><i class="material-icons">person</i> Adopters</Link>
                            </li>

                            <li>
                                <Link to="/admin/animals"><i class="material-icons">pets</i> Animals</Link>
                            </li>

                            <li>
                                <Link to="/admin/injurydiseases"><i class="material-icons">medication</i>Injury and Diseases</Link>
                            </li>

                        </Fragment>
                    )} 



                   

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
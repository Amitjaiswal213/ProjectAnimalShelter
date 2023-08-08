import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'

import Pagination from 'react-js-pagination'

import { getAnimals } from '../actions/animalsAction'
import Animal from './animals/Animals'

import MetaData from './layout/MetaData'

import Loader from  './layout/Loader'
// import { NavLink } from 'react-router-dom'
import 'rc-slider/assets/index.css';



const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    let { keyword } = useParams();

    //destructure from reducers
    const { loading, animals, error, animalsCount, resPerPage, filteredAnimalsCount } = useSelector(state => state.animals);
    const [currentPage, setCurrentPage] = useState(1);
    const [breed, setBreed] = useState();
    const [sex, setSex] = useState();
    const [age, setAge] = useState();

    



    const breeds = [
        'Askal',
        'Bulldog',
        'Siberian Husky',
        'Shih Tzu',
        'Golden Retriever',
        'Labrador',
        'Chihuahua',

        'Puspin',
        'Persian',
        'Siamese',
        'Himalayan',
        'Bengal',

        'Others'
        
    ]


    const sexs = [
        'Male',
        'Female',
    ]

    const ages = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ]


    
    //getAnimals from actions
    useEffect( () => { 
        if(error){
            alert.success('success')
            return alert.error(error)
        }
        dispatch(getAnimals(currentPage, keyword, breed, sex, age));

    }, [dispatch, alert, error, currentPage, keyword, breed, sex, age] );

    let count = animalsCount;

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    if (keyword) {
        count = filteredAnimalsCount
    }


    
    return (
        <Fragment>
            {loading ? <Loader />:(
                <Fragment>
                    <MetaData title={'Adopt Your New Pet Here!'} />
                    {/* <h1 id="products_heading">Adopt Your New Pet Here!</h1> */}
                    <section id="animals" className="container mt-5">
                        <div className="row">

                        {keyword ? (
                                <Fragment>
                                    <div className="home-filter">
                                    <div className="col-1 col-md-3 mb-5">
                                        <div className="px-5">
                                           
                                            {/* <hr className="my-3" />  */}

 
                                            <hr className="my-5" />
                                                <div className="mt-5">
                                                    <h4 className="mb-1"> Breeds </h4>
                                                        <ul className="pl-0">

                                                            {breeds.map(breed => (
                                                                <li
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                    }}

                                                                key={breed}
                                                                onClick={() => setBreed(breed)}>
                                                                {breed}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                </div>

                                                <hr className="my-5" />
                                                    <div className="mt-5">
                                                        <h4 className="mb-1"> Sex </h4>
                                                            <ul className="pl-0">

                                                            {sexs.map(sex => (
                                                                <li
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                    }}

                                                                key={sex}
                                                                onClick={() => setSex(sex)}>
                                                                {sex}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                </div>

                                                <hr className="my-5" />
                                                    <div className="mt-5">
                                                        <h4 className="mb-1"> Age </h4>
                                                            <ul className="pl-0">

                                                            {ages.map(age => (
                                                                <li
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                    }}

                                                                key={age}
                                                                onClick={() => setAge(age)}>
                                                                {age}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                </div>

                                        </div>
                                    </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {animals.map(animal => (
                                                <Animal key={animal._id} animal={animal} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                animals.map(animal => (
                                        <Animal key={animal._id} animal={animal} col={3} />
                                    ))
                                )}

                        </div>
                       
                    </section>


                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                    
                 

                </Fragment>
            )}
        </Fragment>
    );
}

export default Home










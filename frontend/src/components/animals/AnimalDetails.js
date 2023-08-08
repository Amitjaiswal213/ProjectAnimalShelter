import React, { Fragment,  useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';


import { getAnimalsDetails, newReview, clearErrors } from '../../actions/animalsAction'
import { NEW_REVIEW_RESET } from '../../constants/animalsConstant'
import ListReviews from '../review/ListReviews'


 

const AnimalDetails = ({ match }) => { 
    const dispatch = useDispatch();
    const alert = useAlert();
    let { id } = useParams();

    const { loading, error, animals } = useSelector(state => state.animalsDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const { user } = useSelector(state => state.auth)

    const [comment, setComment] = useState('');


    useEffect(() => {
        dispatch(getAnimalsDetails(id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }



    }, [dispatch, alert, error, reviewError, success, id]);

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('comment', comment);
        formData.set('animalsId', id);

        dispatch(newReview(formData));
    }
    
     return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                   <MetaData title={animals.name} />
                    <div className='mt-5'>

                        <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-5 mt-10 img-fluid" id="animals_image">
                                    <Carousel>
                                        {animals.image && animals.image.map(images => (
                                            <Carousel.Item key={images.public_id}>
                                                <img className="d-block w-100" src={images.url} alt={animals.name} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>


                                <div className="col-12 col-lg-5 mt-5">
                                    <h3>{animals.name}</h3>
                                        <p id="product_id">Animal # {animals._id}</p>
                                    <hr />

                                    <h5> Animal Type:{animals.type}</h5>
                                    <hr />

                                    
                                    <h5> Animal Sex: {animals.sex}</h5>
                                    <hr />

                                    <h5>Breed: {animals.breed}</h5>
                                    <hr />

                                    
                                    <h5>Age: {animals.age}</h5>
                                    <hr />


                                    <h5>Health Status: <span id="stock_status" className={animals.healthstatus === 'Healthy' ? 'greenColor' : 'redColor'}> {animals.healthstatus}</span></h5>

                                    <hr />

                                    <h5>Adoption Status: <span id="stock_status" className={animals.adaptionstatus === 'Ready' ? 'greenColor' : 'redColor'}> {animals.adaptionstatus}</span></h5>

                                    {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                                Submit Your Review
                                            </button>
                                        :
                                        <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                                    }

                                    {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4 ml-5">
                                                Adopt Your New Pet
                                            </button>
                                        :
                                        <div className="alert alert-danger mt-5" type='alert'>Login to adopt.</div>
                                    }

                                    <div className="row mt-2 mb-5">
                                        <div className="rating w-50">

                                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="ratingModalLabel">Shaw Shelter</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                <div className="modal-body">
                                                <h5 className="modal-title">Comment</h5>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {animals.reviews && animals.reviews.length > 0 && (
                                        <ListReviews reviews={animals.reviews} />
                                        )}

                                </div>
                            </div>


                                </div>
                            

                            </div>
                    </div>                
                  


                </Fragment>
            )}
        </Fragment>
    )
}
export default AnimalDetails

import React from 'react'
import { Link } from 'react-router-dom'


const Animal = ({animal}) => {
 return ( 
      <div className="col-sm-9 col-md-6 col-lg-4 my-4">
           <div className="card p-3 rounded">

            <Link to={`/animals/${animal._id}`}  className="btn btn-block"> 
            <img
               className="card-img-top mx-auto "
               src={animal.image[0].url} alt=""
             />
            </Link>
            

            <div className="card-body d-flex flex-column">
               <h5 className="card-title mx-auto ">
                 <a href="/#">Hello! I'm {animal.name}</a>
               </h5>
              
            </div>

           </div>
      </div>
)
}
export default Animal
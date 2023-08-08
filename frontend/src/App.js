import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { useSelector } from 'react-redux'
import ProtectedRoute from './components/route/ProtectedRoute'
import store from './store'


//actions
import { loadUser } from './actions/userAction'

//Layouts
import Header from './components/layout/Header'
import Home from './components/Home'


import AnimalDetails from './components/animals/AnimalDetails'

//User
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'






//Admin
import Dashboard from './components/admin/Dashboard'
import UsersList from './components/admin/UserList'
import UpdateUser from './components/admin/UpdateUser'


import PersonnelsList from './components/admin/PersonnelsList'

import NewPersonnels from './components/admin/NewPersonnels'
import UpdatePersonnels from './components/admin/UpdatePersonnels'


import InjuryDiseasesList from './components/admin/InjuryDiseasesList'
import NewInjuryDiseases from './components/admin/NewInjuryDiseases'
import UpdateInjuryDiseases from './components/admin/UpdateInjuryDiseases'



import AdoptersList from './components/admin/AdoptersList'
import NewAdopters from './components/admin/NewAdopters'
import UpdateAdopters from './components/admin/UpdateAdopters'


import AnimalList from './components/admin/AnimalList'
import NewAnimals from './components/admin/NewAnimals'
import UpdateAnimals from './components/admin/UpdateAnimals'


import PersonnelAdoptersList from './components/admin/PersonnelAdopterList'
import PersonnelAdopterUpdate from './components/admin/PersonnelAdopterUpdate'









function App() {
	useEffect(() => {
    	store.dispatch(loadUser());
	}, [])

	
	return (
		<Router>
			 <div className="App">
			 <Header />
			 
			 <Routes>
				<Route path="/" element={<Home />} exact="true" />
				<Route path="/search/:keyword" element={<Home />} exact="true"/>
				<Route path="/animals/:id" element={<AnimalDetails />} exact="true" />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register/>} />
				{/* <ProtectedRoute>
				</ProtectedRoute> */}

				<Route path="/profile" element={ 
					<ProtectedRoute isVerified={true}>
						<Profile />
			  		</ProtectedRoute>
					}
        		/>


				<Route path="/profile/update" element={<UpdateProfile />}  />
				<Route path="/password/update" element={<UpdatePassword />}  />
				<Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
				<Route path="/password/reset/:token" element={<NewPassword/> } exact />


			<Route path="/dashboard" element={ 
				<ProtectedRoute isAdmin={true}>
              		<Dashboard />
            	</ProtectedRoute>
          		}
        	/>

			<Route path="/admin/users" element={ 
				<ProtectedRoute isAdmin={true}>
					<UsersList />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/user/:id" element={ 
				<ProtectedRoute isAdmin={true}>
					<UpdateUser />
				</ProtectedRoute>
				}
			/>


			<Route path="/admin/personnels" element={ 
				<ProtectedRoute isAdmin={true}>
					<PersonnelsList />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/personnels/create" element={ 
				<ProtectedRoute isAdmin={true}>
					<NewPersonnels />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/personnels/:id" element={ 
				<ProtectedRoute isAdmin={true}>
					<UpdatePersonnels />
				</ProtectedRoute>
				}
			/>


			<Route path="/admin/injurydiseases" element={ 
				<ProtectedRoute isAdmin={true}>
					<InjuryDiseasesList />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/injurydiseases/create" element={ 
				<ProtectedRoute isAdmin={true}>
					<NewInjuryDiseases />
				</ProtectedRoute>
				}
			/>

			
			<Route path="/admin/injurydiseases/:id" element={ 
				<ProtectedRoute isAdmin={true}>
					<UpdateInjuryDiseases />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/adopters" element={ 
				<ProtectedRoute isAdmin={true}>
					<AdoptersList />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/adopters/create" element={ 
				<ProtectedRoute isAdmin={true}>
					<NewAdopters />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/adopters/:id" element={ 
				<ProtectedRoute isAdmin={true}>
					<UpdateAdopters />
				</ProtectedRoute>
				}
			/>


			<Route path="/admin/animals" element={ 
				<ProtectedRoute isAdmin={true}>
					<AnimalList />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/animals/create" element={ 
				<ProtectedRoute isAdmin={true}>
					<NewAnimals />
				</ProtectedRoute>
				}
			/>

			<Route path="/admin/animals/:id" element={ 
				<ProtectedRoute isAdmin={true}>
					<UpdateAnimals />
				</ProtectedRoute>
				}
			/>



			<Route path="/employee/adopters" element={ 
				<ProtectedRoute isEmployee={true}>
					<PersonnelAdoptersList />
				</ProtectedRoute>
				}
			/>

			<Route path="/employee/adopters/:id" element={ 
				<ProtectedRoute isEmployee={true}>
					<PersonnelAdopterUpdate />
				</ProtectedRoute>
				}
			/>






			 </Routes>
			
			 </div>
		 </Router>
	   );
	 }
	 export default App;
	 
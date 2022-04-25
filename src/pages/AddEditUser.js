import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'

//Import Action Creator
import { createUserStart, updateUserStart } from '../redux/actions'

//For toast
import { toast } from 'react-toastify'


const initialState = {
  name: "",
  email: "",
  phone: "",
  country: ""
}

function AddEditUser() {
  const [formValue, setFormValue] = useState(initialState)
  const { name, email, phone, country } = formValue

  //Edit mode selection, false === Add, true === Edit
  const [editMode, setEditMode] = useState(false)

  //for Go-Back button
  const navigate = useNavigate()

  const dispatch = useDispatch()

  //Get data/users from the Store
  //In rootReducer, usersReducer has data key, data: usersReducer
  //In usersReducer, STATE is users: []
  const { users } = useSelector(store => store.data)

  //Using Object destructuring get id from the link
  //http://localhost:3002/editUser/1
  const { id } = useParams()


  useEffect(() => {
    if (id) {
      setEditMode(true)
      //console.log(id)
      //typeof id from useParams string
      //console.log("typeof id from useParams", typeof (id))
      //As received id is string, convert it to a Number
      const singleUserA = users.find(user => user.id === Number(id))
      //console.log(typeof (singleUser))
      //console.log(singleUser)
      //console.log({ ...singleUser })
      //setFormValue({ ...singleUser })

      //console.log(singleUserA)
      //console.log(singleUserA.id)
      //console.log(typeof (singleUserA))

      const { id: idOld, ...singleUser } = singleUserA

      //console.log(singleUser)
      //console.log(singleUser.name)
      //console.log(typeof (singleUser))

      setFormValue(singleUser)
    }
  }, [id])



  //Form Submission
  const handleSubmit = (event) => {
    //Prevent Browser's default behavior for refresh upon submit
    event.preventDefault()

    //Check if all the form fields have value
    if (name && email && phone && country) {
      //If Add mode
      if (!setEditMode) {
        dispatch(createUserStart(formValue))
        //Toast
        toast.success("User Added Successfully")
        //Redirect user to Home Page
        setTimeout(() => navigate("/"), 500)
      }
      else {
        //dispatch parameter should be a single value, an Object
        //formValue contains user information
        dispatch(updateUserStart({ id, formValue }))
        setEditMode(false)
      }
    }
  }

  //Form fields
  const onInputChange = (event) => {
    let { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold text-center">
        {!editMode ? "Add User Details" : "Edit User Details"}
      </p>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
      >
        <MDBValidationItem className='col-md-12' feedback='Please enter a Valid Name' invalid>
          <MDBInput
            value={name}
            name="name"
            type="text"
            onChange={onInputChange}
            required
            label="Name"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem className='col-md-12' feedback='Please enter a Valid Email' invalid>
          <MDBInput
            value={email}
            name="email"
            type="text"
            onChange={onInputChange}
            required
            label="Email"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem className='col-md-12' feedback='Please enter a Valid Phone' invalid>
          <MDBInput
            value={phone}
            name="phone"
            type="number  "
            onChange={onInputChange}
            required
            label="Phone"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem className='col-md-12' feedback='Please enter a Valid Country' invalid>
          <MDBInput
            value={country}
            name="country"
            type="text"
            onChange={onInputChange}
            required
            label="Country"
          />
        </MDBValidationItem>
        <br />

        <div className="col-12 text-center">
          <MDBBtn
            style={{ marginRight: "10px" }}
            type="submit"
          >
            {!editMode ? "Add User" : "Edit User"}
          </MDBBtn>
          <MDBBtn
            color="danger"
            onClick={() => navigate("/")}
          >
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation >
  )
}

export default AddEditUser


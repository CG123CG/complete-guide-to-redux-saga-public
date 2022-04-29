import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MDBBtn } from 'mdb-react-ui-kit'

function UserInfo() {

    //Get data/users from the Store
    //In rootReducer, usersReducer has data key, data: usersReducer
    //In usersReducer, STATE is users: []
    const { users } = useSelector(store => store.data)

    //Using Object destructuring get id from the link
    //http://localhost:3002/userInfo/6
    const { id } = useParams()

    //for Go-Back button
    const navigate = useNavigate()

    //console.log(id)
    //typeof id from useParams string
    //console.log("typeof id from useParams is  ", typeof (id))
    //As received id is string, convert it to a Number
    const singleUser = users.find(user => user.id === Number(id))
    //console.log("singleUser contents ", singleUser)

    //Destructure singleUser, not using id as it's already available via useParams()
    const { name, email, phone, country, status } = singleUser

    return (
        <div style={{ marginTop: "100px" }} >
            <div className="row"
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "450px"
                }}
            >
                <p className="col-md-12 fs-3 text-center">User Details</p>
                <hr />
                <p className="col-md-6 fw-bold">User Name: </p>
                <p className="col-md-6">{name}</p>
                <p className="col-md-6 fw-bold">User Email: </p>
                <p className="col-md-6">{email}</p>
                <p className="col-md-6 fw-bold">User Phone: </p>
                <p className="col-md-6">{phone}</p>
                <p className="col-md-6 fw-bold">User Country: </p>
                <p className="col-md-6">{country}</p>
                <p className="col-md-6 fw-bold">User Status: </p>
                <p className="col-md-6">{status}</p>
            </div>

            <div className=" text-center">
                <MDBBtn
                    onClick={() => navigate("/")}
                    color="danger"
                >
                    Go Back to Home Page
                </MDBBtn>
            </div>
        </div>
    )
}

export default UserInfo

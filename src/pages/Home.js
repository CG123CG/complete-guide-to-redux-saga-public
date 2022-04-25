import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersStart, deleteUserStart } from '../redux/actions'
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home() {
  const dispatch = useDispatch()

  //Get data/users from the Store
  //In rootReducer, usersReducer has data key, data: usersReducer
  //In usersReducer, STATE is users: []
  const { users } = useSelector(store => store.data)


  const handleDelete = (id) => {
    if (window.confirm(`Are you sure on deleting user ${id}`)) {
      dispatch(deleteUserStart(id))
      toast.success(`User ${id} Deleted Successfully`)
    }
  }

  useEffect(() => {
    dispatch(loadUsersStart())
  }, []
  )

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <MDBTable>

        <MDBTableHead dark>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Country</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>

        {/* //NEW CONCEPT to use && */}
        {users && users.map((user, index) => (
          <MDBTableBody key={index}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.country}</td>
              <td>
                <MDBBtn
                  className="m-1"
                  tag="a"
                  color="none"
                  //id here refers to the users/id in db.json
                  onClick={() => {
                    //console.log(user.id)
                    handleDelete(user.id)
                  }}
                >
                  <MDBTooltip title="Delete" tag="a">
                    <MDBIcon
                      fas
                      icon="trash"
                      style={{ color: "#dd4b39" }}
                      size="lg"
                    >
                    </MDBIcon>
                  </MDBTooltip>
                </MDBBtn>

                {/* //Add Spacing between Icons */}
                {" "}

                {/* //id here refers to the users/id in db.json */}
                <NavLink to={`/editUser/${user.id}`}>
                  <MDBTooltip title="Edit" tag="a">
                    <MDBIcon
                      fas
                      icon="pen"
                      style={{ color: "#55acee", marginBottom: "10px" }}
                      size="lg"
                    >
                    </MDBIcon>
                  </MDBTooltip>
                </NavLink>

                {/* //Add Spacing between Icons */}
                {" "}

                {/* //id here refers to the users/id in db.json */}
                <NavLink to={`/userInfo/${user.id}`}>
                  <MDBTooltip title="View" tag="a">
                    <MDBIcon
                      fas
                      icon="eye"
                      style={{ color: "#3b5998", marginBottom: "10px" }}
                      size="lg"
                    >
                    </MDBIcon>
                  </MDBTooltip>
                </NavLink>

              </td>
            </tr>
          </MDBTableBody>
        ))}

      </MDBTable>
    </div>
  )
}

export default Home


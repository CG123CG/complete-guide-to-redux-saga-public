import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersStart, deleteUserStart, filterUserStart, sortUserStart } from '../redux/actions'
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup
} from 'mdb-react-ui-kit'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'


function Home() {

  const dispatch = useDispatch()

  //Get data/users from the Store
  //In rootReducer, usersReducer has data key, data: usersReducer
  //In usersReducer, STATE is users: []
  const { users, error } = useSelector(store => store.data)

  //State to hold column name for Sorting
  const [sortValue, setSortValue] = useState("")

  //Array for all possible sorting values
  const sortOptions = ["name", "email", "phone", "country", "status"]

  //useEffect to show Toast for Error
  useEffect(() => {
    //if error, then show the toast msg with error content
    error && toast.error(error)
  }, [error]
  )

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure on deleting user ${id}`)) {
      dispatch(deleteUserStart(id))
      toast.success(`User ${id} Deleted Successfully`)
    }
  }

  //Added for Filtering
  const onFilterChange = (status) => {
    dispatch(filterUserStart(status))
  }

  //Added for Sorting
  const onSortChange = (event) => {
    //console.log(event.target.value)
    setSortValue(event.target.value)
    dispatch(sortUserStart(event.target.value))
  }

  useEffect(() => {
    dispatch(loadUsersStart())
  }, []
  )

  return (
    <MDBContainer>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBTable>

          <MDBTableHead dark>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
              <th scope="col">Status</th>
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
                <td>{user.status}</td>
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

      <MDBRow center>
        <MDBCol size="1">
        </MDBCol>

        <MDBCol size="5">
          <h5 className="text-center">Sort By </h5>

          {/* Sort Option */}
          <select
            value={sortValue}
            style={{
              marginLeft: "130px",
              width: "50%",
              borderRadius: "4px",
              height: "35px",
              borderColor: "lightgray"
            }}
            onChange={onSortChange}
          >
            <option value="" hidden>Please select a Sort option</option>
            {sortOptions.map((option, index) => (
              <option key={index}>
                {option}
              </option>
            )
            )}
          </select>
        </MDBCol>

        <MDBCol size="2">
        </MDBCol>

        <MDBCol end size="4">
          <h5 style={{ marginLeft: "30px" }}>Filter By Status</h5>
          <MDBBtnGroup>
            <MDBBtn
              color="success"
              style={{ marginRight: "8px" }}
              onClick={() => onFilterChange("Active")}
            >
              Active
            </MDBBtn>
            <MDBBtn
              color="danger"
              onClick={() => onFilterChange("In-Active")}
            >
              In-Active
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Home


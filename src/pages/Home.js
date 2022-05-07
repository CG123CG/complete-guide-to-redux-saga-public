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
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from 'mdb-react-ui-kit'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'


function Home() {

  const dispatch = useDispatch()

  //Get data/users from the Store
  //In rootReducer, usersReducer has data key, data: usersReducer
  //In usersReducer, STATE is users: []
  const { users, error, pageLimit, currentPage, paginationMode } = useSelector(store => store.data)

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
      //Added NEW to navigate to Home page
      setTimeout(
        () => dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0 })),
        200
      )
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
    //Added start, end, currentPage for pagination
    dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0 }))
  }, []
  )

  //Added for Pagination
  const renderPagination = () => {
    //page-1 for 10 users, 4 rendered at a time as pageLimit = 4 
    //currentPage = 0, default value starts at 0
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: 4,
                  end: 8,
                  currentPage: 1
                })
              )}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
    //page-2 for 10 users, 4 rendered at a time as pageLimit = 4
    //currentPage = 1
    //else if (currentPage < pageLimit - 1 && users.length === pageLimit)
    //OWN
    else if (users.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: (currentPage - 1) * 4, //0
                  end: currentPage * 4, //4
                  currentPage: -1
                })
              )}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: (currentPage + 1) * 4, //8
                  end: (currentPage + 2) * 4, //12
                  currentPage: 1
                })
              )}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
    //Last page
    //page-3 for 10 users, 4 rendered at a time as pageLimit = 4
    //currentPage = 2
    else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: (currentPage - 1) * 4, //4
                  end: currentPage * 4, //8
                  currentPage: -1
                })
              )}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }



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

          {/* //Check for Search if no matching user found */}
          {users.length === 0 ?
            (
              <MDBTableBody className="align-center mb-0">
                <tr>
                  <td colSpan={8} className="text-center mb-0">No records found</td>
                </tr>
              </MDBTableBody>
            )
            :
            (
              //NEW CONCEPT to use &&
              users && users.map((user, index) => (
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
              ))
            )
          }
        </MDBTable>

        {/* //Pagination */}
        {/* //Pagination displays only for Home Page*/}
        {paginationMode &&
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "200px",
              alignContent: "center"
            }}
          >
            {renderPagination()}
          </div>
        }
      </div>

      {/* //Do not show Sort & Filter if no records are found */}
      {users.length > 0 && (

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

      )}

    </MDBContainer>
  )
}

export default Home


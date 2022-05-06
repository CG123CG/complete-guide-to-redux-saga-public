import React, { useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchUserStart, loadUsersStart } from '../redux/actions'


function NavBar() {
    //Extract currentPage from the STORE to use for RESET
    const { currentPage } = useSelector(store => store.data)

    //Added for Fixed Search box issue 
    const location = useLocation()
    const { pathname } = location
    //console.log("location is ", location)
    //console.log("pathname is ", pathname)

    const [showBasic, setShowBasic] = useState(false)

    //Added for Search
    const [searchTerm, setSearchTerm] = useState("")

    //Dispatch reference
    const dispatch = useDispatch()

    //Handler for search form
    const handleSubmit = (event) => {
        //Prevent Browser's default behavior for refresh upon submit
        event.preventDefault()
        //Dispatch Action for the serach term
        dispatch(searchUserStart(searchTerm))
        setSearchTerm("")
    }

    //Handler for RESET button
    const handleReset = () => {
        //console.log("currentPage is", currentPage)
        //Before Pagination
        //dispatch(loadUsersStart())
        //After Pagination
        //dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0 }))
        //OWN Fix
        dispatch(loadUsersStart({ start: 0, end: 4, currentPage: -currentPage }))
    }


    return (
        <>
            <MDBNavbar expand="lg" light bgColor="primary">
                <MDBContainer fluid>
                    <MDBNavbarBrand className="text-white">
                        <span style={{ marginRight: "10px" }}>
                            <MDBIcon fas icon="book-open" />
                        </span>
                        Contact Directory
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls='navbar'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        className="text-white"
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">

                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink to="/" className="text-white">
                                        Home
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink to="/addUser" className="text-white">
                                        Add User
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink className="nav-link">
                                    <NavLink to="/about" className="text-white">
                                        About
                                    </NavLink>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>

                        {/* //OWN find + fix
                        //Conditional check added to not show Search if not Home page */}
                        {pathname !== "/" ? "" :
                            <form
                                style={{ width: "500px" }}
                                className="d-flex input-group"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Search term"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                >
                                </input>
                                <MDBBtn
                                    color="dark"
                                    type="submit"
                                >
                                    Search
                                </MDBBtn>

                                <MDBBtn
                                    className="mx-2"
                                    color="warning"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    RESET
                                </MDBBtn>
                            </form>
                        }

                    </MDBCollapse>

                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default NavBar


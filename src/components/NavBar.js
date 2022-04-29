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
import { useDispatch } from 'react-redux'
import { searchUserStart } from '../redux/actions'


function NavBar() {

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
                                className="d-flex input-group w-auto"
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
                                <MDBBtn color="dark" type="submit">Search</MDBBtn>
                            </form>
                        }

                    </MDBCollapse>

                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default NavBar


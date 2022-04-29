import React from 'react'
import { MDBTypography } from 'mdb-react-ui-kit'

function About() {
    return (
        <div className="row justify-content-center"
            style={{ marginTop: "100px" }}
        >
            <MDBTypography
                className="col-sm-5"
                note
                noteColor="primary"
            >
                <li>This is Full CRUD Application developed in React JS</li>
                <li>All CRUD operations are performed using Redux-Saga</li>
                <li>Routing is provided using react-router-dom</li>
                <li>MDBBootstrap 5 is used to build the UI components</li>
            </MDBTypography>
        </div>
    )
}

export default About

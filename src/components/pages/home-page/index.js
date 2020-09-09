import React from 'react'
import { Link } from "react-router-dom"
import "./home-page.css"

const HomePage = () => {

    return (
        <main className="home">
            <div className="title-btn-container">
            <h1 className="title">Want to ride?</h1>
                <Link to="/signup" ><p className="btn btn-primary large">Join our riding events</p></Link>
            </div>
        </main>
    )
}

export default HomePage 
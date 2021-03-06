import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import BriefAbout from '../common/brief-about'
import './registration-page.css'

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's homepage
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <div  className="registration-page">
            <Navbar/>
            <main className= "registration-page-main">
                <BriefAbout/>
                <RegistrationForm />
            </main>
            <Footer/>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
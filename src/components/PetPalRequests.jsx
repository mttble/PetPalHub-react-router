import React, { useState, useContext } from 'react';
import './PetPalRequests.css';
import { Button } from 'react-bootstrap'
import { UserContext } from '../Context/userContext';

function PetPalRequests() {

    const userContext = useContext(UserContext);

    const [bookingInfo, setBookingInfo] = useState({
        startDate: '',
        endDate: '',
        dropOffTime: '',
        pickUpTime: '',
        selectedPets: [],
        message: '',
    });

    const handleDeleteRequest = (e) => {
        e.preventDefault();
        // Do nothing for now
    };

    const handleDenyRequest = (e) => {
        e.preventDefault();
        // Do nothing for now
    };

    const handleApproveRequest = (e) => {
        e.preventDefault();
        // Do nothing for now
    };
    
    if (userContext.user) {
        if (userContext.user.role === 'user') {
            return (
                <div className="pet-pal-request-box-card">
                    <h2>PetPal Request</h2>
                    <h3>Booking For: </h3>
                    <div className="pet-pal-request-container-card">
                        <h5>For Pets:</h5>
                        <p>Display selected pets here</p>
                    </div>
                    <div className="pet-pal-request-container-card">
                        <h5>For Dates:</h5>
                        <p>Start Date: {bookingInfo.startDate}</p>
                        <p>End Date: {bookingInfo.endDate}</p>
                    </div>
                    <div className="pet-pal-request-container-card">
                        <h5>For Time:</h5>
                        <p>Pick-up time: {bookingInfo.pickUpTime}</p>
                        <p>Drop-off time: {bookingInfo.dropOffTime}</p>
                    </div>
                    <div className="pet-pal-request-textarea-container-card">
                        <label className="pet-pal-request-centered-label">
                        Message/Care Instructions:
                        </label>
                        <p>{bookingInfo.message}</p>
                    </div>
                    <div>
                        <Button className="size-sm-lg btn btn-danger" onClick={() => handleDeleteRequest()}>Delete Request</Button>
                    </div>
                </div>
            );
        } else if (userContext.user.role === 'carer') {
            return (
                <div className="pet-pal-request-box-card">
                    <h2>PetPal Request</h2>
                    <h3>Booking For: </h3>
                    <div className="pet-pal-request-container-card">
                        <h5>For Pets:</h5>
                        <p>Display selected pets here</p>
                    </div>
                    <div className="pet-pal-request-container-card">
                        <h5>For Dates:</h5>
                        <p>Start Date: {bookingInfo.startDate}</p>
                        <p>End Date: {bookingInfo.endDate}</p>
                    </div>
                    <div className="pet-pal-request-container-card">
                        <h5>For Time:</h5>
                        <p>Pick-up time: {bookingInfo.pickUpTime}</p>
                        <p>Drop-off time: {bookingInfo.dropOffTime}</p>
                    </div>
                    <div className="pet-pal-request-textarea-container-card">
                        <label className="pet-pal-request-centered-label">
                        Message/Care Instructions:
                        </label>
                        <p>{bookingInfo.message}</p>
                    </div>
                    <div>
                        <Button className="size-sm-lg btn" onClick={() => handleApproveRequest()}>Approve</Button>
                        <Button className="size-sm-lg btn btn-danger" onClick={() => handleDenyRequest()}>Deny</Button>
                    </div>
                </div>
            )
        }
    } else return (
        <div className='dashboard-welcome'>Page not displayed</div>
    )
}

export default PetPalRequests;

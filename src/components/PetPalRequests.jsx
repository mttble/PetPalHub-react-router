import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './PetPalRequests.css';
import { Button } from 'react-bootstrap';
import { UserContext } from '../Context/userContext';


function PetPalRequests() {
    const userContext = useContext(UserContext);
    
    const [bookings, setBookings] = useState([]);
    const [petNames, setPetNames] = useState({});

    useEffect(() => {
        const fetchPetNames = async () => {
            const petIds = new Set();
            bookings.forEach(booking => {
                booking.petIds.forEach(id => petIds.add(id));
            });

            const promises = Array.from(petIds).map(async id => {
                const response = await axios.get(`/pet/pet-profiles/${id}`);
                if (response.status === 200) {
                    return { id, name: response.data.petName };
                } else {
                    console.error('Failed to fetch pet data:', response.data);
                    return { id, name: `Unknown (${id})` };
                }
            });

            const petData = await Promise.all(promises);
            const newPetNames = {};
            petData.forEach(pet => {
                newPetNames[pet.id] = pet.name;
            });

            setPetNames(newPetNames);
        };

        fetchPetNames();
    }, [bookings]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (userContext.user && userContext.user._id) {
                    const response = await axios.get('user//bookings', {
                        params: {
                            userId: userContext.user._id, 
                        },
                    });
                    if (response.status === 200) {
                        setBookings(response.data);
                    } else {
                        console.error('Failed to fetch booking data:', response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookings();
    }, [userContext.user]);

    const handleDeleteRequest = (bookingId) => {
        // logic to delete booking by its ID
    };

    const handleDenyRequest = (bookingId) => {
        // logic to deny booking by its ID
    };

    const handleApproveRequest = (bookingId) => {
        // logic to approve booking by its ID
    };

    if (userContext.user) {
        return (
            <div>
                {bookings.map(booking => (
                    <div className="pet-pal-request-box-card" key={booking._id}>
                        <h2>PetPal Request</h2>
                        <h3>Booking For: </h3>
                        <div className="pet-pal-request-container-card">
                            <h5>For Pets:</h5>
                            <p>{booking.petIds.map(id => petNames[id] || 'Loading...').join(', ')}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Dates:</h5>
                            <p>Start Date: {booking.startDate}</p>
                            <p>End Date: {booking.endDate}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Time:</h5>
                            <p>Pick-up time: {booking.pickUpTime}</p>
                            <p>Drop-off time: {booking.dropOffTime}</p>
                        </div>
                        <div className="pet-pal-request-textarea-container-card">
                            <label className="pet-pal-request-centered-label">
                            Message/Care Instructions:
                            </label>
                            <p>{booking.message}</p>
                        </div>
                        {userContext.user.role === 'user' && (
                            <div>
                                <Button className="size-sm-lg btn btn-danger" onClick={() => handleDeleteRequest(booking._id)}>Delete Request</Button>
                            </div>
                        )}
                        {userContext.user.role === 'carer' && (
                            <div>
                                <Button className="size-sm-lg btn" onClick={() => handleApproveRequest(booking._id)}>Approve</Button>
                                <Button className="size-sm-lg btn btn-danger" onClick={() => handleDenyRequest(booking._id)}>Deny</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className='dashboard-welcome'>Page not displayed</div>
        );
    }
}

export default PetPalRequests;

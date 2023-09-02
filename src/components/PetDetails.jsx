import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useParams } from 'react-router-dom';




function PetDetails() {
    const { petId } = useParams();
    const [petDetails, setPetDetails] = useState(null)

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await axios.get(`/pet/view/${petId}`);
                if (response.status === 200) {
                    setPetDetails(response.data);
                } else {
                    console.error('Failed to fetch pet details:', response.data);
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };
    
        fetchPetDetails();
    }, [petId]);

    if (!petDetails) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    return (
        <div className="view-pets-container-view">
            <h1>View Pets</h1>
            <div className="pets-list-view">
                <div className="pet-card-view" key={petDetails._id}>
                    <div className="pet-avatar-view">
                        {petDetails.petImage ? (
                            <img
                                src={`${petDetails.petImage}`}
                                alt="Profile"
                                className="avatar-preview1"
                            />
                            ) : (
                            <div className="placeholder-avatar">
                                <h3>No Pet Picture</h3>
                            </div>
                            )}
                    </div>
                    <div className="pet-details-view">
                        <h2>{petDetails.petName}</h2>
                        <p>Pet type: {petDetails.petType}</p>
                        <p>Breed: {petDetails.breed}</p>
                        <p>Age: {petDetails.age}</p>
                        <p>Gender: {petDetails.gender}</p>
                        <p>Medical Conditions: {petDetails.medicalConditions}</p>
                        <p>Emergency Contact: {petDetails.emergencyContact}</p>
                        <div className="special-instructions-view">
                            <h4>Special Instructions:</h4>
                            <p>{petDetails.specialInstructions}</p>
                        </div>
                        <div className="general-info-view">
                            <h4>General Info:</h4>
                            <p>{petDetails.general}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default PetDetails
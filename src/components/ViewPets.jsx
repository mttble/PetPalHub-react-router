import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/userContext';
import './ViewPets.css';
import { Button } from 'react-bootstrap';


const ViewPets = () => {
    const userContext = useContext(UserContext);

    const [petProfile, setPetProfile] = useState(null)

    useEffect(() => {
        const fetchPetProfile = async () => {
            try {
                if (userContext.user && userContext.user._id) {
                    const response = await axios.get('/pet/pet-profiles', {
                        params: {
                            userId: userContext.user._id, // Use user ID from context
                        },
                    });
                    if (response.status === 200) {
                        setPetProfile(response.data);
                    } else {
                        console.error('Failed to fetch pet profile data:', response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching pet profile data:', error);
            }
        };

        fetchPetProfile();
    }, [userContext.user]);

    const handleDeletePet = async (petId) => {
        try {
            const response = await axios.delete(`http://localhost:5505/pet/${petId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
    
            if (response.status === 200) {
                console.log('Pet deleted successfully.');
                window.location.reload();
            } else {
                console.error('Failed to delete pet:', response.data);
            }
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <div className="view-pets-container-view">
            <h1>View Pets</h1>
            <div className="pets-list-view">
                {petProfile ? (
                    petProfile.map((pet) => (
                        <div className="pet-card-view" key={pet._id}>
                            <div className="pet-avatar-view">
                                <img src={pet.petImageURL} alt="Pet Avatar-view" />
                            </div>
                            <div className="pet-details-view">
                                <h2>{pet.petName}</h2>
                                <p>Pet type: {pet.petType}</p>
                                <p>Breed: {pet.breed}</p>
                                <p>Age: {pet.age}</p>
                                <p>Gender: {pet.gender}</p>
                                <p>Medical Conditions: {pet.medicalConditions}</p>
                                <p>Emergency Contact: {pet.emergencyContact}</p>
                                <div className="special-instructions-view">
                                    <h4>Special Instructions:</h4>
                                    <p>{pet.specialInstructions}</p>
                                </div>
                                <div className="general-info-view">
                                    <h4>General Info:</h4>
                                    <p>{pet.general}</p>
                                </div>
                            </div>
                            <Button className="size-sm-lg btn btn-danger" onClick={() => handleDeletePet(pet._id)}>Delete</Button>
                        </div>
                    ))
                ) : (
                    <p>Loading pet profile data...</p>
                )}
            </div>
        </div>
    );
}

export default ViewPets

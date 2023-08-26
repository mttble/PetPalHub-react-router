import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import './CreateProfile.css';


const CreatePet = ({ onCreatePet }) => {
    const userContext = useContext(UserContext)
    const [avatar, setAvatar] = useState(null)

    const [pet, setPet] = useState({
        petName: '',
        breed: '',
        age: '',
        gender: '',
        medicalConditions: '',
        emergencyContact: '',
        specialInstructions: '',
        general: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPet((prevProfile) => ({
        ...prevProfile,
        [name]: value,
        }));
    };

    
    
    const handleAvatarUpload = (event) => {

    }

    
    const handleCreateProfile = async () => {
        try {
        // Make a POST request to the backend with the profile data
        const response = await axios.post('/carer/profile', profile);
    
        if (response.status === 201) {
            console.log(response.data.message);
            navigate('/view-profile');
        } else {
            console.error('Failed to create profile:', response.data);
        }
        } catch (error) {
        console.error('Error creating profile:', error, error.response.data);
        }
    
    }


    if (userContext.user) {
        if (userContext.user.role === 'user') {
        return (
            <div className="create-profile-box">
            <div className="create-profile-title">
                <h1>Add Pet</h1>
            </div>

            <div className='profile-avatar'>
                {avatar ? (
                <img src={avatar} alt="Profile Avatar" className="avatar" />
                ) : (
                <div>
                <h3>Profile Avatar</h3>
                </div>
                )}
            </div>

            <div className="upload-avatar">
                <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                />
            </div>


            <div className="create-profile-heading">
                <h4>Pet Profile</h4>
            </div>
            <div>
                <label htmlFor="petName">Pet name:</label>
                <input value={ pet.petName } onChange={(e) => setPet({...pet, petName: e.target.value})} type="petName" placeholder="name" id="petName" name="petName"/>
                <label htmlFor="breed">Breed:</label>
                <input value={ pet.breed } onChange={(e) => setPet({...pet, breed: e.target.value})} type="breed" placeholder="breed" id="breed" name="breed"/>
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input value={ pet.age } onChange={(e) => setPet({...pet, age: e.target.value})} type="age" placeholder="age" id="age" name="age"/>
                <label htmlFor="gender">Gender:</label>
                <select value={pet.gender} onChange={(e) => setPet({ ...pet, gender: e.target.value })} id="gender" name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="medicalConditions">Medical conditions:</label>
                <input value={ pet.medicalConditions } onChange={(e) => setPet({...pet, medicalConditions: e.target.value})} type="medicalConditions" placeholder="medical conditions" id="medicalConditions" name="medicalConditions"/>
                <label htmlFor="emergencyContact">Emergency contact:</label>
                <input value={ pet.emergencyContact } onChange={(e) => setPet({...pet, emergencyContact: e.target.value})} type="emergencyContact" placeholder="emergency contact" id="emergencyContact" name="emergencyContact"/>

            </div>



            <div className="create-profile-heading">
                <h5>Special Instructions (eg. Diet, Veterinary info)</h5>
            </div>
            <div className='create-profile-textarea-container'>
                <textarea
                className="create-profile-textarea"
                name="specialInstructions"
                value={pet.specialInstructions}
                onChange={handleInputChange}
                />
            </div>


            <div className="create-profile-heading">
                <h5>General Info (Temperament, exercise/energy)</h5>
            </div>
            <div className='create-profile-textarea-container'>
                <textarea
                className="create-profile-textarea"
                name="general"
                value={pet.general}
                onChange={handleInputChange}
                />
            </div>


            <div className="create-profile-submit-button">
                <button variant="primary" className="size-sm-lg btn btn-primary" onClick={handleCreateProfile}>Add Pet</button>
            </div>
            </div>
        );
        }
        else return (
        <h1>Hello</h1>
        )
        
    }
}

export default CreatePet;

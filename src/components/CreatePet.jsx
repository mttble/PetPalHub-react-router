import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import './CreatePet.css';


const CreatePet = ({ onCreatePet }) => {
    const userContext = useContext(UserContext)
    const [avatar, setAvatar] = useState(null)

    const [pet, setPet] = useState({
        petName: '',
        petType: 'Dog',
        breed: '',
        age: '',
        gender: 'Male',
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
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setAvatar(file);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePet = async () => {
        try {
            const formData = new FormData();
            console.log(avatar)

            // Append each pet key-value to the formData
            for (const key in pet) {
                if (Array.isArray(pet[key])) {
                    pet[key].forEach(item => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, pet[key]);
                }
            }
    
            // Append the avatar image if available
            if (avatar) {
                formData.append('petImage', avatar);
            }

            const userData = JSON.parse(localStorage.getItem('userData')); // Get user data from local storage
            if (userData && userData._id) {
                formData.append('ownerId', userData._id); // Include owner's ID in the form data
            }
            console.log(formData);
            const response = await axios.post('http://localhost:5505/pet/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                console.log(response.data.message);
                navigate('/view-pets');
            } else {
                console.error('Failed to create pet:', response.data);
            }
        } catch (error) {
            console.error('Error creating pet:', error, error.response.data);
        }
    }



    if (userContext.user) {
        if (userContext.user.role === 'user') {
        return (
            <div className="create-profile-box">
                <div className="create-profile-title">
                    <h1>Add Pet</h1>
                </div>
            

            <div className='avatar-preview'>
                {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Pet Avatar" />
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
                    <h4>Pet Type</h4>
                </div>
            <div>
                <label htmlFor="petType">Pet type:</label>
                <select value={pet.petType} onChange={(e) => setPet({ ...pet, petType: e.target.value })} id="petType" name="petType">
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
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
                <button variant="primary" className="size-sm-lg btn btn-primary" onClick={handleCreatePet}>Add Pet</button>
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

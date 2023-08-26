import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

const ProfileCard = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchRandomCarerProfile = async () => {
            try {
                const response = await axios.get('/carer/random-profile');
                if (response.status === 200) {
                    setProfileData(response.data);
                } else {
                    console.error('Failed to fetch random carer profile:', response.data);
                }
            } catch (error) {
                console.error('Error fetching random carer profile:', error);
            }
        };

        fetchRandomCarerProfile();
    }, []);


    const handleBookNowClick = () => {

    };

    return (
    <div className="create-profile-box">
        {profileData ? (
        <div>
            <div className="profile-info">
                <div className="profile-image">
                    {profileData.profileImage ? (
                    <img
                        src={`http://localhost:5505${profileData.profileImage}`}
                        alt="Profile"
                        className="avatar-preview-card"
                    />
                    ) : (
                    <div className="placeholder-avatar-card">
                        <h3>No Profile Picture</h3>
                    </div>
                    )}
                </div>
                    <div className="company-name">
                        <h3>{profileData.companyFullName}</h3>
                        <h5 className="profile-heading">Pet Types:</h5>
                        <ul>
                            {profileData.petType.map((type, index) => (
                            <li key={index}>{type}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            
                <div className="profile-details">
                    <div className="left-column">
                        <div className="profile-section">
                        <h5 className="profile-heading-card">About Me:</h5>
                        <p>{profileData.aboutMe}</p>
                        </div>
                        <div className="profile-section">
                        <h5 className="profile-heading-card">Experience:</h5>
                        <p>{profileData.experience}</p>
                        <h5 className="profile-heading-card">Location:</h5>
                        <p>{profileData.location}</p>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="profile-section">
                        <h5 className="profile-heading-card">Additional Services:</h5>
                        <ul>
                            {profileData.additionalServices.map((service, index) => (
                            <li key={index}>{service}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="primary" className="size-sm-lg" onClick={handleBookNowClick}>
                        Book Now
                    </Button>
                </div>
            
        </div>
        ) : (
        <p>Loading profile data...</p>
        )}
    </div>
    );
};

export default ProfileCard;
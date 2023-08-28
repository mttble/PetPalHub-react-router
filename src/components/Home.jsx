import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [profileData, setProfileData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 2;

    useEffect(() => {
        const fetchCarerProfiles = async () => {
            try {
                const response = await axios.get('/carer/carer-profiles');
                if (response.status === 200) {
                    setProfileData(response.data);
                } else {
                    console.error('Failed to fetch carer profiles:', response.data);
                }
            } catch (error) {
                console.error('Error fetching carer profiles:', error);
            }
        };
        fetchCarerProfiles();
    }, []);

    const handleBookNowClick = (profile) => {
        console.log('Book Now clicked for:', profile);
        navigate('/booking-form', { state: { selectedProfile: profile } });
    };

    const filteredProfiles = profileData.filter((profile) => {
        const searchWords = searchTerm.toLowerCase().split(' ');
        return searchWords.every((word) =>
            profile.companyFullName.toLowerCase().includes(word) ||
            profile.location.toLowerCase().includes(word)
        );
    });

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="main-container">
            <div className="dashboard-welcome-container">
                {userContext.user ? (
                    <h1 className="dashboard-welcome">Welcome to PetPal Hub, {userContext.user.firstName}!</h1>
                ) : (
                    <h1 className="dashboard-welcome">Welcome to PetPal Hub</h1>
                )}
            </div>

            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="pagination">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>

            <div className="profile-cards">
                {currentProfiles.length > 0 &&
                    currentProfiles.map((profile, index) => (
                        <div key={index} className="create-profile-box-card">
                            <div className="profile-info-card">
                                <div className="profile-image-card">
                                    {profile.profileImage ? (
                                        <img
                                            src={`http://localhost:5505${profile.profileImage}`}
                                            alt="Profile"
                                            className="avatar-preview-card"
                                        />
                                    ) : (
                                        <div className="placeholder-avatar-card">
                                            <h3>No Profile Picture</h3>
                                        </div>
                                    )}
                                </div>
                                <div className="company-name-card">
                                    <h3>{profile.companyFullName}</h3>
                                    <h5 className="profile-heading-card">Pet Types:</h5>
                                    <ul>
                                        {profile.petType.map((type, index) => (
                                            <li key={index}>{type}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="profile-details-card">
                                <div className="left-column-card">
                                    <div className="profile-section-card">
                                        <h5 className="profile-heading-card">About Me:</h5>
                                        <p>{profile.aboutMe}</p>
                                    </div>
                                    <div className="profile-section-card">
                                        <h5 className="profile-heading-card">Experience:</h5>
                                        <p>{profile.experience}</p>
                                        <h5 className="profile-heading-card">Location:</h5>
                                        <p>{profile.location}</p>
                                    </div>
                                </div>
                                <div className="right-column-card">
                                    <div className="profile-section-card">
                                        <h5 className="profile-heading-card">Additional Services:</h5>
                                        <ul>
                                            {profile.additionalServices.map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button variant="primary" className="size-sm-lg-card" onClick={() => handleBookNowClick(profile)}>
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;

import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/userContext';
import axios from 'axios';



const ViewPets = () => {
    const userContext = useContext(UserContext);

    return (
        <div>
            <h1>View Pets</h1>
        </div>
    )
}

export default ViewPets


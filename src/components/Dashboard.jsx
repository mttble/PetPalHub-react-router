import { useContext } from 'react';
import { UserContext } from '../Context/userContext.jsx';

import './Dashboard.css'

const Dashboard = () => {
    const userContext = useContext(UserContext);

    const handleLogout = () => {
        userContext.logout(); // Call the logout function from context
    };

    if (userContext.user) {
        if (userContext.user.role === 'user') {
            return (
                <div className='dashboard-welcome'>
                    <h1>hello {userContext.user.firstName}, you are a user</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                
            );
        } else if (userContext.user.role === 'carer') {
            return (
                <div className='dashboard-welcome'>
                    <h1>hello {userContext.user.firstName}, you are a carer</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            );
        }
    }

    return <div className='dashboard-welcome'>Page not displayed</div>;
};

export default Dashboard;
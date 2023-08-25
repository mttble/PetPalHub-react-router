import { useContext } from 'react';
import { UserContext } from '../Context/userContext.jsx';

import './Dashboard.css'

const Dashboard = () => {
    const userContext = useContext(UserContext);

    if (userContext.user) {
        if (userContext.user.role === 'user') {
            return (
                <div className='dashboard-welcome'>
                    <h1>hello {userContext.user.firstName}, you are a user</h1>
                </div>
                
            );
        } else if (userContext.user.role === 'carer') {
            return (
                <div className='dashboard-welcome'>
                    <h1>hello {userContext.user.firstName}, you are a carer</h1>
                </div>
            );
        }
    }

    return <div className='dashboard-welcome'>Page not displayed</div>;
};

export default Dashboard;
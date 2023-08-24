import { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import './Dashboard.css'

export default function Dashboard() {
    const {user} = useContext(UserContext)
    return (
        <div>
            {!!user && (<h2 className='dashboard-welcome'>Welcome {user.firstName}!</h2>)}
        </div>
    )
}

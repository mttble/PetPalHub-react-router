import { useContext } from 'react'
import { UserContext } from '../Context/userContext'

export default function Dashboard() {
    const {user} = useContext(UserContext)
    return (
        <div>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hello {user.firstName}!</h2>)}
        </div>
    )
}

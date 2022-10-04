import {useSelector} from 'react-redux'

const Profile = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Name: {user.profile.name}</p>
            <p>Email: {user.profile.email} </p>
        </div>
    )
}

export default Profile
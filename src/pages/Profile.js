import { useSelector } from "react-redux"
import Table from '../components/Table'

import ProfilePicture from '../components/ProfilePicture'
import Tr from '../components/Tr'


function Profile() {
    const userInfo = useSelector(state => state.user.info)
    return (
        <div className="custom-container text-center">
            <h1>My Profile</h1>
            <ProfilePicture size={160} />
            {userInfo && (
                <Table className="mt-3" striped bordered>
                    <Tr title="First Name" description={userInfo.firstName} />
                    <Tr title="Last Name" description={userInfo.lastName} />
                    <Tr title="Email" description={userInfo.email} />
                </Table>
            )}
        </div>
    )
}

export default Profile;
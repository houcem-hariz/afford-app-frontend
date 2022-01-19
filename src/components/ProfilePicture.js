import avatar from '../images/avatar.jpg'

function ProfilePicture({size, ...rest}) {
    return (
        <img 
            {...rest}
            src={avatar} 
            alt="profile-pic" 
            className="rounded-circle"
            width={size} 
            height={size} 
        />
    )
}

export default ProfilePicture
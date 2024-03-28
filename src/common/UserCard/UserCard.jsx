import "./UserCard.css"

export const UserCard = ({first_name, last_name, email}) => {

    return (
        <div className="userCardDesign">
            <div className="dataUser">{first_name}</div>
            <div className="dataUser">{last_name}</div>
            <div className="dataUser">{email}</div>
        </div>
    )
}
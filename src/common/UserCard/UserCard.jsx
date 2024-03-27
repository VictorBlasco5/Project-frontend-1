import "./UserCard.css"

export const UserCard = ({first_name, last_name, email}) => {

    return (
        <div className="card">
            <div className="userCardDesign">{first_name}</div>
            <div className="userCardDesign">{last_name}</div>
            <div className="userCardDesign">{email}</div>
        </div>
    )
}
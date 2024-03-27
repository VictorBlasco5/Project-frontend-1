import { useState, useEffect } from "react";
import "./Admin.css"
import { Header } from "../../common/Header/Header"
import { UserCard } from "../../common/UserCard/UserCard"
import { GetUsers } from "../../services/apiCalls";



export const Admin = () => {
    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const [users, setUsers] = useState([])
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)

    useEffect(() => {
        if (users.length === 0) {
            const recoverUsers = async () => {

                const fetched = await GetUsers(tokenStorage)
                setUsers(fetched.data)
            console.log(fetched.data)
        }
            recoverUsers()
        }
    }, [users])



    return (
        <>
            <Header />
            <div className="adminDesign">
                {users.length > 0 ? (
                    <div>
                        {
                            users.slice(0, 10).map(
                                user => {
                                    return (
                                        <UserCard
                                            first_name={user.first_name}
                                            last_name={user.last_name}
                                            email={user.email}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>You haven't users</div>
                )}
            </div>
        </>
    )
}

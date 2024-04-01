import { useState, useEffect } from "react";
import "./Admin.css"
import { Header } from "../../common/Header/Header"
import { UserCard } from "../../common/UserCard/UserCard"
import { DeleteUsers, GetUsers } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";

export const Admin = () => {
    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const [users, setUsers] = useState([])
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)

    useEffect(() => {
        if (users.length === 0) {
            const recoverUsers = async () => {
                try {

                    const fetched = await GetUsers(tokenStorage)
                    setUsers(fetched.data)

                } catch (error) {
                    console.log(error);
                }
            }
            recoverUsers()
        }
    }, [users])

    const userRemove = async (userId) => {
        try {
            await DeleteUsers(userId, tokenStorage)
            const updatedUsers = await GetUsers(tokenStorage);
            setUsers(updatedUsers.data);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div className="adminDesign"
                style={{
                    backgroundImage: `url(${('../../../img/fondo30.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}>
                {users.length > 0 ? (
                    <div className="positionCards">
                        {
                            users.slice(0, 100).map(
                                user => {
                                    return (
                                        <>
                                            <div>
                                                <UserCard
                                                    first_name={user.first_name}
                                                    last_name={user.last_name}
                                                    email={user.email}
                                                    functionEmit={() => userRemove(user.id)}
                                                />
                                                <CButton
                                                    className={"CButtonDesignCardUser"}
                                                    title={`Delete ${user.first_name}`}
                                                    functionEmit={() => userRemove(user.id)}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>LOADING</div>
                )}
            </div>
        </>
    )
}

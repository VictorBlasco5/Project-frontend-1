import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";

const datosUser = JSON.parse(localStorage.getItem("auth"))

export const Profile = () => {
    const navigate = useNavigate()
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })

    const [userError, setUserError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: "",
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {

    };

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {

        const getUserProfile = async () => {
            try {

                const fetched = await GetProfile(tokenStorage)

                setLoadedData(true)

                setUser({
                    first_name: fetched.data.first_name,
                    last_name: fetched.data.last_name,
                    email: fetched.data.email,
                })


            } catch (error) {
                console.log(error)
            }
        }

        if(!loadedData){ 
            getUserProfile()
        }

    }, [user])

    return <div className='profileDesign'>
        {
            !loadedData
                ? (<div>LOADING</div>)

                : (<div>
                    <CInput
                        className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""}`}
                        type={"text"}
                        placeholder={""}
                        name={"first_name"}
                        value={user.first_name || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <CInput
                        className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""}`}
                        type={"text"}
                        placeholder={""}
                        name={"last_name"}
                        value={user.last_name || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                      <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                        type={"email"}
                        placeholder={""}
                        name={"email"}
                        value={user.email || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />

                </div>)

        }

    </div>

}
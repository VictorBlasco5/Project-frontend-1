import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";

export const Profile = () => {
    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const navigate = useNavigate()
    const [change, setChange] = useState("disable")
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

        if (!loadedData) {
            getUserProfile()
        }

    }, [user])

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(tokenStorage, user)

            setChange("disabled")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className='profileDesign'
                style={{
                    backgroundImage: `url(${('../../../img/fondo30.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}
            >
                {!loadedData
                    ? (<div>LOADING</div>)

                    : (<div>
                        <CInput
                            className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"first_name"}
                            value={user.first_name || ""}
                            disabled={change}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"last_name"}
                            value={user.last_name || ""}
                            disabled={change}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CInput
                            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                            type={"email"}
                            placeholder={""}
                            name={"email"}
                            value={user.email || ""}
                            disabled={"disabled"}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CButton
                            className={"cButtonDesign"}
                            title={change === "" ? "Confirm" : "Edit"}
                            functionEmit={change === "" ? updateData : () => setChange("")}
                        />
                    </div>)}
            </div>
        </>
    )
}
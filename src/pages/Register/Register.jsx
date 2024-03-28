import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import "./Register.css"
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validation } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";


export const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""
    })

    const [userError, setUserError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: "",
        password_hashError: ""
    })

    const [msgError, setMsgError] = useState("")

    const imputHandler = (e) => {

        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value)
        // console.log(`estoy en ${e.target.name} y voy a comprobar si ${e.target.value} es valido`)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }


    const registerMe = async () => {

        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields must be completed");
                }
            }

            setMsgError("")

            const fetched = await RegisterUser(user);

            // console.log(fetched);
            setMsgError(fetched.message)

            setTimeout(() => {
                navigate("/")
            }, 1200)

        } catch (error) {
            setMsgError(error.message);
        }
    };


    return (
        <>
            <Header />
            <div className="registerDesign">

                <CInput
                    className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"First name"}
                    type={"text"}
                    name={"first_name"}
                    value={user.first_name || ""}
                    onChangeFunction={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.first_nameError}</div>
                <CInput
                    className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Last name"}
                    type={"text"}
                    name={"last_name"}
                    value={user.last_name || ""}
                    onChangeFunction={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.last_nameError}</div>
                <CInput
                    className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Email"}
                    type={"email"}
                    name={"email"}
                    value={user.email || ""}
                    onChangeFunction={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <CInput
                    className={`inputDesign ${userError.password_hashError !== "" ? "inputDesignError" : ""}`}
                    placeholder={"Password"}
                    type={"password"}
                    name={"password_hash"}
                    value={user.password_hash || ""}
                    onChangeFunction={(e) => imputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.password_hashError}</div>
                <CButton
                    className={"cButtonDesign"}
                    title={"Register"}
                    functionEmit={registerMe}
                />
                <div className="error">{msgError} </ div>
            </div>
        </>
    )
}
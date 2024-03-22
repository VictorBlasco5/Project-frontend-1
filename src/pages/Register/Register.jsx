import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import "./Register.css"
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";


export const Register = () => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: ""
    })

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordHashError: ""
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
        const error = validame(e.target.name, e.target.value)
        // console.log(`estoy en ${e.target.name} y voy a comprobar si ${e.target.value} es valido`)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"] : error,
        }))
    }


    const registerMe = async () => {

        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }

            setMsgError("")

            const fetched = await RegisterUser();

            console.log(fetched);

        } catch (error) {
            setMsgError(error.message);
        }
    };


    return (
        <div className="registerDesign">

            <CInput
                className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""}`}
                placeholder={"First name"}
                type={"text"}
                name={"firstName"}
                value={user.firstName || ""}
                onChangeFunction={(e) => imputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.firstNameError}</div>
            <CInput
                className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""}`}
                placeholder={"Last name"}
                type={"text"}
                name={"lastName"}
                value={user.lastName || ""}
                onChangeFunction={(e) => imputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
           <div className="error">{userError.lastNameError}</div>
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
                className={`inputDesign ${userError.passwordHashError !== "" ? "inputDesignError" : ""}`}
                placeholder={"Password"}
                type={"password"}
                name={"passwordHash"}
                value={user.passwordHash || ""}
                onChangeFunction={(e) => imputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.passwordHashError}</div>
            <CButton
                className={"cButtonDesign"}
                title={"Register"}
                functionEmit={registerMe}
            />
            <div className="error">{msgError} </ div>
        </div>
    )
}
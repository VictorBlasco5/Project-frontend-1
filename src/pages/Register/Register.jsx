import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import "./Register.css"


export const Register = () => {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""

    })

    const imputHandler = (e) => {

        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    return (
        <div className="registerDesign">
           
            <CInput
                className={"inputDesign"}
                placeholder={"First name"}
                type={"text"}
                name={"first_name"}
                value={user.first_name || ""}
                onChangeFunction={(e) => imputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                placeholder={"Last mame"}
                type={"text"}
                name={"last_name"}
                value={user.last_name || ""}
                onChangeFunction={(e) => imputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                placeholder={"Email"}
                type={"email"}
                name={"email"}
                value={user.email || ""}
                onChangeFunction={(e) => imputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                placeholder={"Password"}
                type={"password"}
                name={"password_hash"}
                value={user.password_hash || ""}
                onChangeFunction={(e) => imputHandler(e)}
            />
        </div>
    )
}
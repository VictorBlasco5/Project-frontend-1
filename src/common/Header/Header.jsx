import { Navigator } from "../Navigator/Navigator"
import "./Header.css"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const navigate = useNavigate();

    const logOut = () => {
        
        localStorage.removeItem("auth")
        navigate("/login");

    }

    const appointments = () => {

        navigate("/appointments")
    }

    return (
        <div className="headerDesign">
            <Navigator title={"Home"} destination={"/"} />

            {auth?.token ? (
                <div className="navBar">
    
                    <Navigator title={auth?.decoded?.firstName} destination={"/profile"} />
                    <div
                        onClick={appointments}> <Navigator title={"Appointments"} destination={"/appointments"} />
                    </div>
                    <div
                        onClick={logOut}> <Navigator title={"Log out"} destination={"/"} />
                    </div>
                    
                </div>
            ) : (
                <div className="navBar">
                    <Navigator title={"Register"} destination={"/register"} />
                    <Navigator title={"Login"} destination={"/login"} />
                </div>
            )}
        </div>
    )

}
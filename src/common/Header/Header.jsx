import { Navigator } from "../Navigator/Navigator"
import "./Header.css"


export const Header = () => {


    return (
        <div className="headerDesign">
            <Navigator title={"Home"} destination={"/"} />
            <Navigator title={"Register"} destination={"/register"} />
            <Navigator title={"Login"} destination={"/login"} />
        </div>
    )
}
import { Navigator } from "../Navigator/Navigator"
import "./Header.css"


export const Header = () => {


    return (
        <div className="headerDesign">
            <Navigator title={"Home"} destination={"/"} />
            <Navigator title={"register"} destination={"/register"} />
        </div>
    )
}
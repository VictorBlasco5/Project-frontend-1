import "./Home.css";
import { Header } from "../../common/Header/Header";
import tattoo1 from "../../../img/tattoo1.jpg";
import tattoo3 from "../../../img/tattoo3.jpg";
import tattoo4 from "../../../img/tattoo4.jpg";
import tattoo5 from "../../../img/tattoo5.jpg";

export const Home = () => {

    return (
        <>
            <Header />
            <div className="homeDesign"
                style={{
                    backgroundImage: `url(${('../../../img/fondo80.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}
                >
                <div className="textName">
                    INK-ARt
                </div>
                <div className="positionImg">
                    <img className="images" src={tattoo1} alt="Tattoo1" />
                    <img className="images" src={tattoo3} alt="Tattoo3" />
                    <img className="images" src={tattoo4} alt="Tattoo5" />
                    <img className="images" src={tattoo5} alt="Tattoo5" />

                </div>

            </div>
        </>
    )
}

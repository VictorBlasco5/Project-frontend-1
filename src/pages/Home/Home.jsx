import "./Home.css";
import { Header } from "../../common/Header/Header";

export const Home = () => {

    return (
        <>
            <Header />
            <div className="textName"
                style={{
                    backgroundImage: `url(${('../../../img/fondo5.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '98.7vw',
                    height: '88vh',
                }}
            >INK-ARt</div>
        </>
    )
}

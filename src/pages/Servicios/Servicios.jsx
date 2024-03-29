import { Header } from "../../common/Header/Header"
import "./Servicios.css"
import { useEffect, useState } from "react";
import { GetServices } from "../../services/apiCalls";
import { ServicesCard } from "../../common/ServicesCard/ServicesCard";

export const Services = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        if (services.length === 0) {
            const getAllServices = async () => {
                try {
                    const fetched = await GetServices()

                    setServices(fetched.data)
                    // console.log(fetched.data);

                } catch (error) {
                    console.log(error);
                }
            }
            getAllServices()
        }

    }, [services])

    return (
        <>
            <Header />
            <div
                className="homeDesign"
                style={{
                    backgroundImage: `url(${('../../../img/fondo30.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '98.7vw',
                    height: '88vh',
                }}>
                {services.length > 0 ? (
                    <div className="positionServicesCard">
                        {
                            services.slice(0, 10).map(
                                service => {
                                    return (
                                        <ServicesCard
                                            service_name={service.service_name}
                                            description={service.description}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>Los servicios están viniendo</div>
                )}
            </div>
        </>
    )
}
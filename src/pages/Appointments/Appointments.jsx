import { useState, useEffect } from "react";
import "./Appointments.css"
import { Header } from "../../common/Header/Header";
import { CreateAppointment, DeleteAppointments, GetAppointments, GetServices } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard";
import remove from "../../../img/delete1.png";


export const Appointments = () => {

    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [services, setServices] = useState([])
    const [appointmentsData, setAppointmentsData] = useState({
        appointment_date: "",
        service_id: ""
    })


    const appointmentInputHandler = (e) => {
        setAppointmentsData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {

        const getData = async () => {
            try {

                const fetched = await GetAppointments(tokenStorage)
                setAppointments(fetched.data.appointment)
                setLoadedData(true)
                // console.log(fetched.data)
                // console.log(appointments)

            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [appointments])


    useEffect(() => {
        if (services.length === 0) {
            const getData = async () => {
                try {

                    const fetched = await GetServices()
                    setServices(fetched.data)

                } catch (error) {
                    console.log(error)
                }
            }
            getData()
        }

    }, [services])

    const newAppointment = async () => {
        try {

            const create = await CreateAppointment(tokenStorage, appointmentsData)


        } catch (error) {
            console.log(error);
        }
    }

    const appointmentRemove = async (appointment) => {
        try {
            const fetched = await DeleteAppointments(appointment, tokenStorage)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div
                style={{
                    backgroundImage: `url(${('../../../img/fondo30.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '98.7vw',
                    height: '88vh',
                }}
            >
                <div className="appointmentsDesign">

                    <div className="appointmentsDesignLeft">
                        <CInput
                            className={"imputAppointmentsDesignDate"}
                            type={"datetime-local"}
                            placeholder={""}
                            name={"appointment_date"}
                            value={appointmentsData.appointment_date || ""}
                            disabled={""}
                            onChangeFunction={(e) => appointmentInputHandler(e)}
                        />
                        {
                            services.length > 0 
                                ? (
                                    <select className="imputAppointmentsDesign" name="service_id" onChange={(e) => appointmentInputHandler(e)} >
                                        {services.slice(0, 5).map(
                                            service => {
                                                return (
                                                    <>
                                                        <option value={`${service.id}`} >{service.service_name}</option>
                                                    </>
                                                )
                                            }
                                        )
                                        }
                                    </select>)
                                : (
                                    <p>The services are comming </p>
                                )
                        }
                        <CButton
                            className={"cButtonDesignAppointments"}
                            title={"New appointment"}
                            functionEmit={newAppointment}
                        />
                    </div>

                    {appointments.length > 0 ? (
                        <div>
                            {
                                appointments.slice(0, 10).map(
                                    appointment => {
                                        return (
                                            <>
                                                <div className="appointments">
                                                    <AppointmentCard
                                                        appointment_date={appointment.appointment_date}
                                                        service_id={appointment.service.service_name}
                                                    />
                                                    <div>
                                                        <CButton
                                                            className={"CButtonDesignDeleteAppointment"}
                                                            title={<img className="imgDeleteAppointments" src={remove} alt="Delete" />}
                                                            functionEmit={() => appointmentRemove(appointment.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                )
                            }
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    )
}



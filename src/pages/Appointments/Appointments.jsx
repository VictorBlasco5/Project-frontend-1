import { useState, useEffect } from "react";
import "./Appointments.css"
import { Header } from "../../common/Header/Header";
import { GetAppointments } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard";


export const Appointments = () => {
    // const [change, setChange] = useState("disable")
    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [appointmentsData, setAppointmentsData] = useState({
        appointment_date: "",
        service_id: ""
    })

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
        if (!loadedData) {
            getData()
        }
    }, [appointments])


    return (
        <>
            <Header />
            <div className="appointmentsDesign">

                <div className="appointmentsDesignLeft">
                    <CInput
                        className={"imputAppointmentsDesign"}
                        type={"date"}
                        placeholder={""}
                        name={"appointment_date"}
                        // value={""}
                        disabled={""}
                    />
                    <CInput
                        className={"imputAppointmentsDesign"}
                        type={"text"}
                        placeholder={""}
                        name={"service_id"}
                        // value={""}
                        disabled={""}
                    />
                    <CButton
                        className={"cButtonDesignAppointments"}
                        title={"Pedir cita"}
                    // functionEmit={}
                    />
                </div>

                {appointments.length > 0 ? (
                    <div>
                        {
                            appointments.slice(0, 10).map(
                                appointment => {
                                    return (
                                        <AppointmentCard
                                            appointment_date={appointment.appointment_date}
                                            service_id={appointment.service.service_name}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                ) : (
                    <div>You haven't appointments</div>
                )}



            </div>
        </>
    )
}



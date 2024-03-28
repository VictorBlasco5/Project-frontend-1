import { useState, useEffect } from "react";
import "./Appointments.css"
import { Header } from "../../common/Header/Header";
import { CreateAppointment, DeleteAppointments, GetAppointments } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard";


export const Appointments = () => {

    // const [dropdown, setDropdown] = useState(false)
    const datosUser = JSON.parse(localStorage.getItem("auth"))
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [appointments, setAppointments] = useState([])
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
        if (!loadedData) {
            getData()
        }
    }, [appointments])


    // const selectOption = (e) => {
    //     setDropdown(e.target.value)
    // }


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
            <div className="appointmentsDesign">

                <div className="appointmentsDesignLeft">
                    <CInput
                        className={"imputAppointmentsDesign"}
                        type={"date"}
                        placeholder={""}
                        name={"appointment_date"}
                        value={appointmentsData.appointment_date || ""}
                        disabled={""}
                        onChangeFunction={(e) => appointmentInputHandler(e)}
                    />
                    <CInput
                        className={"imputAppointmentsDesign"}
                        type={"text"}
                        placeholder={"Service number"}
                        name={"service_id"}
                        value={appointmentsData.service_id || ""}
                        disabled={""}
                        onChangeFunction={(e) => appointmentInputHandler(e)}
                    />

                    {/* intento de meterlo en un dropdown */}

                    {/* <div className={"imputAppointmentsDesign"}>
                        <select value={dropdown} onChange={selectOption}>
                            <option value="">Select service</option>
                            <option value={appointmentsData.service_id}>Personalized tattoo</option>
                            <option value="opcion1">Tattoos from the catalog</option>
                            <option value="opcion2">Restoration and rejuvenation work</option>
                            <option value="opcion3">Placement of piercings and dilators</option>
                            <option value="opcion3">Sales of piercings and other items</option>
                        </select>
                    </div> */}

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
                                                    title={ <img className="imgDeleteAppointments" src="../../../img/delete1.png" alt="Delete"/>}
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
                    <div>You haven't appointments</div>
                )}



            </div>
        </>
    )
}



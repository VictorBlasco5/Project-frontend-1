import { useState, useEffect } from "react";
import "./Appointments.css"
import { Header } from "../../common/Header/Header";
import { GetAppointments } from "../../services/apiCalls";


export const Appointments = () => {



    return(
        <>
        <Header />
        <div className="appointmentsDesign">
            APPOINTMENTS
        </div>
        </>
    )
    
}
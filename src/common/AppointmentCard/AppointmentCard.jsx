import "./AppointmentCard.css"

export const AppointmentCard = ({appointment_date, service_id}) => {

    return (
        <div className="appointmentCardDesign">
            <div>{appointment_date}</div>
            <div>{service_id}</div>
        </div>
    )
}
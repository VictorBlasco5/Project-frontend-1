import "./ServicesCard.css"

export const ServicesCard = ({service_name, description}) => {

    return (
        <div className="servicesCardDesign">
            <div className="cardTitle">{service_name}</div>
            <div className="card">{description}</div>
        </div>
    )
}

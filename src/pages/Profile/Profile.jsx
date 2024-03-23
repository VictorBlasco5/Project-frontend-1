import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";

const datosUser = JSON.parse(localStorage.getItem("auth"))

export const Profile = () => {
    const navigate = useNavigate()
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)

    useEffect(()=>{
        if(!tokenStorage){
            navigate("/")
        }
    }, [tokenStorage])

    return (
        <div className='profileDesign'>
            Soy {datosUser?.decoded?.firstName} 
        </div>
    )
}
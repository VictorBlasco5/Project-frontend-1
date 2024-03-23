import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile } from "../../services/apiCalls";

const datosUser = JSON.parse(localStorage.getItem("auth"))

export const Profile = () => {
    const navigate = useNavigate()
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""
    })

    useEffect(()=>{
        if(!tokenStorage){
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() =>{

        const getUserProfile = async () =>{
            try {

                const fetched = await GetProfile(tokenStorage)
                console.log(fetched)
            } catch (error){
                console.log(error)
            }
        }

        getUserProfile()
    }, [user])

    return (
        <div className='profileDesign'>
            Soy {datosUser?.decoded?.firstName} 
        </div>
    )
}
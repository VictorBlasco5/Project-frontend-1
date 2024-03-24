import { useEffect, useState } from "react";
import { CButton } from "../../common/CButton/CButton"
import { CInput } from "../../common/CInput/CInput"
import { validation } from "../../utils/functions";
import "./Login.css"
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt"
import { Header } from "../../common/Header/Header";

export const Login = () => {
  const datosUser = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

  const [accreditation, setAccreditation] = useState({
    email: "",
    password_hash: "",
  })

  const [accreditationError, setAccreditationError] = useState({
    emailError: "",
    password_hashError: "",
  })

  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  const inputHandler = (e) => {
    setAccreditation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validation(e.target.name, e.target.value);

    setAccreditationError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let elemento in accreditation) {
        if (accreditation[elemento] === "") {
          throw new Error("All fields must be completed");
        }
      }

      const fetched = await LoginUser(accreditation);
      console.log("fetched");
      console.log(fetched);

      const decoded = decodeToken(fetched.token)
      console.log("decoded");
      console.log(decoded);

      const auth = {
        token: fetched.token,
        decoded: decoded
      }

      localStorage.setItem("auth", JSON.stringify(auth))

      setMsgError(`Wellcome ${decoded.firstName}`)

      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="loginDesign">
        <CInput
          className={`inputDesign ${accreditationError.emailError !== "" ? "inputDesignError" : ""}`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          value={accreditation.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{accreditationError.emailError}</div>
        <CInput
          className={`inputDesign ${accreditationError.password_hashError !== "" ? "inputDesignError" : ""}`}
          type={"password"}
          placeholder={"Password"}
          name={"password_hash"}
          value={accreditation.password_hash || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{accreditationError.password_hashError}</div>
        <CButton
          className={"cButtonDesign"}
          title={"Login"}
          functionEmit={loginMe}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  )
}
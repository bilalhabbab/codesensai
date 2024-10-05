import { FirebaseServices, signInWithGooglePopup } from "../../Utils/firebase"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './login.css'
import { LoginBox } from '../../Comp/LoginBox'
import { BrowserView, MobileView } from 'react-device-detect'


  export const LoginPage = () => {

    let navigate = useNavigate();
    const logGoogleUser = async () => {
      await signInWithGooglePopup();
      navigate("/home")
    }

    const navigate_to_home = () => {
      navigate("/home")
    }

    useEffect(() => {
      FirebaseServices.is_logged_in().then((res) => {
        if (res) {
          navigate_to_home()
        }
      })
    });
    
    
    return (
    <>
    <MobileView>
        <div className="page-mobile">
          <LoginBox logGoogleUser={logGoogleUser}/>
        </div>
      </MobileView>
      <BrowserView>
        <div className="page-browser">
          <LoginBox className="loginBox" logGoogleUser={logGoogleUser}/>
        </div> 
      </BrowserView>
    </>
  )}
  
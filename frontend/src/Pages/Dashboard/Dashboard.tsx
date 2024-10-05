import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {NavBar} from "./NavigiationBar";
import {useEffect} from "react";


export const Dashboard: React.FC = (props) =>  {
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/"){
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {<NavBar></NavBar>}
        </>
    )
}

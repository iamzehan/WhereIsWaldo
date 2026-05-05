import {Outlet, useLocation} from "react-router-dom";
import TopBar from "../components/TopBar";
import {useScrollTo} from "../utils/hooks";

import { useEffect } from "react";
export default function MainLayout () {
    const location = useLocation();
    const {targetRef, scrollToTarget} = useScrollTo();
    useEffect(()=> scrollToTarget(), [location.pathname])
    return (
        <div className="flex flex-col">
            <TopBar/>
            <div className="flex flex-col" ref={targetRef}>
                <Outlet/>
            </div>
        </div>
    )
}
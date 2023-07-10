import { useState } from "react";
import { useDispatch } from "react-redux";
import { order_courses } from "../../../Redux/actions";

import styles from "./OrderBar.module.css"
//_________________________module_________________________
function OrderBar () {
    
    //states:
    const [showSideBar, setShowSideBar] = useState(false);
    const [showDropdownOne, setShowDropdownOne] = useState(false);
    const [showDropdownTwo, setShowDropdownTwo] = useState(false);

    //const:
    const dispatch = useDispatch();

    //functions:
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const toggleDropDownOne = () => setShowDropdownOne(!showDropdownOne)
    const toggleDropDownTwo = () => setShowDropdownTwo(!showDropdownTwo)

    const handleOrder = (value) => {
        if (value !== "") {
            dispatch(order_courses(value));
            setShowSideBar(true);
            setShowDropdownOne(false)
        }
    }

    //component:
    return (
        <div >
            <div  className={styles.buttonContainer}>
                <button className={styles.mainButton} onClick={toggleSideBar}>O R D E N A R</button>
            </div>
            {
                showSideBar && (
                    <>
                        <div className={styles.orderBarOverlay} onClick={toggleSideBar}/>
                        <aside className={styles.orderBarSidebar}>
                            <div className={styles.orderBarSection}>
                                <div >
                                <button onClick={() => {toggleDropDownOne("one")}}>ORDENAR POR NOMBRE</button></div>
                                    {
                                        showDropdownOne && (
                                            <ul>
                                                <li onClick={() => handleOrder("ABC+")}>Ascendente</li>
                                                <li onClick={() => handleOrder("ABC-")}>Descendente</li>
                                            </ul>
                                        )
                                    }
                            </div>
                            <div className={styles.orderBarSection}>
                                <label onClick={() => {toggleDropDownTwo("two")}}>ORDENAR POR PUNTUACION</label>
                                    {
                                        showDropdownTwo && (
                                            <ul>
                                                <li onClick={() => console.log("dispatch rating +")}>Más valorado</li>
                                                <li onClick={() => console.log("dispatch rating -")}>Menos valorado</li>
                                            </ul>
                                        )
                                    }
                            </div>
                        </aside>
                    </>
                )
            }
      </div>
    )
}

export default OrderBar;
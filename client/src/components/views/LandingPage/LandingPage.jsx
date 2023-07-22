import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./LandingPage.module.css";
import LoginForm from "../../datos/LoginForm/LoginForm";
import SignFreeForm from "../../datos/LoginForm/SignFreeForm";
import { images } from "./images";

//_________________________module_________________________
function LandingPage () {

    //states:
    const [backgroundImage, setBackgroundImage] = useState(0);

    //life-cycles:
    useEffect(() => {
        const interval = setInterval(() => {
        setBackgroundImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);


    //component:
    return (
        <main
            className={styles.container}
            style={{ backgroundImage: `url(${images[backgroundImage]})` }}
        >

        {/* FORM IZQUIERDA */}
            <div className={styles.container1}>
                <p className={styles.pF}>Acceso gratuito</p>
                <SignFreeForm className={styles.form}/>
            </div>

        {/* BANNER */}
            <h1 className={styles.h1}>
                BIENVENIDOS A{" "}
                <p className={styles.logo}>
                    {" "}
                    <img
                        className={styles.imgcat}
                        src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                        alt="banner"
                    />
                    PROGRAMMER'S GURU
                </p>
            </h1>

        {/* FORM DERECHA */}
            <div className={styles.container2}>
                <p className={styles.pS}>Acceso Para Suscriptores</p>

                <LoginForm className={styles.form}/>
            </div>
        </main>
    );
}

export default LandingPage;

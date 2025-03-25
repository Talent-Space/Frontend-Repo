import React from 'react'
import styles from "./feedbacks.module.css"
import UserInfo from '../UserInfo/UserInfo'

const Feedbacks = () => {
    return (
        <>
            <div
                className={`${styles.rightSide}`}
                style={{ backgroundColor: "#FFF" }}
            >
                <UserInfo />
                <h1>Feedbacks</h1>

            </div>

        </>
    )
}

export default Feedbacks
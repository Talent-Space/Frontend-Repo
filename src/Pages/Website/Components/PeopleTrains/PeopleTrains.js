import React from 'react'
import styles from "./peopleTrains.module.css"
import UserInfo from '../UserInfo/UserInfo'

const PeopleTrains = () => {
    return (
        <>
            <div
                className={`${styles.rightSide}`}
                style={{ backgroundColor: "#FFF" }}
            >
                <UserInfo />
                {/* Second section  */}
                <h1>PeopleTrains</h1>
                
            </div>

        </>
    )
}

export default PeopleTrains
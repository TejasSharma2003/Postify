import React from 'react'
import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <span class={styles.loader}></span>
    )
    {/* <div className={styles["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */ }
}

export default Spinner
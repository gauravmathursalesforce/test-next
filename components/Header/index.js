import React from 'react'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles['fixed-header']}>
            <div className={styles.container}>
                <nav>
                    <a className={styles.link} href="#">Home Feature branch hshshsh</a>
                    <a className={styles.link} href="#">About Menu change</a>
                    <a className={styles.link} href="#">Products</a>
                    <a className={styles.link} href="#">Services</a>
                    <a className={styles.link} href="#">Contact Us</a>
                </nav>
            </div>
        </div>
    )
}

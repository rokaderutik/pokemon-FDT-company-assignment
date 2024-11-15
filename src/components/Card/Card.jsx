/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import styles from "./Card.module.css";

const Card = forwardRef(function Card(props, ref) {
    const { name, pokemonNo, isOddRow } = props;


    return (
        <div 
            className={` ${styles.card} ${isOddRow ? styles.card_odd_row : ""} `} 
            ref={ref}
        >
            <div className={styles.avatar}></div>
            <h4 className={styles.hashtag_text}>#{pokemonNo}</h4>
            <div>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.type}>Type: Grass</p>
            </div>
        </div>
    );
});

export default Card;
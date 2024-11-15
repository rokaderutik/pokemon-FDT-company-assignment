/* eslint-disable react/prop-types */
import styles from "./Navigation.module.css";

/**
 * Navigation
 * @param {object} navigationLink
 * @param {Function} setUrl 
 * @returns 
 */

const Navigation = ({ navigationLink, setUrl }) => {

    const handlePrev = () => {
        if(navigationLink.prev) {
            setUrl(navigationLink.prev)
        }
    }

    const handleNext = () => {
        if(navigationLink.next) {
            setUrl(navigationLink.next)
        }
    }

    return (
        <div className={styles.button_container}>
            <button
                className={styles.button}
                onClick={handlePrev}
                disabled={navigationLink.prev === null}
            >
                Prev
            </button>
            <button
                className={styles.button}
                onClick={handleNext}
                disabled={navigationLink.next === null}
            >
                Next
            </button>
        </div>
    );
};

export default Navigation;
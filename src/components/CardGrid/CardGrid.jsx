/* eslint-disable react/prop-types */
import { useLayoutEffect, useRef, useState } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardGrid.module.css";


const CardGrid = ({ list, pokemonStartNo }) => {
    const gridRef = useRef(null);
    const cardRef = useRef(null);

    const [columnCount, setColumnCount] = useState(0);

    useLayoutEffect(() => {
        const updateColumnCount = () => {

            if (gridRef.current && cardRef.current) {
                const gridWidth = gridRef.current.offsetWidth;
                const cardWidth = cardRef.current.offsetWidth;

                let columns = Math.floor(gridWidth / cardWidth);

                // Adjust column gap between cards
                const colGap = (columns - 1) * 32; // Assume 32px gap between columns
                const totalCardWidth = columns * cardWidth;

                if (gridWidth < colGap + totalCardWidth) {
                    columns--;
                }

                setColumnCount(columns);
            }
        };

        // Call once on mount
        updateColumnCount();
        
        window.addEventListener("resize", updateColumnCount); // Add resize event listener

        return () => {
            window.removeEventListener("resize", updateColumnCount); // Clean up event listener
        };
    }, []);

    // console.log("grid", gridRef)
    // console.log("card", cardRef)
    // console.log("cnt", columnCount)


    return (
        <div className={styles.card_grid} ref={gridRef}>

            {/* for initial render to calculate card width */}
            {
                columnCount === 0 && <Card name={'dummy'} ref={cardRef} /> 
            }
            {
                columnCount > 0 &&
                list.map((item, ind) => {
                    return (
                        <Card 
                            key={item.name}
                            name={item.name}
                            pokemonNo={pokemonStartNo + ind + 1}
                            ref={ind === 0 ? cardRef : null}
                            isOddRow={Math.floor(ind/columnCount) % 2 === 0 ? false : true}
                        />
                    )
                })
            }
        </div>
    );
};

export default CardGrid;
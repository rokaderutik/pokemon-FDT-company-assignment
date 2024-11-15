import { useState, useEffect } from "react";
import CardGrid from "../CardGrid/CardGrid.jsx";
import Navigation from "../Navigation/Navigation.jsx";

const CardGridAndNavigation = () => {
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30");
    const [pokemonList, setPokemonList] = useState([]);
    const [navigationLink, setNavigationLink] = useState({
        prev: null,
        next: null
    });

    const urlObj = new URL(url);
    const [cardListStartNo, setCardListStartNo] = useState(0);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const res =  await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();

                if (data.results) {
                    setPokemonList(data.results);
                    setNavigationLink({
                        prev: data.previous,
                        next: data.next
                    });
                    setCardListStartNo(Number(urlObj.searchParams.get('offset')));
                }
            } catch (error) {
                console.log('Error in data fetching', error.message);
            }    
        }

        fetchPokemons();
    }, [url]);

    return (
        <>
            <CardGrid 
                list={pokemonList} 
                pokemonStartNo={cardListStartNo}    
            />
            <Navigation 
                navigationLink={navigationLink}
                setUrl={setUrl}
            />
        </>
    );
};

export default CardGridAndNavigation;
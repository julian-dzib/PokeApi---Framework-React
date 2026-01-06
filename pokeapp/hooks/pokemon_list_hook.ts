import { useEffect, useState } from "react";
import { Pokemon } from "@/data/pokemon";

//respuesta de la API
interface PokemonListResponse {
    name: string,
    url: string
}

//se establece el numero pokemons por pagina
const items_limit=10;

//hook para obtener la lista de pokemons
export const usePokemonList = () => {
    //estado para almacenar la lista de pokemons
    const [pokemonsList, setPokemonList] = useState<Pokemon[]>([]);
    //estado ppara mostrar el loader
    const [isLoading, setIsLoading] = useState(true);
    //estado para manejar la paginacion
    const [page, setPage] = useState(1);

    //useEffet
    //Obtener la lista cada que cambie la pagina
    useEffect(() => {
        const fetchPokemons = async () => {
            //Cambiar el estado del loader
            setIsLoading(true);
            try{
                const offset = (page - 1) * items_limit;

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${items_limit}&offset=${offset}`
                );

                const data = await response.json();


                //Mapear los resultados para obtener los pokemons
                const pokemonList: Pokemon[] = data.results.map(
                    (pokemon: PokemonListResponse) => {
                        //Obtener el id del pokemon a partir de la url
                        const id = Number(pokemon.url.split("/")[6]); 
                        return {
                            id,
                            name: pokemon.name,
                            url: pokemon.url,
                            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                        };
                        }
                    );

                    //Actualizar el estado de la lista de pokemons
                    setPokemonList(pokemonList);
            }catch(error){
                console.error("Error al obtener los pokemons", error);
            } finally{
                //Cambiar el estado del loader
                setIsLoading(false);
            }
        
        };
        fetchPokemons();
    
    }
    ,[page]); 


    //Retornar la lista de pokemons, el estado de carga la funcion para cambiar de pagina//
    return {
        pokemonsList,
        isLoading,
        page,
        setPage,
    };
}


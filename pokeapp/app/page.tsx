"use client";
import PokemonList from "@/components/pokemon_list/page";
import { Pokemon } from "@/data/pokemon";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true) ;


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await response.json();
        const pokemonList = data.results.map((pokemon: Pokemon)=>{
          const id = pokemon.url.split("/")[6];
          return {
            id: id,
            name: pokemon.name,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
        setPokemons(pokemonList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la lista de pokemones", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      {loading ? <p>Cargando Pokemones ..... </p>
      : <PokemonList pokemons={pokemons} />}
    </div>
    
  );
}

"use client";
import PokemonList from "@/components/pokemon_list/page";
import { usePokemonList } from "@/hooks/pokemon_list_hook";
import { useState } from "react";

export default function Home() {
  // usar el hook que se creo
  const { pokemonsList, isLoading, page, setPage } = usePokemonList();
  // buscador de pokemmons
  const [search, setSearch ]= useState("");

  //Definimos el filtrado de pokemones
  const filteredPokemons = pokemonsList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">Fernando Julian Puc Dzib</p>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-2 py-1 w-64"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">Cargando Pokemones...</p>
      ) : (
        <>
        
          <PokemonList pokemons={filteredPokemons}/>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="self-center font-medium">Página {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}

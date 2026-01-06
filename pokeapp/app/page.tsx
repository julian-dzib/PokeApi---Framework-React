"use client";
import PokemonList from "@/components/pokemon_list/page";
import { usePokemonList } from "@/hooks/pokemon_list_hook";

export default function Home() {
  // usar el hook que se creo
  const { pokemonsList, isLoading, page, setPage } = usePokemonList();

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Cargando Pokemones...</p>
      ) : (
        <>
          <PokemonList pokemons={pokemonsList} />

          {/* PAGINACIÓN */}
          <div className="flex justify-center gap-4 mt-6">
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

import { Pokemon } from "@/data/pokemon";
import Image from "next/image";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="text-center mt-8">
      <h2 className="text-4xl font-bold">Pokémon List</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="border rounded p-4 flex flex-col items-center"
          >
            <Image
              src={pokemon.imagen}
              alt={pokemon.name}
              width={128}
              height={128}
            />
            <span className="capitalize mt-2">{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;

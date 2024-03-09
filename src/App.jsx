import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PokemonCardComponent from "./components/PokemonCardComponent/PokemonCardComponent";
import Button from "./components/Button/Button";
function App() {
	const initialURL = "https://pokeapi.co/api/v2/pokemon";
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState([]);
	const [nextURL, setNextURL] = useState("");
	const [prevURL, setPrevURL] = useState("");

	useEffect(() => {
		const fetchPokemonData = async () => {
			//すべてのポケモンデータを取得
			const res = await getAllPokemon(initialURL);
			//各ポケモンの詳細を取得
			loadPokemon(res.results);
			setNextURL(res.next);
			setPrevURL(res.previous);
			setLoading(false);
		};
		fetchPokemonData();
	}, []);

	const loadPokemon = async (data) => {
		const _pokemonData = await Promise.all(
			data.map((pokemon) => {
				let pokemonRecord = getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemonData);
	};


	const handlePageChange = async(isNext) =>{
		
		const url = isNext ? nextURL : prevURL;
		if(!url) return;
		setLoading(true);
		
		const data = await getAllPokemon(url);
		await loadPokemon(data.results);
		setNextURL(data.next);
		setPrevURL(data.previous);
		setLoading(false);

	}

	return (
		<>
		<Navbar/>
		<div className='App'>
			{loading ? (
				<h1>ロード中・・・</h1>
			) : (
			<>
				<PokemonCardComponent pokemonData={pokemonData}/>
				<Button handleChange={handlePageChange} nextURL={nextURL} prevURL={prevURL}/>
			</>
			)}
		</div>
		</>
	);
}

export default App;

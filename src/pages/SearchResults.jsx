import { Grid, Container, Typography, LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { useState, useEffect } from "react";

const SearchResults = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const params = useParams();
	const navigate = useNavigate();

	const getMovies = async () => {
		try {
			console.log(
				`${process.env.REACT_APP_MOVIE_API_HOST}/SearchMovie/${process.env.REACT_APP_API_KEY}/${params.query}`
			);
			const res = await fetch(
				`${process.env.REACT_APP_MOVIE_API_HOST}/SearchMovie/${process.env.REACT_APP_API_KEY}/${params.query}`
			);
			const data = await res.json();
			// console.log(data.items.splice(0, 25));
			// setMovies(data.items.splice(0, 25));
			console.log(data.results);
			setMovies(data.results);
			setLoading(false);
		} catch {
			console.log("failed");
			setLoading(false);
			setTimeout(() => {
				navigate(`/search/${params.query}`);
			}, 5000);
		}
	};

	// const getMovies = () => {
	// 	console.log(
	// 		`${process.env.REACT_APP_MOVIE_API_HOST}/SearchMovie/${process.env.REACT_APP_API_KEY}/${params.query}`
	// 	);
	// 	fetch(
	// 		`${process.env.REACT_APP_MOVIE_API_HOST}/SearchMovie/${process.env.REACT_APP_API_KEY}/${params.query}`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			// console.log(data.items.splice(0, 25));
	// 			// setMovies(data.items.splice(0, 25));
	// 			console.log(data.items);
	// 			setMovies(data.items);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 			setLoading(false);
	// 			setTimeout(() => {
	// 				navigate(`/search/${params.query}`);
	// 			}, 3000);
	// 		});
	// };

	useEffect(() => {
		getMovies();
	}, [params.query]);

	return (
		<>
			<LinearProgress sx={{ visibility: !loading && "hidden" }} />

			<Container maxWidth="lg" sx={{ pt: 5 }}>
				<Typography
					variant="h5"
					sx={{
						textAlign: "center",
						borderBottom: 2,
						borderColer: "divider",
						pb: 2,
					}}
				>
					Results for "{params.query}"
				</Typography>

				<Grid container spacing={{ xs: 2, sm: 3 }} py={4} px={{ xs: 1, sm: 4 }}>
					{movies ? (
						movies.map((movie) => <Movie key={movie.id} movie={movie} />)
					) : (
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{
								width: "100%",
								pt: 4,
								textAlign: "center",
							}}
						>
							{loading ? "Searching..." : "No results"}
						</Typography>
					)}
				</Grid>
			</Container>
		</>
	);
};
export default SearchResults;

import { Grid, Container, Typography, LinearProgress } from "@mui/material";
import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const navigate = useNavigate();

	const getMovies = () => {
		fetch(
			`${process.env.REACT_APP_MOVIE_API_HOST}/MostPopularMovies/${process.env.REACT_APP_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.items.splice(0, 10));
				setMovies(data.items.splice(0, 10));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false);
				setTimeout(() => {
					navigate("/");
				}, 5000);
			});
	};

	useEffect(() => {

		getMovies();
	}, []);

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
					Trending Movies
				</Typography>

				<Grid container spacing={{ xs: 2, sm: 3 }} py={4} px={{ xs: 1, sm: 4 }}>
					{movies.length > 0 ? (
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
							{loading ? "Loading..." : "Failed"}
						</Typography>
					)}
				</Grid>
			</Container>
		</>
	);
};

export default Home;

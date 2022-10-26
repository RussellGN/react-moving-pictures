import { LinearProgress, Box, Container, Grid, Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material";
import placeholderImg from "../components/placeholderImage.png";

const Poster = styled("img")(({ theme }) => ({
	width: "20rem",
	display: "block",
	height: "25rem",
	objectFit: "cover",
	border: "solid 2px",
	borderColor: theme.palette.divider,
	borderRadius: "1rem",
	boxShadow: theme.shadows[1],
}));

const DetailItem = styled(Typography)(({ theme }) => ({
	marginLeft: theme.spacing(2),
	backgroundColor: theme.palette.secondary.main,
	borderRadius: theme.shape.borderRadius,
	padding: `${theme.spacing(0.05)} ${theme.spacing(1)}`,
	color: "whitesmoke",
}));

const Details = () => {
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState({});
	const params = useParams();
	const navigate = useNavigate();

	const getMovie = () => {
		fetch(
			`${process.env.REACT_APP_MOVIE_API_HOST}/Title/${process.env.REACT_APP_API_KEY}/${params.id}/FullActor,FullCast,Posters,Ratings,Wikipedia`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovie(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false);
				setTimeout(() => {
					navigate(`/details/${params.id}`);
				}, 5000);
			});
	};

	useEffect(() => {

		getMovie();
	}, [params.id]);

	return (
		<>
			<LinearProgress sx={{ visibility: !loading && "hidden" }} />

			<Container maxWidth="lg" sx={{ pt: 5 }}>
				<Grid container spacing={2} justifyContent="center">
					{movie.id ? (
						<>
							<Grid item xs={12} sm="auto">
								<Stack direction="row" justifyContent="center">
									<Poster
										src={movie.image !== "N/A" ? movie.image : placeholderImg}
										alt={movie.title}
									/>
								</Stack>
							</Grid>

							<Grid item xs={12} sm>
								<Stack
									direction="column"
									sx={{
										px: 1,
										height: "100%",
										justifyContent: "center",
									}}
								>
									<Typography variant="h4" pb={2} pl={1}>
										{movie.title}
									</Typography>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Release Date
										</Typography>

										<Typography sx={{ ml: 2 }} component="span" variant="body1">
											{new Date(movie.releaseDate).toDateString()}
										</Typography>
									</Stack>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Rating
										</Typography>
										{movie.imDbRating ? (
											<>
												<Rating
													name="read-only"
													value={Number(movie.imDbRating) / 2}
													readOnly
													precision={0.1}
													max={5}
													sx={{ ml: 2 }}
												/>
												<Typography
													component="span"
													variant="subtitle2"
													sx={{ ml: 3, fontSize: "80%" }}
												>
													({movie.imDbRatingVotes})
												</Typography>
											</>
										) : (
											<Typography
												sx={{ ml: 2 }}
												component="span"
												variant="body1"
											>
												No reviews
											</Typography>
										)}
									</Stack>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Genre
										</Typography>
										<Box sx={{ ml: 2 }}>
											{movie.genreList &&
												movie.genreList.map((genre) => (
													<DetailItem
														variant="body1"
														component="span"
														key={genre.key}
													>
														{genre.value}
													</DetailItem>
												))}
										</Box>
									</Stack>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Plot
										</Typography>
										<Typography
											variant="body1"
											component="span"
											sx={{
												backgroundColor: "divider",
												borderRadius: 1,
												ml: 2,
												p: 2,
											}}
										>
											{movie.plot}
										</Typography>
									</Stack>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Cast
										</Typography>
										<DetailItem variant="body1" component="span">
											{movie.stars}
										</DetailItem>
									</Stack>

									<Stack
										direction="row"
										alignItems="center"
										sx={{
											borderBottom: 1,
											borderColor: "divider",
											p: 1,
										}}
									>
										<Typography
											fontWeight="bold"
											component="span"
											variant="body1"
										>
											Content Rating
										</Typography>

										<DetailItem
											variant="body1"
											component="span"
											sx={{
												backgroundColor:
													movie.contentRating === "R" ||
													movie.contentRating === "18"
														? "firebrick"
														: "#b37700",
											}}
										>
											{movie.contentRating}
										</DetailItem>
									</Stack>
								</Stack>
							</Grid>
						</>
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

export default Details;

import { Box, Paper, Grid, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import placeholderImage from "./placeholderImage.png";

const Poster = styled("img")({
	width: "100%",
	borderRadius: 4,
	objectFit: "cover",
});
const MoviePaper = styled(Paper)(({ theme }) => ({
	cursor: "pointer",
	transition: "box-shadow 0.2s",
	"&:hover": {
		boxShadow: theme.shadows[10],
	},
}));

const Movie = ({ movie }) => {
	const navigate = useNavigate();

	const viewDetails = (id) => {
		navigate(`/details/${id}`);
	};

	return (
		<Grid item xs={6} md={4} lg={3}>
			<MoviePaper
				onClick={(e) => viewDetails(movie.id)}
				sx={{
					p: { xs: 0.5, md: 1 },
					borderRadius: { xs: 2, md: 4 },
				}}
			>
				<Grid alignItems="center" container>
					<Grid item xs zeroMinWidth>
						<Typography gutterBottom variant="body1" noWrap px={0.5}>
							{movie.title}
						</Typography>
					</Grid>

					{movie.year ? (
						<Grid item xs="auto">
							<Typography
								variant="body2"
								sx={{
									py: 0.1,
									px: 0.3,
									color: "white",
									backgroundColor: "secondary.main",
									borderRadius: { xs: 0.5, sm: 1 },
								}}
							>
								{movie.year}
							</Typography>
						</Grid>
					) : (
						""
					)}
				</Grid>

				<Box sx={{ height: { xs: "10rem", sm: "15rem", md: "20rem", lg: "22rem" } }}>
					<Poster
						sx={{ height: "100%" }}
						src={movie.image !== "N/A" ? movie.image : placeholderImage}
						// src={placeholderImage}
						alt={movie.title}
					/>
				</Box>
			</MoviePaper>
		</Grid>
	);
};

export default Movie;

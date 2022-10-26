import { Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

const NotFound = () => {
	return (
		<>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					width: "100%",
					pt: 4,
					textAlign: "center",
				}}
			>
				This page doesn't exist
			</Typography>
			<Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
				<Button startIcon={<Home />} to="/" variant="contained" component={Link}>
					Home
				</Button>
			</Stack>
		</>
	);
};

export default NotFound;

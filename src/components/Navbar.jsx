import { AppBar, Input, Typography, Stack, Container, styled, Box } from "@mui/material";
import { VideoLibraryOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModeSwitch from "./ModeSwitch";

const Logo = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: "none",
}));

const Navbar = ({ mode, setMode, loading }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	function handleSearchSubmit(e) {
		e.preventDefault();
		const query = searchTerm;
		setSearchTerm("");
		navigate(`/search/${query}`);
	}

	return (
		<AppBar
			position="sticky"
			sx={{ p: 2, top: 0, left: 0, backgroundColor: "background.paper" }}
		>
			<Container maxWidth="lg">
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Logo to="/" sx={{ display: "flex", alignItems: "center" }}>
						<VideoLibraryOutlined
							fontSize="medium"
							sx={{ mr: 1, color: "primary.main" }}
						/>
						<Typography variant="h5" sx={{ display: { xs: "none", md: "inline" } }}>
							Moving
							<Typography variant="inherit" component="span" color="primary">
								Pictures
							</Typography>
						</Typography>
					</Logo>

					<Box
						component="form"
						sx={{ flexGrow: 1, px: { xs: 3, sm: 8, md: 10, lg: 20 } }}
						onSubmit={handleSearchSubmit}
					>
						<Input
							type="search"
							sx={{
								boxShadow: "none",
								borderBottom: "solid 1px gray",
								padding: "0 10px",
								textAlign: "center",
								width: "100%",
							}}
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onBlur={(e) => setSearchTerm("")}
						/>
					</Box>

					<ModeSwitch mode={mode} setMode={setMode} />
				</Stack>
			</Container>
		</AppBar>
	);
};

export default Navbar;

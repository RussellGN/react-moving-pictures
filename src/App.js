import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { deepOrange, teal } from "@mui/material/colors";
import { useState } from "react";

const App = () => {
	const [mode, setMode] = useState("dark");

	const getDesignTokens = (mode) => ({
		palette: {
			mode,
			primary: {
				main: deepOrange[700],
				light: deepOrange[600],
				dark: deepOrange[800],
			},
			secondary: {
				main: teal[700],
				light: teal[600],
				dark: teal[800],
			},
			// dark: {
			// 	main: "rgb(50,50,50)",
			// 	light: "rgb(100,100,100)",
			// 	dark: "rgb(20,20,20)",
			// },
			...(mode === "light"
				? {
						background: {
							default: "rgb(245, 245, 245)",
							paper: "#fff",
						},
						text: {
							primary: "rgb(50,50,50)",
						},
				  }
				: {
						background: {
							default: "rgb(50,50,50)",
							paper: "rgb(30,30,30)",
						},
						text: {
							primary: "rgb(245, 245, 245)",
						},
				  }),
		},
	});

	const theme = createTheme(getDesignTokens(mode));
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Navbar mode={mode} setMode={setMode} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search/:query" element={<SearchResults />} />
					<Route path="/details/:id" element={<Details />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;

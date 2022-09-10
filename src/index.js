import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {StateProvider} from "./utils/context/StateProvider";
import reducer, {initialState} from "./utils/Reducer/Reducer";

/**
 * Main file
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</BrowserRouter>
	</React.StrictMode>
);

serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {StateProvider} from "./utils/context/StateProvider";
import reducer, {initialState} from "./utils/Reducer/Reducer";

ReactDOM.render(
	<BrowserRouter>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

serviceWorker.unregister();

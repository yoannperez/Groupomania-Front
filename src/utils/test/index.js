import {render as rtlRender} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {StateProvider} from "../context/StateProvider";
import reducer, {initialState} from "../Reducer/Reducer";

function Wrapper({children}) {
	return (
		<MemoryRouter>
			<StateProvider initialState={initialState} reducer={reducer}>
				{children}
			</StateProvider>
		</MemoryRouter>
	);
}

export function render(ui) {
	rtlRender(ui, {wrapper: Wrapper});
}

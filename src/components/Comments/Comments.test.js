import Comments from ".";
import {render} from "@testing-library/react";

describe("Comments", () => {
	test("Should render without crash", async () => {
		render(<Comments />);
	});
});

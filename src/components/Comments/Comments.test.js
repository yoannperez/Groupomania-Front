import Comments from "./index";
import {render} from "../../utils/test";


describe("Comments", () => {
	test("Should render without crash", async () => {
		render(<Comments />);
	});
});

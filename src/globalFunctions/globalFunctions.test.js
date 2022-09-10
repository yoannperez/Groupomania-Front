import {dateParser} from "./globalFunctions";

describe("Tests de la fonction dateParser", () => {
	it("Sould return the correct value", () => {
		const expectedValue = dateParser("2022-03-21T10:29:24.000Z");
		expect(expectedValue).toBe("21 mars 2022, 11:29:24");
	});

	it("Sould not return the correct value", () => {
		const expectedValue = dateParser("2022-03-21T10:29:24.000Z");
		expect(expectedValue).not.toBe("21 mars 2022, 11:29:29");
	});
});

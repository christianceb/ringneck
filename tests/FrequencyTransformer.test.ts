
import Frequency from "../src/Enums/Frequency"
import FrequencyTransformer from "../src/Transformers/Frequency"

describe("Test transformer for Frequency as enums are a pain in the arse", () => {
    it("Return a string name of a given Frequency", () => {
        expect(FrequencyTransformer.getNameOf(Frequency.Fortnightly)).toEqual("Fortnightly");
    })

    it("Return a nice key/value pair of the frequencies so it can be used in stuff like select-option tags", () => {
        const kvp: any = FrequencyTransformer.getKvps();

        expect(kvp[0].key).toEqual("Weekly");
        expect(kvp[0].value).toEqual(7);
    })
});
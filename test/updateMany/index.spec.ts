import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("updateMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .updateMany({
                resource: "group",
                ids: ["1002"],
                variables: {
                    type: "group",
                    id: "1002",
                    attributes: { description: "Updated Repository Group Via Update Many" }
                },
            });

        const { data } = response;

        expect(data).toStrictEqual([""])
    });
});

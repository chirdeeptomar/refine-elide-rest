import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("deleteMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios).deleteMany({ resource: "group", ids: ["10"] })

        const { data } = response

        expect(data).toStrictEqual([""])
    });
});

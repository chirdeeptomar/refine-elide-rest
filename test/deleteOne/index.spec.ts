import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("deleteOne", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios).deleteOne({ resource: "group", id: "1002" });

        const { data } = response;

        expect(data).toEqual("");
    });
});

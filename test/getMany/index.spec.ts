import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("getMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .getMany({ resource: "group", ids: ["com.example.repository", "com.yahoo.elide"] });

        const { data } = response;

        expect(data[0]["id"]).toBe("com.example.repository");
        expect(data[1]["id"]).toBe("com.yahoo.elide");
        expect(response.data.length).toBe(2);
    });

    it("correct response with one item", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .getMany({ resource: "group", ids: ["com.example.repository"] });

        const { data } = response;

        expect(data[0]["id"]).toBe("com.example.repository");
        expect(response.data.length).toBe(1);
    });
});

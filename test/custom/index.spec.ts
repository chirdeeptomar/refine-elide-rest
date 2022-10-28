import axios from "axios";

import JsonServer from "../../src/index";
import { ELIDE_REST_API_URL } from "../utils";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("custom", () => {

    it("correct get response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .custom({
                url: `${ELIDE_REST_API_URL}/group`,
                method: "get"
            });

        expect(response.data.data[0]["id"]).toBe("com.example.repository");
        expect(response.data.data[0]["type"]).toBe("group");
    });
});

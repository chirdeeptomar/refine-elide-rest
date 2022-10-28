import axios from "axios";
import JsonServer from "../../src/index";
import { ELIDE_REST_API_URL } from "../utils";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getOne", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .getOne({ resource: "group", id: "com.yahoo.elide" });

        const { data } = response;

        expect(data.id).toBe("com.yahoo.elide");
        expect(data.attributes.commonName).toBe("Elide");
    });
});

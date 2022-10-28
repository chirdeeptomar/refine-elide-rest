import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";
import { ELIDE_REST_API_URL } from "../utils"

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("deleteOne", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .deleteOne({ resource: "group", id: "11ecbb46-6775-4c05-8c26-b53ca0164e1c" });

        const { data } = response;

        expect(data).toEqual("");
    });
});

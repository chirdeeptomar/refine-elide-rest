import axios from "axios";
import JsonServer from "../../src/index";
import { ELIDE_REST_API_URL } from "../utils";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

describe("create", () => {

    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .create({
                resource: "group",
                variables: {
                    id: "3813d589-2514-4299-ad71-3d70de40f1d3",
                    type: "group",
                    attributes: {
                        "commonName": "test-group",
                        "description": "this is a test group"
                    }
                },
            })

        const { data } = response;

        expect(data["id"]).toBe("3813d589-2514-4299-ad71-3d70de40f1d3")
        expect(data["type"]).toBe("group")
        expect(data["attributes"]["commonName"]).toBe("test-group")
        expect(data["attributes"]["description"]).toBe("this is a test group")
    });
});

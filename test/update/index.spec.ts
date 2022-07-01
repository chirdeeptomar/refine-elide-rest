import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("update", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).update({
            resource: "group",
            id: "1004",
            variables: {
                type: "group",
                id: "1002",
                attributes: { description: "Updated Repository Group" }
            },
        });

        const { data } = response;

        expect(data).toBe("")
    });

    it("correct error response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).update({
            resource: "group",
            id: "1004",
            variables: {
                type: "group",
                id: "1004",
                attributes: { description: "Updated Repository Group" }
            },
        });

        const { data } = response;

        expect(data).toStrictEqual({ "errors": [{ "detail": "Unknown identifier 1004 for group" }] })
    });
});

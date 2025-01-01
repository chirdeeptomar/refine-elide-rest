import axios from "axios";
import JsonServer from "../../src/index";
import { ELIDE_REST_API_URL } from "../utils";
import "./index.mock";


describe("update", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .update({
                resource: "group",
                id: "com.example.repository",
                variables: {
                    data: {
                        type: "group",
                        id: "com.example.repository",
                        attributes: { description: "Updated Repository Group" }
                    }
                },
            });

        const { data } = response;

        expect(data).toBe("")
    });

    it("correct error response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .update({
                resource: "group",
                id: "1004",
                variables: {
                    data: {
                        type: "group",
                        id: "1004",
                        attributes: { description: "Updated Repository Group" }
                    }
                },
            });

        const { data } = response;

        expect(data).toStrictEqual({ "errors": [{ "detail": "Unknown identifier 1004 for group" }] })
    });
});

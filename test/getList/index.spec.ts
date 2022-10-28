import axios from "axios";
import JsonServer from "../../src/index";
import { ELIDE_REST_API_URL } from "../utils";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios).getList({ resource: "group" });
        expect(response.data[0]["id"]).toBe("com.example.repository");
        expect(response.data[0]["attributes"]["commonName"]).toBe("Example Repository");
        expect(response.total).toBe(2);
    });

    it("correct sorting asc response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).getList({
            resource: "group",
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("com.example.repository");
        expect(response.data[0]["attributes"]["commonName"]).toBe("Example Repository");
        expect(response.total).toBe(2);
    });

    it("correct sorting desc response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).getList({
            resource: "group",
            sort: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("com.yahoo.elide");
        expect(response.data[0]["attributes"]["commonName"]).toBe("Elide");
        expect(response.total).toBe(2);
    });

    it("correct filter response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).getList({
            resource: "group",
            filters: [
                {
                    field: "id",
                    operator: "eq",
                    value: ["com.yahoo.elide"],
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("com.yahoo.elide");
        expect(response.total).toBe(1);
    });

    it("correct filter and sort response", async () => {
        const response = await JsonServer(
            ELIDE_REST_API_URL,
            axios,
        ).getList({
            resource: "group",
            filters: [
                {
                    field: "id",
                    operator: "eq",
                    value: ["com.yahoo.elide"],
                },
            ],
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("com.yahoo.elide");
        expect(response.total).toBe(1);
    });
});

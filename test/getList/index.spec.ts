import axios from "axios";
import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios).getList({ resource: "group" });

        console.log(response.data)
        expect(response.data[0]["id"]).toBe("com.example.repository");
        expect(response.data[0]["attributes"]["commonName"]).toBe("Example Repository");
        expect(response.total).toBeGreaterThan(1);
    });

    it("correct sorting response", async () => {
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

        expect(response.data[0]["id"]).toBe("1002");
        expect(response.data[0]["attributes"]["commonName"]).toBe("TEST");
        expect(response.total).toBeGreaterThan(1);
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

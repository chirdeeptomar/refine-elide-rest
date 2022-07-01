import axios from "axios";
import JsonServer from "../../src/index";
import { makeid } from "../utils";
import "./index.mock";


axios.defaults.adapter = require("axios/lib/adapters/http");

const ELIDE_REST_API_URL = 'http://localhost:8080/api/v1'

describe("create", () => {

    let newId = ''

    beforeEach(() => {
        newId = makeid(10)
    });

    afterEach(async () => {
        await JsonServer(ELIDE_REST_API_URL, axios).deleteOne({ resource: "group", id: newId });
    });

    it("correct response", async () => {
        const response = await JsonServer(ELIDE_REST_API_URL, axios)
            .create({
                resource: "group",
                variables: { id: newId, type: "group", attributes: { commonName: "com.test.elide", description: "Repository Group" } },
            });

        const { data } = response;

        expect(data["id"]).toBe(newId);
        expect(data["type"]).toBe("group");
        expect(data["attributes"]["commonName"]).toBe("com.test.elide");
    });
});

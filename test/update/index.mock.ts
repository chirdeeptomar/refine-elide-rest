import nock from "nock";
import { ELIDE_REST_API_URL } from "../utils";

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .patch("/group/com.example.repository", {
        "data":
        {
            "type": "group",
            "id": "com.example.repository",
            "attributes": { "description": "Updated Repository Group" }
        }
    })
    .reply(204);

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .patch("/group/1004", {
        "data":
        {
            "type": "group",
            "id": "1004",
            "attributes": { "description": "Updated Repository Group" }
        }
    })
    .reply(404, { "errors": [{ "detail": "Unknown identifier 1004 for group" }] });

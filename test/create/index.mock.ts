import nock from "nock";

import { ELIDE_REST_API_URL } from "../utils"

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .post("/group", {
        "data": {
            "type": "group",
            "id": "3813d589-2514-4299-ad71-3d70de40f1d3",
            "attributes": {
                "commonName": "test-group",
                "description": "this is a test group"
            }
        }
    })
    .reply(201, {
        "data": {
            "type": "group",
            "id": "3813d589-2514-4299-ad71-3d70de40f1d3",
            "attributes": {
                "commonName": "test-group",
                "description": "this is a test group"
            },
            "relationships": {
                "products": {
                    "data": []
                }
            }
        }
    }, []
    );

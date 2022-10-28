import nock from "nock";
import { ELIDE_REST_API_URL } from "../utils";

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .get("/group")
    .reply(
        200,
        {
            "data": [
                {
                    "type": "group",
                    "id": "com.example.repository",
                    "attributes": {
                        "commonName": "string",
                        "description": "string"
                    },
                    "relationships": {
                        "products": {
                            "data": []
                        }
                    }
                },
                {
                    "type": "group",
                    "id": "com.yahoo.elide",
                    "attributes": {
                        "commonName": "Elide",
                        "description": "The magical library powering this project"
                    },
                    "relationships": {
                        "products": {
                            "data": [
                                {
                                    "type": "product",
                                    "id": "elide-core"
                                },
                                {
                                    "type": "product",
                                    "id": "elide-standalone"
                                },
                                {
                                    "type": "product",
                                    "id": "elide-datastore-hibernate5"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    );

import nock from "nock";
import { ELIDE_REST_API_URL } from "../utils";

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .get("/group?filter[group]=id=in=(com.example.repository,com.yahoo.elide)")
    .reply(
        200,
        {
            "data": [
                {
                    "type": "group",
                    "id": "com.example.repository",
                    "attributes": {
                        "commonName": "Example Repository",
                        "description": "Updated Repository Group"
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

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .get("/group?filter[group]=id=in=(com.example.repository)")
    .reply(
        200,
        {
            "data": [
                {
                    "type": "group",
                    "id": "com.example.repository",
                    "attributes": {
                        "commonName": "Example Repository",
                        "description": "Updated Repository Group"
                    },
                    "relationships": {
                        "products": {
                            "data": []
                        }
                    }
                }
            ]
        }
    );

import nock from "nock";
import { ELIDE_REST_API_URL } from "../utils";

nock(ELIDE_REST_API_URL)
    .get("/group?page[offset]=0&page[limit]=10&page[totals]&&")
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
            ],
            "meta": {
                "page": {
                    "number": 1,
                    "totalRecords": 2,
                    "limit": 10,
                    "totalPages": 1
                }
            }
        }
    );

nock("http://localhost:8080/api/v1")
    .get("/group?page[offset]=0&page[limit]=10&page[totals]&sort=id,&")
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
            ],
            "meta": {
                "page": {
                    "number": 1,
                    "totalRecords": 2,
                    "limit": 10,
                    "totalPages": 1
                }
            }
        }
    );

nock("http://localhost:8080/api/v1")
    .get("/group?page[offset]=0&page[limit]=10&page[totals]&sort=-id,&")
    .reply(
        200,
        {
            "data": [
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
                },
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
            ],
            "meta": {
                "page": {
                    "number": 1,
                    "totalRecords": 2,
                    "limit": 10,
                    "totalPages": 1
                }
            }
        }
    );


nock("http://localhost:8080/api/v1")
    .get("/group?page[offset]=0&page[limit]=10&page[totals]&&filter=id=ini=(com.yahoo.elide)")
    .reply(
        200,
        {
            "data": [
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
            ],
            "meta": {
                "page": {
                    "number": 1,
                    "totalRecords": 1,
                    "limit": 10,
                    "totalPages": 1
                }
            }
        }
    );

nock("http://localhost:8080/api/v1")
    .get("/group?page[offset]=0&page[limit]=10&page[totals]&sort=id,&filter=id=ini=(com.yahoo.elide)")
    .reply(
        200,
        {
            "data": [
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
            ],
            "meta": {
                "page": {
                    "number": 1,
                    "totalRecords": 1,
                    "limit": 10,
                    "totalPages": 1
                }
            }
        }
    );
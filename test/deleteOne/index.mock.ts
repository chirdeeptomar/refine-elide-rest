import nock from "nock";
import { ELIDE_REST_API_URL } from "../utils";

nock(ELIDE_REST_API_URL, { encodedQueryParams: true })
    .delete("/group/11ecbb46-6775-4c05-8c26-b53ca0164e1c")
    .reply(204);

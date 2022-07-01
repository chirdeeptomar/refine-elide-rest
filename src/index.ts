import {
    CrudFilters, CrudOperators, CrudSorting, DataProvider,
    HttpError
} from "@pankod/refine-core";
import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
        case "eq":
        default:
            return "==";
    }
};

const generateSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        let sortQueryParams: string = "sort="
        sort.forEach((item) => {
            if (item !== undefined && item.field !== "attributes") {
                const sortField = item.field.replace("attributes,", "")
                sortQueryParams += (item.order === "desc" ? `-${sortField}` : sortField) + ","
            }
        })
        return sortQueryParams;
    }

    return "";
};

const generateFilter = (resource: string, filters?: CrudFilters) => {
    let queryFilters: string = '';
    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, value } = filter;
                // ?filter[book]=genre=='Science Fiction';title=='The Red Giant'
                if (queryFilters.includes(`filter[${resource}]`)) {
                    queryFilters = queryFilters + `;${field}=ini='${value}'`
                } else {
                    queryFilters = queryFilters + `filter[${resource}]=${field}=ini='${value}*'`
                }
            }
        });
    }

    return queryFilters;
};

const JsonServer = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async ({ resource, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

        // pagination
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const queryFilters = generateFilter(resource, filters);

        const query: {
            _start: number;
            _end: number;
            _sort?: string;
            _order?: string;
        } = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        };

        const generatedSort = generateSort(sort);

        const page = `page[offset]=${query._start}&page[limit]=${pageSize}&page[totals]&${generatedSort}`
        const formedQuery = `${url}?${page}&${queryFilters}`
        const { data } = await httpClient.get(formedQuery)
        return {
            data: data.data,
            total: data.meta.page.totalRecords,
        };
    },

    getMany: async ({ resource, ids }) => {
        const inQuery = `filter[${resource}]=id=in=(${ids})`
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${inQuery}`,
        );

        return {
            data: data.data,
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, { data: { ...variables } }, {
            headers: {
                "accept": "application/vnd.api+json",
                "content-type": "application/vnd.api+json"
            }
        });

        return {
            data: data.data,
        };
    },

    createMany: async ({ resource, variables }) => {
        const response = await Promise.all(
            variables.map(async (param) => {
                const { data } = await httpClient.post(
                    `${apiUrl}/${resource}`,
                    param,
                );
                return data;
            }),
        );

        return { data: response };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        try {
            const { data } = await httpClient.patch(url, { data: { ...variables } }, {
                headers: {
                    "accept": "application/vnd.api+json",
                    "content-type": "application/vnd.api+json"
                }
            });

            return {
                data
            }
        } catch (error) {
            const err = error as AxiosError
            return { data: err.response?.data }
        }

    },

    updateMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`, { data: { ...variables } }, {
                    headers: {
                        "accept": "application/vnd.api+json",
                        "content-type": "application/vnd.api+json"
                    }
                });
                return data;
            }),
        );

        return { data: response };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data: data?.data,
        };
    },

    deleteOne: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url, variables);

        return {
            data,
        };
    },

    deleteMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
                    variables,
                );
                return data;
            }),
        );
        return { data: response };
    },

    getApiUrl: () => {
        return apiUrl;
    },

    // custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    //     let requestUrl = `${url}?`;

    //     if (sort) {
    //         const generatedSort = generateSort(sort);
    //         if (generatedSort) {
    //             const { _sort, _order } = generatedSort;
    //             const sortQuery = {
    //                 _sort: _sort.join(","),
    //                 _order: _order.join(","),
    //             };
    //             requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    //         }
    //     }

    //     if (filters) {
    //         const filterQuery = generateFilter(filters);
    //         requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    //     }

    //     if (query) {
    //         requestUrl = `${requestUrl}&${stringify(query)}`;
    //     }

    //     if (headers) {
    //         httpClient.defaults.headers = {
    //             ...httpClient.defaults.headers,
    //             ...headers,
    //         };
    //     }

    //     let axiosResponse;
    //     switch (method) {
    //         case "put":
    //         case "post":
    //         case "patch":
    //             axiosResponse = await httpClient[method](url, payload);
    //             break;
    //         case "delete":
    //             axiosResponse = await httpClient.delete(url);
    //             break;
    //         default:
    //             axiosResponse = await httpClient.get(requestUrl);
    //             break;
    //     }

    //     const { data } = axiosResponse;

    //     return Promise.resolve({ data });
    // },
});

export default JsonServer;

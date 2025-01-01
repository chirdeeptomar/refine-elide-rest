import {
    CrudFilters, CrudOperators, CrudSorting, DataProvider,
    HttpError
} from "@refinedev/core";
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

const generateFilter = (filters?: CrudFilters) => {

    let queryFilters: string = '';
    if (filters) {
        filters.forEach((filter: any) => {
            if (filter.operator !== "or") {
                const { field, value } = filter;
                let modifiedField = field.toString().replace("relationships.", "")
                modifiedField = modifiedField.toString().replace("data.", "")

                const filterField = modifiedField ? modifiedField : field;

                // ?filter[book]=genre=='Science Fiction';title=='The Red Giant'
                if (queryFilters.includes(`filter`)) {
                    queryFilters = queryFilters + `;${filterField}=ini=(${value})`
                } else {
                    queryFilters = queryFilters + `filter=${filterField}=ini=(${value})`
                }
            }
        });
    }

    return queryFilters;
};

const JsonServer = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "updateMany" | "deleteMany"> => ({
    getList: async ({ resource, pagination, filters, sorters }) => {
        const url = `${apiUrl}/${resource}`;
        // pagination
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const queryFilters = generateFilter(filters);

        const query: {
            _start: number;
            _end: number;
            _sort?: string;
            _order?: string;
        } = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        };

        const generatedSort = generateSort(sorters);

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
        const { data } = await httpClient.post(url, { ...variables },
            {
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
            const { data } = await httpClient.patch(url, { ...variables },
                {
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

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data: data
        };
    },

    deleteOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data
        };
    },

    getApiUrl: () => {
        return apiUrl;
    },

    custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sorters) {
            const generatedSort = generateSort(sorters);
            if (generatedSort) {
                requestUrl = `${requestUrl}&${generatedSort})}`;
            }
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${filterQuery}`;
        }

        if (query) {
            requestUrl = `${requestUrl}&${query}`;
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = httpClient[method](url, payload, { headers });
                break;
            case "delete":
                axiosResponse = httpClient.delete(url);
                break;
            default:
                axiosResponse = httpClient.get(url);
                break;
        }

        const { data } = await axiosResponse;

        return { data };
    },
});

export default JsonServer;

import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";

import { Category, ApiResponse } from "../../interfaces";

const { Title, Text } = Typography;

export const CategoryShow = () => {
    const { query } = useShow<ApiResponse<Category>>();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.data.attributes.title}</Text>
        </Show>
    );
};
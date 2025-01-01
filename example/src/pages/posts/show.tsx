import { useShow, useOne } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";

import { Post, Category, ApiResponse } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { query } = useShow<ApiResponse<Post>>();
    const { data, isLoading } = query;
    const record = data?.data;

    console.log(record)

    const { data: categoryData } = useOne<ApiResponse<Category>>({
        resource: "category",
        id: record?.data.relationships.category.data.id || "",
        queryOptions: {
            enabled: !!record?.data.relationships.category.data.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.data.attributes.title}</Text>
            <Title level={5}>Content</Title>
            <Text>{record?.data.attributes.content}</Text>
            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.data.attributes.title}</Text>
        </Show>
    );
};
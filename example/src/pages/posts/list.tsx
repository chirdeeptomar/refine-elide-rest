import {
    DeleteButton,
    EditButton,
    FilterDropdown,
    List,
    ShowButton,
    TextField,
    useSelect,
    useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Select, Space, Table } from "antd";

import { Category, Post } from "../../interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<Post>()

    const categoryIds =
        tableProps?.dataSource?.map((item) => item?.relationships.category.data.id) ?? [];

    const { data: categories, isLoading } = useMany<Category>({
        resource: "category",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    console.log(categories)

    const { selectProps: categorySelectProps } = useSelect<Category>({
        resource: "category",
        optionLabel: () => "attributes.title",
        optionValue: "id"
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex={["attributes", "title"]} title="Title" />
                <Table.Column
                    dataIndex={["relationships", "category", "data", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categories?.data.find(
                                        (item) => item.id === value,
                                    )?.attributes.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<Post>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
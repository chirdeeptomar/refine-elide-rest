import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";
import { HttpError } from "@pankod/refine-core";

import { Category, Post } from "./../../interfaces";


export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<Post, HttpError, { data: Post }>();
    const { selectProps: categorySelectProps } = useSelect<Category>({
        resource: "category",
        optionLabel: "attributes.title",
        optionValue: "id"
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => {
                const { data } = values
                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        "data": {
                            "type": "post",
                            "attributes": {
                                "content": data.attributes.content,
                                "title": data.attributes.title
                            },
                            "relationships": {
                                "category": {
                                    "data": {
                                        "type": "category",
                                        "id": data.relationships.category.data.id
                                    }
                                }
                            }
                        }
                    })
                );
            }} layout="vertical">
                <Form.Item
                    label="Title"
                    name={["data", "attributes", "title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name={["data", "attributes", "content"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["data", "relationships", "category", "data", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
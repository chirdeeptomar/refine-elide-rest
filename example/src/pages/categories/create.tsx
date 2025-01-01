import {
    Create,
    useForm,
} from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Form, Input } from "antd";

import { Category } from "../../interfaces";


export const CategoryCreate = () => {
    const { formProps, saveButtonProps } = useForm<Category, HttpError, { data: Category }>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => {
                const { data } = values
                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        "data": {
                            "type": "category",
                            "attributes": {
                                "title": data.attributes.title
                            },
                            "relationships": {
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
            </Form>
        </Create>
    );
};
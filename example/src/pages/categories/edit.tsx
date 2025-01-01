import {
    Edit,
    useForm,
} from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Form, Input } from "antd";

import { Category } from "../../interfaces";

export const CategoryEdit: React.FC = () => {
    const { formProps, saveButtonProps, query } = useForm<{ data: Category }, HttpError, { data: Category }>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => {
                const { data } = values
                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        "data": {
                            "id": query?.data?.data.data.id,
                            "type": query?.data?.data.data.type!,
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
        </Edit >
    );
};
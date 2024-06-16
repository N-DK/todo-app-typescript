import { Input, Modal, Select, Form } from 'antd';
import { TodoType } from '../../types';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
type TypeForm = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    todo: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: (todo: TodoType) => void;
    data?: TodoType;
};

const FormTodo: React.FC<TypeForm> = ({
    isModalOpen,
    setIsModalOpen,
    todo,
    onChange,
    handleAddTodo,
    data,
}) => {
    const [status, setStatus] = useState<boolean>(() =>
        data ? data.status : false,
    );

    const handleOk = () => {
        setIsModalOpen(false);
        handleChangeStatus(false);
        handleAddTodo({
            id: data ? data.id : uuidv4(),
            title: todo,
            status,
            time: Date.now(),
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeStatus = (value: boolean) => {
        setStatus(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handleOk();
        }
    };

    useEffect(() => {
        setStatus(data ? data.status : false);
    }, [data]);

    return (
        <Modal
            title={`${data ? 'Edit todo' : 'Add TODO'}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`${data ? 'Edit Task' : 'Add Task'}`}
        >
            <Form onKeyDown={handleKeyDown} layout="vertical">
                <Form.Item label="Title">
                    <Input
                        defaultValue={data?.title}
                        value={todo}
                        onChange={onChange}
                        placeholder="Enter todo..."
                    />
                </Form.Item>
                <Form.Item label="Title">
                    <Select
                        // defaultValue={data?.status}
                        value={status}
                        options={[
                            { value: false, label: 'Incomplete' },
                            { value: true, label: 'Completed' },
                        ]}
                        onChange={handleChangeStatus}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FormTodo;

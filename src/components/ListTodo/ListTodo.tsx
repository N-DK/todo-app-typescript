import { Empty, Space } from 'antd';
import { TodoType } from '../../types';
import Todo from '../Todo/Todo';

type Props = {
    todos: TodoType[];
    filter: boolean | string;
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    handleSetDateEdit: (data: TodoType) => void;
};

const ListTodo: React.FC<Props> = ({
    todos,
    filter,
    setTodos,
    handleSetDateEdit,
}) => {
    const handleDelete = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleChangeStatus = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, status: !todo.status } : todo,
            ),
        );
    };

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {todos?.length === 0 ||
            (filter !== '' &&
                todos.findIndex((todo) => todo.status === filter) === -1) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                todos?.map((todo, index) => {
                    if (todo.status === filter || filter === '') {
                        return (
                            <Todo
                                key={index}
                                id={todo.id}
                                title={todo.title}
                                status={todo.status}
                                time={todo.time}
                                handleChangeStatus={handleChangeStatus}
                                handleDelete={handleDelete}
                                handleSetDateEdit={handleSetDateEdit}
                            />
                        );
                    }
                })
            )}
        </Space>
    );
};

export default ListTodo;

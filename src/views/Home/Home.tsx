import { Button, Select } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { TodoType } from '../../types';
import { FormTodoInput } from '../../components/FormTodo';
import { ListTodo } from '../../components/ListTodo';

const Home: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>(() => {
        const saveData = localStorage.getItem('data');
        return saveData ? JSON.parse(saveData) : [];
    });
    const [todo, setTodo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState<boolean | string>('');
    const [data, setData] = useState<TodoType>();

    const showModal = () => {
        setData(undefined);
        setTodo('');
        setIsModalOpen(true);
    };

    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleAddTodo = (newTodo: TodoType) => {
        setTodos((prevTodos) => {
            const index = prevTodos.findIndex((item) => item.id === newTodo.id);
            if (index !== -1) {
                const updatedTodos = [...prevTodos];
                updatedTodos[index] = newTodo;
                return updatedTodos;
            } else {
                return [newTodo, ...prevTodos];
            }
        });
        setTodo('');
    };

    const handleChangeFilter = (status: boolean | string) => {
        setFilter(status);
    };

    const handleSetDateEdit = (data: TodoType) => {
        setIsModalOpen(true);
        setData(data);
        setTodo(data.title);
    };

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0">
            <div className="w-full h-full flex justify-center">
                <div className="pt-5 w-1/2">
                    <h1 className="font-extrabold text-4xl text-center">
                        TODO LIST
                    </h1>
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <Button type="primary" onClick={showModal}>
                                Add Task
                            </Button>
                            <Select
                                defaultValue={''}
                                style={{ width: 150 }}
                                options={[
                                    { value: '', label: 'All' },
                                    { value: false, label: 'Incomplete' },
                                    { value: true, label: 'Completed' },
                                ]}
                                onChange={handleChangeFilter}
                            />
                        </div>
                        <div className="rounded bg-[#ecedf6] mt-3 p-2">
                            <ListTodo
                                todos={todos}
                                setTodos={setTodos}
                                filter={filter}
                                handleSetDateEdit={handleSetDateEdit}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FormTodoInput
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                todo={todo}
                onChange={handleOnchange}
                handleAddTodo={handleAddTodo}
                data={data}
            />
        </div>
    );
};

export default Home;

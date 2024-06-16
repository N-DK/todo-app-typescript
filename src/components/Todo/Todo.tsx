import { Button, Space } from 'antd';
import { TodoType } from '../../types';
import { EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
interface Props extends TodoType {
    handleChangeStatus: (id: string) => void;
    handleDelete: (id: string) => void;
    handleSetDateEdit: (data: TodoType) => void;
}

const Todo: React.FC<Props> = ({
    id,
    title,
    status,
    time,
    handleChangeStatus,
    handleDelete,
    handleSetDateEdit,
}) => {
    function formatAMPM(date: Date) {
        let hours = date.getHours();
        let minutes: number | string = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero based
        const year = date.getFullYear();
        const formattedDate =
            (month < 10 ? '0' + month : month) +
            '/' +
            (day < 10 ? '0' + day : day) +
            '/' +
            year;
        return formattedDate;
    }

    function formatTimestampToDatetime(timestamp: number) {
        const date = new Date(timestamp);
        const formattedTime = formatAMPM(date);
        const formattedDate = formatDate(date);
        return formattedTime + ', ' + formattedDate;
    }

    return (
        <div className="bg-white rounded p-2">
            <div className="flex justify-between items-center">
                <Space>
                    <Button
                        onClick={() => handleChangeStatus(id)}
                        icon={status && <CheckOutlined />}
                    />
                    <div className="flex flex-col ml-2">
                        <h1
                            className={`font-extrabold ${
                                status && 'line-through'
                            }`}
                        >
                            {title}
                        </h1>
                        <p className="text-sm">
                            {formatTimestampToDatetime(time)}
                        </p>
                    </div>
                </Space>
                <Space>
                    <Button
                        onClick={() => handleDelete(id)}
                        icon={<DeleteOutlined />}
                    />
                    <Button
                        onClick={() =>
                            handleSetDateEdit({
                                title,
                                id,
                                time,
                                status,
                            })
                        }
                        icon={<EditOutlined />}
                    />
                </Space>
            </div>
        </div>
    );
};

export default Todo;

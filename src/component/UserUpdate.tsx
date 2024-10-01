"use client"
import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import toast from 'react-hot-toast';

interface IUserListProps {
    list: any;
}

const UserUpdates: React.FC<IUserListProps> = ({ list }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: list.name,
        email: list.email
    });

    const deleteUser = async () => {
        try {
            if (list._id) {
                await axios.post("/api/users", { id: list._id });
                router.refresh();
                toast.success(`Customer ${list.name} deleted successfully!`);
            }
        } catch (error) {
            console.log("Error deleting user:", error);
            toast.error(`Error deleting user:", error`);
        }
    };

    const updateUser = async () => {
        try {
            if (list._id) {
                await axios.put("/api/users", {
                    id: list._id,
                    name: updatedUser.name,
                    email: updatedUser.email
                });
                router.refresh();
                setIsEditing(false);
                toast.success(`Customer ${list.name} updated successfully!`);
            }
        } catch (error) {
            console.log("Error updating user:", error);
        }
    };

    if (list.email === 'hakan34@gmail.com') {
        return null;
    }

    return (
        <tr key={list._id}>
            <td className="py-2 px-4 border-b">{list._id}</td>
            <td className="py-2 px-4 border-b">
                {isEditing ? (
                    <input
                        className='block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm'
                        type="text"
                        value={updatedUser.name}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                    />
                ) : (
                    list.name
                )}
            </td>
            <td className="py-2 px-4 border-b">
                {isEditing ? (
                    <input
                        className='block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm'
                        type="email"
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    />
                ) : (
                    list.email
                )}
            </td>
            <td className="py-2 px-4 border-b">
                {isEditing ? (
                    <Button title="Save" onClick={updateUser} />
                ) : (
                    <Button title="Edit" onClick={() => setIsEditing(true)} />
                )}
            </td>
            <td className="py-2 px-4 border-b">
                <Button onClick={deleteUser} ico={<DeleteOutlineIcon />} />
            </td>
        </tr>
    );
};

export default UserUpdates;

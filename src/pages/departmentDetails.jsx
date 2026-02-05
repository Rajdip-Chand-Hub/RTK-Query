import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetDepartmentsByIdQuery,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} from "../features/departmentApi.js";

const DepartmentDetails = () => {
    const { id } = useParams(); // get department ID from route
    const navigate = useNavigate();

    // Fetch single department
    const { data, isLoading, isError } = useGetDepartmentsByIdQuery(id);
    const department = data?.data ?? null; // safe extraction

    // Mutations
    const [updateDepartment] = useUpdateDepartmentMutation();
    const [deleteDepartment] = useDeleteDepartmentMutation();

    // Local state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");

    // Set name when data loads
    useEffect(() => {
        if (department) setName(department.dep01title);
    }, [department]);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !department) return <div>Error loading department</div>;

    // Edit
    const handleEdit = () => setIsEditing(true);

    // Save updated name
    const handleUpdate = async () => {
        try {
            await updateDepartment({ id, data: { name } }).unwrap();
            setIsEditing(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    // Delete department
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                console.log("Deleting department with id:", id);
                await deleteDepartment(id).unwrap();
                navigate("/departments"); // go back to list
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Department Details</h1>

                <div className="space-y-3">
                    <p className="bg-gray-200 rounded p-2">
                        <span className="font-semibold">Name:</span>{" "}
                        {isEditing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border px-2 py-1 rounded w-full"
                            />
                        ) : (
                            department.dep01title
                        )}
                    </p>
                    <p className="bg-gray-200 rounded p-2">
                        <span className="font-semibold">ID:</span> {department.dep01uin}
                    </p>
                    <p className="bg-gray-200 rounded p-2">
                        <span className="font-semibold">Code:</span> {department.dep01code}
                    </p>
                    <p className="bg-gray-200 rounded p-2">
                        <span className="font-semibold">Email:</span> {department.dep01email}
                    </p>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                    {isEditing ? (
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                        >
                            Edit
                        </button>
                    )}

                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentDetails;

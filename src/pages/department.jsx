import { Link } from "react-router-dom";
import { useGetDepartmentsQuery } from "../features/departmentApi.js";
import { useNavigate } from "react-router-dom";


const Department = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetDepartmentsQuery();
    const departments = data?.data?.items ?? [];

    if (isLoading) {
        return <p className="text-center mt-10">Loading departments...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500 mt-10">
                Failed to load departments
            </p>
        );
    }
    const logout = () => {
        localStorage.removeItem("token"); // simple logout example
        window.location.reload();
        navigate("/")
    }

    return (
        <div className="p-6">
            <div className="p-2 flex justify-between items-center mb-6 bg-gray-300 rounded">
                <h1 className="text-2xl font-bold">Departments</h1>
                <button
                    className="text-white bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <button
                className="text-white bg-cyan-600 px-4 py-2 mb-6 rounded hover:bg-cyan-700"
                onClick={() => navigate("/create-form")}
            >
                Create New Department
            </button>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 border-3">
                    <thead className="text-lg uppercase bg-gray-200 border-3">
                        <tr>
                            <th className="px-6 py-3 border-r-3">Department Name</th>
                            <th className="px-6 py-3 border-r-3">Code</th>
                            <th className="px-6 py-3 border-r-3">Email</th>
                            <th className="px-6 py-3 border-r-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 ">
                                    No departments found
                                </td>
                            </tr>
                        ) : (
                            departments.map((dept) => (
                                <tr
                                    key={dept.dep01uin}
                                    className="border-b hover:bg-gray-50 border-2"
                                >
                                    <td className="px-6 py-4 font-medium text-black-600 border-r-3">
                                        <Link
                                            to={`/departments/${dept.dep01uin}`}
                                            className="hover:underline text-cyan-600"
                                        >
                                            {dept.dep01title}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 border-r-3">{dept.dep01code}</td>
                                    <td className="px-6 py-4 border-r-3">{dept.dep01email}</td>

                                    <td className="px-6 py-4">
                                        {dept.dep01status ? (
                                            <span className="text-green-600 font-semibold">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Department;

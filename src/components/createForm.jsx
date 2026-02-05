import { useNavigate } from "react-router-dom";
import { useAddDepartmentMutation } from "../features/departmentApi.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateDepartment = () => {
  const navigate = useNavigate();
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  // Initial form values
  const initialValues = {
    dep01title: "",
    dep01code: "",
    dep01email: "",
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    dep01title: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Department name is required"),
    dep01code: Yup.string()
      .required("Department code is required"),
    dep01email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  // Submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addDepartment(values).unwrap();
      resetForm();
      navigate("/departments");
    } catch (error) {
      console.error("Create department failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Department
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Department Name */}
              <div>
                <label className="block font-medium mb-1">
                  Department Name
                </label>
                <Field
                  name="dep01title"
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="dep01title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Department Code */}
              <div>
                <label className="block font-medium mb-1">
                  Department Code
                </label>
                <Field
                  name="dep01code"
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="dep01code"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Department Email */}
              <div>
                <label className="block font-medium mb-1">
                  Department Email
                </label>
                <Field
                  name="dep01email"
                  type="email"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="dep01email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded transition disabled:opacity-50"
                >
                  {isSubmitting || isLoading ? "Saving..." : "Create"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/departments")}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateDepartment;

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../features/authApi.js";
import { useNavigate } from "react-router";

const pageSchema = Yup.object({
    userName: Yup.string().required("Enter your username"),
    password: Yup.string().required("Enter your password"),
});

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigation = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const res = await login(values).unwrap();
            console.log("LOGIN RESPONSE:", res);
            // 🔐 Save token
            localStorage.setItem("token", res.newToken);
            navigation("/departments");
        } catch (error) {
            setErrors({ password: "Invalid username or password" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <Formik
                            initialValues={{
                                userName: "",
                                password: "",
                                rememberMe: false,
                            }}
                            validationSchema={pageSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className="space-y-4 md:space-y-6">

                                {/* Username */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Username
                                    </label>
                                    <Field
                                        name="userName"
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <ErrorMessage
                                        name="userName"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Remember Me + Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="rememberMe"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>

                                    <a
                                        href="#"
                                        className="text-sm font-medium text-cyan-500 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-white bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </button>

                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
        </section>
    );

};

export default Login;

import Button from "../../UI-items/Button";
import { LOGIN_FORM } from "../../Data_Auth/Index";
import InputErrorMessage from "../../UI-items/InputErrorMessage";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoginHook from "../../Hooks/Auth/Login_Hook";

function LoginPage() {
    const [register, handleSubmit, errors, onSubmit] = LoginHook()

        useEffect(() => {
            document.title = "Login Page";
        }, [])

    const renderLoginForm = LOGIN_FORM.map(({ name, placeholder, type, validation }, idx) => {
        return (
            <div key={idx}>
                <label className="block text-gray-700 capitalize mb-2">{name} :</label>
                <input type={type}
                    placeholder={placeholder}
                    {...register(name, validation)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors[name] && <InputErrorMessage message={errors[name]?.message} />}
            </div>
        );
    });
    return (
        <div className="min-h-[calc(70vh-100px)] border-t-2 mb-10 mt-3 py-5 container">
            <div className="w-full max-w-md border-2 mx-auto rounded-lg py-4 px-5 translate-y-1/3	">
                <div>
                    <h2 className="text-3xl font-bold capitalize text-center">sign-in</h2>
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {renderLoginForm}
                        <div>
                            <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg cursor-pointer font-bold capitalize text-lg hover:bg-blue-600">login</Button>
                        </div>

                        <Link to="/auth/register" >
                            <div className="capitalize text-center py-1 px-3 text-zinc-500 hover:text-zinc-400 rounded-lg border-2  mt-5">create your account</div>
                        </Link>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;

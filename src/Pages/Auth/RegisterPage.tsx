import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../UI-items/Button";
import InputErrorMessage from "../../UI-items/InputErrorMessage";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import { registerSchema } from "../../validation";
import { REGISTER_FORM } from "../../Data/Index";

type Inputs = {
    username:string
    email: string;
    password: string;
};

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({
        resolver: yupResolver(registerSchema)
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const renderLoginForm = REGISTER_FORM.map(({ name, placeholder, type, validation }, idx) => {
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
        <div className="min-h-[calc(70vh-100px)] border-t-2 mb-10 mt-3 py-5 container mx-auto">
            <div className="w-full max-w-md border-2 mx-auto rounded-lg py-4 px-5 mt-20">
                <div>
                    <h2 className="text-3xl font-bold capitalize text-center mb-5">create your account</h2>
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {renderLoginForm}
                        <div>
                            <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg cursor-pointer font-bold capitalize text-lg hover:bg-blue-600">register</Button>
                        </div>

                        <Link to="/auth/login" >
                            <div className="capitalize text-center py-1 px-3 text-zinc-500 hover:text-zinc-400 rounded-lg border-2  mt-5">sign-in</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

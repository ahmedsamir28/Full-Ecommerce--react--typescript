import ChangePasswordHook from '../../../Hooks/User/Change_Password_Hook';
import Button from '../../../UI-items/Button';

function UserHandlePassword() {
const [state, handleChange, handleSavePassword, isLoading] = ChangePasswordHook()
    return (
        <div className="mt-5 border-2 rounded-lg py-3">
            <div className="text-xl font-bold text-zinc-500 capitalize ml-2">Change Password</div>

            <div className="flex justify-between items-start flex-col gap-5 px-5 mt-5">
                <form onSubmit={handleSavePassword} className="flex flex-col gap-5 w-full">
                    <input
                        type="password"
                        name="currentPassword"
                        value={state.currentPassword}
                        onChange={handleChange}
                        className="input input-bordered input-info w-full"
                        placeholder="Enter Your Old Password"
                    />
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        className="input input-bordered input-info w-full"
                        placeholder="Enter Your New Password"
                    />
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={state.passwordConfirm}
                        onChange={handleChange}
                        className="input input-bordered input-info w-full"
                        placeholder="Confirm Your New Password"
                    />

                    <div className="text-end w-full">
                        <Button
                            className="capitalize btn btn-success btn-outline"
                            type="submit"
                            disabled={isLoading} // Optional: disable button while loading
                        >
                            {isLoading ? 'Saving...' : 'Save Password'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserHandlePassword;

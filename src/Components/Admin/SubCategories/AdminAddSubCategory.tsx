import Button from "../../../UI-items/Button";
import Modal from "../../../UI-items/Modal";
import { IData } from "../../../Interface";
import AddSubCategoryHook from "../../../Hooks/Admin/SubCategory/Add_SubCategory_Hook";

function AdminAddSubCategory() {
const [isOpenConfirmModal,name,category,isPosting ,categories,isError,isLoading,handleCloseModal,handleShowModal,onChangeName,onChangeCategory,handleSubmit]  = AddSubCategoryHook()
    return (
        <div className="flex items-center justify-center">
            <Button
                onClick={handleShowModal}
                className="w-46 btn btn-outline capitalize btn-success">
                <i className="fa-solid fa-plus text-lg"></i>
                Add SubCategory
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={handleCloseModal}
                onSubmit={handleSubmit}
                title="Add Sub-Category"
                add={isPosting ? 'Loading...' : 'Add Sub-Category'}
            >
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    Sub-Category:
                    <input
                        type="text"
                        value={name}
                        onChange={onChangeName}
                        className="grow capitalize placeholder:text-zinc-500 text-gray-700"
                        placeholder="Type here" />
                </label>
                <select
                    value={category}
                    onChange={onChangeCategory}
                    className="select select-info w-full text-lg capitalize text-zinc-600">
                    <option value="" disabled>Main Category</option>
                    {!isLoading && !isError && categories && categories.data.map((category: IData) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </Modal>
        </div>
    );
}

export default AdminAddSubCategory;

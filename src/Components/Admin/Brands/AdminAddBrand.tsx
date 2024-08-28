import Button from "../../../UI-items/Button"
import { useState } from "react";
import Modal from "../../../UI-items/Modal";
import Image from "../../../UI-items/Image";

function AdminAddBrand() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [img, setImg] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };
    return (
        <div className="flex items-center justify-center">
            <Button onClick={() => setIsOpenConfirmModal(true)} className="w-46 btn btn-outline capitalize btn-success"> <i className="fa-solid fa-plus text-lg"></i>  add brand</Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={() => setIsOpenConfirmModal(false)}
                title="Add brand"
                add="Add brand"
            >
                <div className="flex gap-5 items-center justify-start border-2 rounded-lg py-2 scroll">
                    <div>
                        <label htmlFor="upload-photo">
                            <div className="py-3 px-3 border-r-2 cursor-pointer text-center">
                                <span className="text-xl"><i className="fa-regular fa-images"></i></span>
                                <div className="capitalize text-blue-700 mt-3">Click to Upload</div>
                            </div>
                        </label>
                        <input type="file" id="upload-photo" multiple onChange={onImageChange} className="hidden" />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Image url={img} alt="" className="h-24 rounded-md cursor-pointer" />
                    </div>
                </div>
                <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                    brand Title:
                    <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Type here" />
                </label>
            </Modal>
        </div>
    )
}

export default AdminAddBrand

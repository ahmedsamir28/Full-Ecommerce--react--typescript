import { useState } from "react";
import Button from "../../../../UI-items/Button";
import Modal from "../../../../UI-items/Modal";
import Image from "../../../../UI-items/Image";

function AdminAddProduct() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file) as string);
            setImages(prevImages => prevImages.concat(fileArray));
        }
    };

    const removeImage = (url: string) => {
        setImages(prevImages => prevImages.filter(image => image !== url));
    };

    return (
        <div className="flex items-center justify-center">
            <Button onClick={() => setIsOpenConfirmModal(true)} className="w-46 btn btn-outline capitalize btn-success">
                <i className="fa-solid fa-plus text-lg"></i> add product
            </Button>
            <Modal
                isOpen={isOpenConfirmModal}
                closeModal={() => setIsOpenConfirmModal(false)}
                title="title of the modal"
                add="add product"
            >
                <div className="flex flex-col items-center justify-center">
                    <input type="file" id="file" multiple onChange={handleImageUpload} className="mb-4" />
                    <div className="flex space-x-2">
                        {images.map((photo, index) => (
                            <Image url={photo} key={index} onClick={() => removeImage(photo)}
                                alt="" className="w-24 h-24 object-cover rounded-md cursor-pointer" />
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminAddProduct;

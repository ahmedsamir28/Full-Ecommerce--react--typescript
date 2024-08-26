import React, { ReactNode } from 'react';
import Button from './Button';


interface IProps {
    isOpen: boolean
    title?: string
    add:string
    children: ReactNode
    closeModal: () => void

}
function Modal({ isOpen, closeModal, title,add,children }: IProps) {

    const open: boolean = true
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If the clicked element is the overlay (i.e., not the modal content itself), close the modal
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            {/* Main modal */}
            {open && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 "
                    onClick={handleOverlayClick}
                >
                    <div className="relative w-full max-w-2xl p-4 max-h-full overflow-auto">
                        {/* Modal content */}
                        <div className="relative bg-slate-100 rounded-lg shadow ">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5">
                                <h3 className="text-lg font-normal text-gray-700 capitalize">
                                    {title}
                                </h3>
                            </div>

                            {/* Modal body */}
                            <div className="p-4 md:p-5 border-2 space-y-4">
                                {children}
                            </div>

                            {/* Modal footer */}
                            <div className="flex gap-3 items-start justify-end p-4 md:p-5 ">
                                <Button onClick={closeModal} className="btn btn-outline btn-success capitalize border-2">
                                    {add}
                                </Button>
                                <Button
                                    onClick={closeModal}
                                    className="btn btn-outline btn-ghost capitalize border-2"
                                >
                                    close
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;

interface ModalCardProps {
    message: string;
    isOpen: boolean;
    onConfirm: (result: boolean) => void;
}

const ModalCard = ({ message, isOpen, onConfirm }: ModalCardProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border-2 border-yellow-500 p-6 rounded-2xl w-full max-w-xs shadow-2xl text-center">
                <p className="text-white text-lg font-medium mb-6 leading-relaxed">
                    {message}
                </p>
                <div className="flex flex-row gap-3">
                    <button
                        onClick={() => onConfirm(false)}
                        className="flex-1 py-2.5 rounded-xl bg-gray-600 text-white font-semibold active:scale-95 transition-transform"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(true)}
                        className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold active:scale-95 transition-transform"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCard;
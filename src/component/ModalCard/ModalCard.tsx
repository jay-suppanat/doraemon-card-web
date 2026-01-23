import { useState, useEffect } from "react";

interface ModalCardProps {
    message: string;
    command: Record<string, string>;
    cardName: Record<string, string>;
    isOpen: boolean;
    onSuccess: (result: Record<string, string> | null) => void;
}

const ModalCard = ({ message, command, cardName, isOpen, onSuccess }: ModalCardProps) => {
    const [localData, setLocalData] = useState<Record<string, string>>(command);

    const displayOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "j", "q", "k", "a"];

    useEffect(() => {
        if (isOpen) {
            setLocalData(command);
        }
    }, [command, isOpen]);

    if (!isOpen) return null;

    const handleChange = (key: string, value: string) => {
        setLocalData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border-2 border-yellow-500 p-6 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col max-h-[90vh]">
                <p className="text-white text-lg font-medium mb-6 text-center">
                    {message}
                </p>

                {/* ส่วนรายการ Input พร้อม Custom Scrollbar */}
                <div className="space-y-4 mb-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-zinc-800">
                    {displayOrder.map((key) => {
                        const value = localData[key];
                        // ถ้าไม่มีข้อมูลใน Key นั้นให้ข้ามไป (ป้องกัน Error กรณีข้อมูลไม่ครบ)
                        if (value === undefined) return null;

                        return (
                            <div key={key} className="text-left">
                                <label className="text-yellow-500 text-xs uppercase font-bold mb-1 block">
                                    {cardName[key] || `ไพ่ ${key.toUpperCase()}`}
                                </label>
                                <textarea
                                    value={value}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    rows={value.includes('\n') ? 3 : 1}
                                    className="w-full bg-black border border-zinc-700 text-white p-2 rounded-lg focus:border-yellow-500 outline-none transition-colors resize-none text-sm"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-row gap-3 mt-auto">
                    <button
                        onClick={() => onSuccess(null)}
                        className="flex-1 py-2.5 rounded-xl bg-gray-600 text-white font-semibold active:scale-95 transition-transform"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSuccess(localData)}
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
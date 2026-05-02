import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearNotification } from '../../Slice/AuthSlice';

export default function Notification({ message, show, status, duration = 3000, onClear }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!show) return;
        const timer = setTimeout(() => {
            if (onClear) {
                dispatch(onClear());
            } else {
                dispatch(clearNotification());
            }
        }, duration);
        return () => clearTimeout(timer);
    }, [message, show, status, duration, dispatch, onClear]);

    if (!show) return null;

    const styles = {
        success: {
            container: "bg-green-50 border-green-200 text-green-800",
            icon: "text-green-500 border-green-500",
            close: "text-green-600"
        },
        error: {
            container: "bg-red-50 border-red-200 text-red-800",
            icon: "text-red-500 border-red-500",
            close: "text-red-600"
        }
    };

    const current = styles[status] || styles.success;

    return (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex items-center gap-4 w-[340px] p-4 rounded-2xl border animate-slideIn ${current.container}`}>

            {/* Icon */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold ${current.icon}`}>
                {status === "success" ? "✓" : "!"}
            </div>

            {/* Content */}
            <div className="flex-1">
                <p className="font-semibold text-sm">{status === "success" ? "Success" : "Error"}</p>
                <p className="text-xs opacity-80">{message}</p>
            </div>

            {/* Close */}
            <button
                onClick={() => {
                    if (onClear) {
                        dispatch(onClear());
                    } else {
                        dispatch(clearNotification());
                    }
                }}
                className={`text-lg hover:opacity-70 ${current.close}`}
            >
                ×
            </button>
        </div>
    );
}
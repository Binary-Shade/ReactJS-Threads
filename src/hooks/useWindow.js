import { useEffect, useState } from "react";

const useWindow = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const updateWindowSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", updateWindowSize);
        updateWindowSize();

        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    return size;
};

export default useWindow;

import { useEffect, useState, ReactNode } from "react";

interface CelestialBodyProps {
    name: string;
    className: string;
    children?: ReactNode;
    isSun?: boolean;
}

function CelestialBody({ name, className, children, isSun }: CelestialBodyProps) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (hovered) {
            timeout = setTimeout(() => setVisible(true), 0);
        } else {
            timeout = setTimeout(() => setVisible(false), 700); // délai 700ms
        }

        return () => clearTimeout(timeout);
    }, [hovered]);

    return (
        <div
            className={`${isSun ? "" : "planet"} ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={`celestial-body-tooltip ${visible ? "visible" : "hidden"}`}>
                {name}
            </div>
            {children}
        </div>
    );
}

export default CelestialBody;

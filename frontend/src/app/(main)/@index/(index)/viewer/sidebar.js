import { useRef } from "react";

const SidebarAps = () => {


    const sidebar3DRef = useRef(null);
    return (
        <>
            <div id="sidebar">
                <div ref={sidebar3DRef} id="tree"></div>
            </div>
        </>
    )
}
export default SidebarAps
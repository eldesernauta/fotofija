// LoaderWrapper.jsx
import { createPortal } from "react-dom";
import Loader from "./loader";

const LoaderWrapper = ({ onFinish }) => {
    return createPortal(<Loader onFinish={onFinish} />, document.body);
};

export default LoaderWrapper;

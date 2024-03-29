import { AiOutlineLoading } from "react-icons/ai";
import layoutStyles from "../styles/Layout.module.css";

function Loader() {
  return (
    <div className={layoutStyles.loader}>
      <AiOutlineLoading />
    </div>
  );
}

export default Loader;

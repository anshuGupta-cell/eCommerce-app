import { useSelector } from "react-redux";
import "./spinner.css"

const Spinner = () => {

    const isLoading = useSelector((state) => state.loader.loading)

    return (
        <>
            {isLoading && <svg className="mx-auto spinner-svg">
                <circle cx="30" cy="30" r="30"></circle>
            </svg>}
        </>
    )
}

export default Spinner;
import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {
                user?.id ?
                    <>{props.children}</> :
                    // <Navigate to={"/login"} replace />
                    <Result
                        status="403"
                        title="Unauthorized"
                        subTitle={"You need to login to access this asset!!!"}
                        extra={<Button type="primary"><Link to={'/'}>Back Home</Link></Button>}
                    />
            }
        </>
    );
}

export default PrivateRoute
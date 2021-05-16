import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.log(error))

    }, []);
    return <h1>Dashboard: {user?.email}</h1>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    try {
        const response = await apiClient.get('/me')

        console.log(response.data);
    } catch (error) {
        console.log(error);
        // destroyCookie(ctx, 'nextauth.token')
        // destroyCookie(ctx, 'nextauth.refreshToken')

        // return {
        //     redirect: {
        //         destination: '/',
        //         permanent: false,
        //     }
        // }
    }

    return {
        props: {}
    }
})
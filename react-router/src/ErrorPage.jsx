import { useRouteError } from 'react-router-dom'

const ErroPage = () => {
    const err = useRouteError()

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an enexpected error has occured.</p>
            <p>
                <i>{err.statusText || err.message}</i>
            </p>
        </div>
    )
}

export default ErroPage
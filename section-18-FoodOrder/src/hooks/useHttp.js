import React, { useCallback, useEffect, useState } from 'react'

const sendHttpRequest = async (url, config) => {
    const res = await fetch(url, config)

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong, failed to send request.')
    }

    return data;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const clearData = () => setData(initialData)

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true)
        try {
            const res = await sendHttpRequest(url, { ...config, body: data })
            setData(res)
        } catch (error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false)
    }, [url, config])

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest()
        }
    }, [sendRequest, config])

    return {
        data,
        error,
        isLoading,
        sendRequest,
        clearData
    }
}

export default useHttp
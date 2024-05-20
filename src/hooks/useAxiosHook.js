import { useEffect, useState } from "react"
import axios from "axios"

const useAxiosHook = (baseUrl) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source()
        console.log(source);
        const axiosFetch = async (baseUrl) => {
            setIsLoading(true)
            try {
                const response = await axios.get(baseUrl, {
                    cancelToken: source.token
                })
                if(isMounted){
                    setData(response.data)
                    isError(null)
                }
            }catch(error){
                setIsError(error.message)
            }finally {
                setIsLoading(false)
                isMounted  = false
            }

        }
        axiosFetch(baseUrl)

        const cleanup = () => {
            isMounted = false
            source.cancel()
        }
        return ()=> cleanup()
    }, [baseUrl])
    return {data, isLoading, isError}
}

export default useAxiosHook
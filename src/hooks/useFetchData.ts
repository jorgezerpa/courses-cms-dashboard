import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookie from 'js-cookie'

export const useFetchData = (method:string, url:string, params?:any, body?:any) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [result, setResult] = useState<null|any>(null)
    const [triggerRefetch, setTriggerRefetch] = useState(false) // value is not important, just toggle true-false to fireup the refetch (this is on the useEffect dependencies)

    const restart = () => { // should reestart before refetch 
        setIsSuccess(false)
        setIsLoading(true)
        setIsError(false)
        setResult(null)
    }

    const refetch = () => {
        restart()
        setTriggerRefetch(!triggerRefetch)
    }


    useEffect(() => {
        (async()=>{
            try {
                let accessToken = Cookie.get('accessToken')
                if(!accessToken){
                    const newAccessToken = await axios.get('/api/auth/getAccessToken')
                    if(!newAccessToken) {
                        setIsLoading(false)
                        setIsError(true)
                        return
                    }
                    Cookie.set('accessToken', newAccessToken.data)
                    accessToken = newAccessToken.data
                }
                const result = await axios.request({
                  url: url,
                  headers: {
                      'authorization': `Bearer ${accessToken}`
                  },
                  method: method,
                  params: params ? params : {},
                  data: body ? body : {}, 
                })
                setIsLoading(false)
                setResult(result.data.data)
                setIsSuccess(true)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(error)
            }
        })()      
    }, [triggerRefetch])
    
    return {
        isError,
        isLoading,
        isSuccess,
        result,
        refetch,
    }
}
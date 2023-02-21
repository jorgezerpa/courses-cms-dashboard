import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookie from 'js-cookie'

const BASE_URL = 'http://localhost:3001/api/v1'

// CREATE A TRIGGGER STATE, SET ON TRUE TO FIRE IT UP, AND FALSE WHEN END THE REQUEST
//FOR THIS, YOU NEED TO PASS IT AS A DEPENDENCY OF THE USE EFFECT

export const useFetchDataOnTrigger = (method:string, url:string) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [result, setResult] = useState<null|any>(null)
    const [body, setBody] = useState({})
    const [params, setParams] = useState({})
    const [trigger, setTrigger] = useState(false)

    //call this function to set all values as initial
    // for example -> when query was made successfully, execute this to set all as initial and make another query (or get ready for it)
    const restartFetch = () => {
        setIsSuccess(false)
        setIsLoading(false)
        setIsError(false)
        setResult({})
        setBody({})
        setParams({})
        setTrigger(false)
    }

    useEffect(() => {
        (async()=>{
            try {
                if(trigger){
                    setIsError(false) // on recall after prev error
                    setIsLoading(true)
                    let accessToken = Cookie.get('accessToken')
                    if(!accessToken){
                        const newAccessToken = await axios.get('/api/auth/getAccessToken')
                        if(!newAccessToken) {
                            setIsError(true)
                            setIsLoading(false)
                            console.log('fail getting accessToken on useFetchDataOnTrigger hook')
                            return
                        }
                        Cookie.set('accessToken', newAccessToken.data)
                        accessToken = newAccessToken.data
                    }
                    const result = await axios.request({
                      baseURL: BASE_URL,
                      url: url,
                      headers: {
                          'authorization': `Bearer ${accessToken}`
                      },
                      method: method,
                      params: params,
                      data: body, 
                    })
                    setIsLoading(false)
                    setTrigger(false)
                    setResult(result.data)
                    setIsSuccess(true)
                }
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                setTrigger(false)
                setIsSuccess(false)
                console.log(error)
            }
        })()      
    }, [trigger])
    
    return {
        isError,
        isLoading,
        isSuccess,
        result,
        fireUp: (body?:any, params?:any) => {
            body && setBody(body)
            params && setParams(params)
            setTrigger(true)
        },
        restartFetch,
    }
}
import { useRef, SyntheticEvent } from 'react'

type getFormInfoType = [jsonData:any, formData:FormData]

const useForm = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const getFormInfo = (e:SyntheticEvent):getFormInfoType => {
        e.preventDefault() // this is the only reason to pass the event as params
        const formData = new FormData(formRef.current as HTMLFormElement)
        let jsonData:any= {}
        formData.forEach((value, key)=>jsonData[key]=value)
        return [jsonData, formData]
    }        
    return { formRef, getFormInfo }
}

export { useForm }
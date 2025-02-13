import { useEffect, useState } from 'react'
import { instance } from '../hooks/instance'

const getRequest = (api, isObj, refresh) => {
    const [data, setData] = useState(isObj ? {} : [])

    useEffect(() => {
        instance().get(api).then(res => setData(res.data))
    }, [refresh])

    return data
}

export default getRequest
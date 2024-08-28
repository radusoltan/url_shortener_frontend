import useSWR from 'swr'
import axios from '@/lib/axios'
import { useSearchParams } from 'next/navigation'

export const useUrls = ()=>{
    const searchParams = useSearchParams()
    const page = searchParams.has('page') ? searchParams.get('page') : 1
    const {data, mutate } = useSWR(`/api/user/urls?page=${page}`, async ()=>{

        const response = await axios.get(`/api/urls?page=${page}`)
        return response.data

    })

    const editUrl = ({url,data})=>{
        axios.put(`/api/urls/${url}`, { original_url: data })
            .then(() => mutate())
    }

    const addUrl = ({ url }) => {

        axios.post('/api/urls', {url})
            .then(() => mutate())

    }

    const deleteUrl = ({url}) => {
        axios.delete(`/api/urls/${url}`)
            .then(()=>mutate())
    }

    return {
        data,
        addUrl, deleteUrl, editUrl
    }
}

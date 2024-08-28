import useSWR from 'swr'
import axios from '@/lib/axios'

export const useUrls = ()=>{
    const {data, mutate } = useSWR('/api/user/urls', async ()=>{

        const response = await axios.get('/api/urls')
        return response.data

    })

    const editUrl = ({url,data, success})=>{
        axios.put(`/api/urls/${url}`, { original_url: data })
            .then(() => mutate())
    }

    const addUrl = ({ url, success }) => {

        axios.post('/api/urls', {url})
            .then(res => mutate())

    }

    const deleteUrl = ({url, success}) => {
        axios.delete(`/api/urls/${url}`)
            .then(()=>mutate())
    }

    return {
        data,
        addUrl, deleteUrl, editUrl
    }
}

"use client"
import { useUrls } from '@/hooks/urls'
import { useState } from 'react'
import { NewUrl } from '@/components/Urls/New'
import { EditUrl } from '@/components/Urls/Edit'

const Urls = ()=>{
    const {data, addUrl, deleteUrl} = useUrls()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState(null)

    return <>
        <button
            type="button"
            data-autofocus
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
            Add
        </button>

        <NewUrl open={open} close={()=>setOpen(false)} setSelectedUrl={setSelectedUrl} />

        {isEdit && <EditUrl url={selectedUrl} open={isEdit} close={()=>setIsEdit(false)} />}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Shortened
                    </th>
                    <th scope="col" className="px-6 py-3"> </th>
                </tr>
                </thead>
                <tbody>
                {
                    data?.data.map(url => <tr key={url.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                        <td className="px-6 py-4">
                            {url.original_url}
                        </td>
                        <td className="px-6 py-4">
                            <a href={process.env.NEXT_PUBLIC_BACKEND_URL +'/'+url.shortened_url} target="_blank" rel="noopener noreferrer">
                                {url.shortened_url}
                            </a>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={()=>{
                                setIsEdit(true)
                                setSelectedUrl(url)
                            }}
                               className="font-medium mx-5 text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <button onClick={()=>{
                                deleteUrl({ url: url.id })
                            }}
                               className="font-medium mx-5 text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    </>
}

export default Urls;

"use client"
import { useUrls } from '@/hooks/urls'
import { useState } from 'react'
import { NewUrl } from '@/components/Urls/New'
import { EditUrl } from '@/components/Urls/Edit'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/navigation'

const Urls = ()=>{
    const {data, deleteUrl} = useUrls({page: 1})
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState(null)
    const router = useRouter()

    const handlePageChange = page => {

        router.push(`/dashboard?page=${page.selected +1}`)

    }

    // Calculation of pages count according received data
    const pageCount = Math.ceil(data?.meta.total / 15)

    //Calculation of initial page according received data
    const initialPage = Number(data?.meta.current_page) - 1

    return <>
        {/* Open Modal for Adding new URL */}
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
            Add
        </button>


        {/* New URL Modal */}
        <NewUrl open={open} close={()=>setOpen(false)} setSelectedUrl={setSelectedUrl} />


        {/* Edit URL modal */}
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
                            {/* redirection from the shortened URL to the specified target URL */}
                            <a href={process.env.NEXT_PUBLIC_BACKEND_URL +'/'+url.shortened_url} target="_blank">
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
            <div className="mt-5">
                <ReactPaginate
                    onPageChange={handlePageChange}
                    initialPage={initialPage}
                    activeClassName="text-white bg-blue-500"
                    pageCount={pageCount}
                    breakLabel="..."
                    nextLabel={'->'}
                    pageRangeDisplayed={5}
                    previousLabel={'<-'}
                    containerClassName="inline-flex -space-x-px text-sm"
                    pageClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    breakLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    previousClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    nextClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    renderOnZeroPageCount={true}
                />
            </div>
        </div>
    </>
}

export default Urls;

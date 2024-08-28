import { Dialog } from '@headlessui/react'
import { useUrls } from '@/hooks/urls'
import { useState } from 'react'

export const EditUrl = ({url, close, open})=>{
    const {editUrl} = useUrls()
    const [urlOriginal, setUrlOriginal] = useState(url.original_url)

    const handleSubmit = formData => {

        editUrl({url: url.id, data: formData.get('url'), success: close()})


    }

    return <Dialog open={open} onClose={close} className="relative z-10">
        <Dialog.Backdrop
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <form action={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">URL</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        This is a form for adding/editing URLs, which must be shortened
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                URL
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                    <input
                                                        id="url"
                                                        name="url"
                                                        type="text"
                                                        placeholder="Place yout URL"
                                                        value={urlOriginal}
                                                        onChange={e=>{
                                                            setUrlOriginal(e.target.value)
                                                        }}
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        isEdit ? setIsEdit(false) : setOpen(false)
                                    }}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Dialog.Panel>
            </div>
        </div>
    </Dialog>
}

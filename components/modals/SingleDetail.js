import React from 'react';
import Article from '../article';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleDetail({ open, data, handleModal, isSave = true }) {

    const { full_name, username, biography, profile_pic_url, is_business_account, is_private, external_url, edge_owner_to_timeline_media } = data;

    function handleSave() {
        if (isSave) {
            fetch('/api/profiles/new', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, body: JSON.stringify(data)
            }).then(async res => {
                console.log(await res.json());
                toast.success("Successfully saved profile!");
                setTimeout(() => {
                    handleModal(false);
                }, 3000)
            }).catch(err => {
                console.log(err);
                toast.error("error on saving profile!");
            })
        }

    }
    return (<>
        <ToastContainer />
        {open && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>


                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start gap-2">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-32 w-32 rounded-full bg-green-100 sm:mx-0 sm:h-32 sm:w-32">
                                    {/* Heroicon name: exclamation */}
                                    <img className="h-28 w-28 rounded-full" src={profile_pic_url} alt="" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0  sm:text-left ">
                                    <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Account Details:
            </h3>
                                    <div className="ml-4 mt-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {full_name}
                                        </div>
                                        <p className="text-sm text-gray-500 break-words pr-16 whitespace-pre-wrap mb-4">
                                            {biography}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-imgs">
                                <div className="overflow-y-auto grid gap-2 grid-cols-3 max-h-full px-6 py-4" >
                                    {edge_owner_to_timeline_media.edges.length > 0 &&
                                        edge_owner_to_timeline_media.edges.map((item, i) => (
                                            <div className={`m-auto mt-10 hover:z-50 `} key={i}>
                                                <div className="h-32 w-32 relative cursor-pointer mb-5">
                                                    <div className="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"><img src={item.node.display_url} /></div>
                                                    <div className="absolute inset-0 transform hover:rotate-360 hover:scale-150 transition duration-300">
                                                        <div className="group h-full w-full bg-white rounded-lg shadow-2xl">
                                                            <Article data={item.node} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button disabled={!isSave} type="button"
                                onClick={() => handleSave()}
                                className={isSave ? `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`
                                    : `cursor-default opacity-30 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}>
                                Save
        </button>
                            <button type="button"
                                onClick={() => handleModal(false)}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
        </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default SingleDetail;
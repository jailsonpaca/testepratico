import { useState } from 'react';
import SingleDetail from './modals/SingleDetail';


function SingleProfile({ data }) {

    const [modalOpen, setModalOpen] = useState(false);
    const { full_name, username, biography, profile_pic_url, is_business_account, is_private, external_url } = data;

    function handleModal(value) {
        setModalOpen(value);
    }

    return (<>
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <SingleDetail open={modalOpen} isSave={false} data={data} handleModal={handleModal} />
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={profile_pic_url} alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {biography}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{username}</div>
                <div className="text-sm text-gray-500">{is_private ? 'Private' : 'Not Private'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {is_business_account ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Business Account
                    </span>
                ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Regular Account
                        </span>
                    )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={external_url ? external_url : "#"}>{external_url}</a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button href="#" onClick={() => handleModal(true)}
                    className="text-indigo-600 hover:text-indigo-900">Open</button>
            </td>
        </tr>
    </>
    );
}

export default SingleProfile;
import { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import SingleProfile from '../components/SingleProfile';
import ClipLoader from "react-spinners/ClipLoader";

const fetcher = url => fetch(url).then(r => { console.log(r); return r.json() }).catch((e) => { console.log(e); return e })

//PESQUISA DE USUÁRIOS
export default function Profiles() {

    const { data, isValidating } = useSWR(`api/profiles/list`, fetcher);

    return (
        <div>
            <Head>
                <title>Teste Prático - Profiles</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <ClipLoader
                                    css="margin:40px auto;display: block;"
                                    size={250}
                                    color={"#123abc"}
                                    loading={isValidating} />
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name/Description
              </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Username/Private
              </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Account Type
              </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Link
              </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data && data.length > 0 && data.map((item, i) => (
                                            <SingleProfile key={i} data={item} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/*-- /End replace */}
            </div>
        </div>
    )
}

import { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import SingleSearch from '../components/SingleSearch';
import ClipLoader from "react-spinners/ClipLoader";

const fetcher = url => fetch(url).then(r => { return r.json() }).catch((e) => {
  console.log(e);
  throw e;
})


//PESQUISA DE USUÁRIOS
export default function Home() {
  const [term, setTerm] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error, isValidating } = useSWR(!shouldFetch && term === '' ? null : `https://www.instagram.com/${term}/?__a=1`, fetcher);

  function handleClickSearch() {
    setShouldFetch(true);
  }

  const handleInputChange = (e) => {
    e.persist();
    setTerm(e.target.value);
  }

  return (
    <div>
      <Head>
        <title>Teste Prático - Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/*-- Replace with your content */}
        <div className="px-4 md:m-auto w-full md:w-1/2 text-center ">
          <label htmlFor="price" className="block font-medium text-3xl text-gray-700 pb-6">Search new user</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                Username:
      </span>
            </div>
            <input type="text" name="price" id="price"
              onChange={handleInputChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-24 md:pl-20 pr-28 sm:text-sm border-gray-300 rounded-md" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button href="#"
                onClick={() => handleClickSearch()}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
                </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div className="shadow overflow-x-scroll border-b border-gray-200 sm:rounded-lg">
              <ClipLoader
                css="margin:40px auto;display: block;"
                size={250}
                color={"#123abc"}
                loading={isValidating} />
              {error && (<>
                <h1 className="m-4 text-center text-red-600">Ocorreu um erro,
                   talvez você tenha estourado o limite de requests na api pública do instagram(a__?=1).</h1>
                <h4 className="m-4 text-center text-gray-400">Código: <i>{String(error)}</i></h4></>
              )}
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
                  {data && data.graphql && data.graphql.user && (
                    <SingleSearch data={data.graphql.user} />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*-- /End replace */}
      </div>
    </div>
  )
}

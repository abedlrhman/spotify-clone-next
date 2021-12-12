import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create spotify clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="">
        <Sidebar />
        {/* center section */}
      </main>

      <div> 
        {/* player */}
      </div>
      
    </div>
  )
}

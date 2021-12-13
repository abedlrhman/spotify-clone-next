import { useSession } from "next-auth/react"
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react"
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import { signOut } from 'next-auth/react'
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"

const colors = [
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
]

function Center() {

	const { data: session } = useSession()
	const [color, setColor] = useState(null)
	const [isOptionsAvailable, setIsOptionsAvailable] = useState(false)
	const [playlist, setPlaylist] = useRecoilState(playlistState)
	const playlistId = useRecoilValue(playlistIdState)
	const spotifyApi = useSpotify()

	useEffect(() => {
		setColor(shuffle(colors).pop())
	}, [playlistId])	

	useEffect(() => {
		spotifyApi?.getPlaylist(playlistId).then(data => {
			setPlaylist(data.body)
		}).catch(err => {
			console.log('something went wrong!', err)
		})
	}, [spotifyApi, playlistId])

	const optionHandler = (e) => {
		e.stopPropagation()
		setIsOptionsAvailable(true)
	}
		
	return (
		<div className="flex-grow h-screen overflow-y-scroll scrollbar-hide" onClick={() => setIsOptionsAvailable(false)} >
			<header className='absolute top-5 right-8' onClick={optionHandler}>
				{!isOptionsAvailable ? (
					<div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 '>
						{ 
							session?.user.image ? (
								<img 
									src={session?.user.image} 
									className='rounded-full w-10 h-10'
									alt='user avatar'
								/>
							) : (
								<div className='pl-3'>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
									</svg>
								</div>
							)
						}
						<h2>{session?.user.name}</h2>
						<ChevronDownIcon className='h-5 w-5' />
					</div>
					) : (
						<div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-lg overflow-hidden'>
							<ul className='w-full'>
								<li className='hover:bg-gray-900 w-full margin' onClick={signOut}><p className=' p-2 px-4'>logout</p></li>
							</ul>
						</div>
					)
					}
				</header>

			<section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
				<img 
					src={playlist?.images?.[0]?.url} 
					alt=''
					className='h-44 w-44 shadow-2xl'	
				/>
				<div>
					<p>PLAYLIST</p>
					<h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
						{playlist?.name}
					</h1>
				</div>
			</section>
			
			<Songs />
			
		</div>
	)
}

export default Center

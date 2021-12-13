import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

function Song({order, track}) {

	const spotifyApi = useSpotify()
	const {name, album, artists, duration_ms} = track.track
	
	return (
		<div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
			<div className="flex items-center space-x-4">
				<p>{order + 1}</p>
				<img 
					src={album.images[0].url}
					className='h-10 w-10'
				 />
				<div>
					<p className='w-36 lg:w-64 truncate text-white'>{name}</p>
					<p className='w-40 '>{artists[0].name}</p>
				</div>
			</div>
			<div className="flex items-center justify-between ml-auto md:ml-0">
				<p className="hidden md:inline w-40">{album.name}</p>
				<p>{millisToMinutesAndSeconds(duration_ms)}</p>
			</div>
		</div>
	)
}

export default Song

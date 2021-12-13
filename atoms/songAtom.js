import { atom } from 'recoil'

export const currentTrackIdState = atom({
	key: 'currentTrackIdState', // unique ID (with respect to other atoms/selectors)
	default: null, // default value 
})

export const isPlayIngState = atom({
	key: 'isPlayIngState',
	default: false,
})
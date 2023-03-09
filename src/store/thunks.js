import { searchActions } from "./reduxStore"

export const updateMusicians = (nation, token) => {
    return async (dispatch) => {

        try {
            const getCategory = await fetch(`https://api.spotify.com/v1/browse/categories?country=${nation}&limit=3`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }

            })

            if (!getCategory.ok) {
                throw new Error('we couldnt get the categories')
            }

            const cat = await getCategory.json()
            const getCatID = cat.categories.items[1].id

            const getPlaylist = await fetch(`https://api.spotify.com/v1/browse/categories/${getCatID}/playlists?country=${nation}&limit=4`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }

            });

            if (!getPlaylist.ok) {
                throw new Error('we couldnt get the Playlist')
            }

            const parseCatID = await getPlaylist.json();
            const getPlaylistID = parseCatID.playlists.items[0].id

            // Here, i get my five artists by accessing the top 5 tracks on selected Playlist
            //and then picking the artists on those five tracks.
            const getTracks = await fetch(`https://api.spotify.com/v1/playlists/${getPlaylistID}/tracks?country=${nation}&limit=5`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }

            })

            if (!getTracks.ok) {
                throw new Error('we could not get the tracks')
            }

            const parseTracks = await getTracks.json();
            const artistArray = parseTracks.items;
            console.log(artistArray)
            const artistHref = []
            //some of the objects in artistArray are null, so use for of to be 
            //able to skip over those ones that are. 
            //getting the href for the chosen artists
            for (const cur of artistArray) {
                if (cur.track === null) {
                    continue;
                }
                const mainartist = cur.track.artists[0]
                artistHref.push(mainartist.href)
            }
    
            //getting the images and data for the top artists/Updating redux
            const realArtistData =await Promise.all(artistHref.map(async act => {
                const getActDataRequest = await fetch(`${act}`, {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token }
    
                })
                const getActData = await getActDataRequest.json()

              const actImages = getActData.images.map(img => (img.url))
                const actData = {
                    name: getActData.name,
                    href: getActData.href,
                    id: getActData.id,
                    images: actImages
                }
                return actData;
            }))
  
        dispatch(searchActions.setArtists(realArtistData))

        } catch (err) {
            console.log(err)
        }

    }
} 
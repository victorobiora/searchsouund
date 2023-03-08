import SearchNation from '../src/components/Search/SearchNation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TweetWrapper from './components/tweet/TweetWrapper'
import ReadTweet from './components/tweet/tweetcontent/ReadTweet'
import TweetAuth from './components/tweet/tweetcontent/TweetAuth'
import TweetNavBar from './components/tweet/tweetcontent/TweetNavBar'
//import useRequests from './components/customhook/useRequests';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



const clientID = 'e059534c9cfc42d393d39aa22780394a';
const clientSecret = 'bab4f094593f421082c77f211ee43808';
console.log(clientID)

function App() {
 
  const token = useSelector(state => state.token)


  useEffect(() => {
    const T = async () => {

      try {
        //http req to get the access key for the spotify account. pay attention
        //to the parameters in the object passed into the fetch method
        const getToken = await fetch('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret),
          },
          method: 'POST',
          body: 'grant_type=client_credentials'
        });

        if (!getToken.ok) {
          throw new Error('This didnt work')
        }
        //converting http req response from json to normal data
        // and then setting it to token
        //https://api.spotify.com/v1/browse/categories/toplists/playlists?country=US
        // https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=5
        const response = await getToken.json()

        const getCategory = await fetch('https://api.spotify.com/v1/browse/categories?country=NG&limit=3', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + response.access_token }

        })

        if (!getCategory.ok) {
          throw new Error('we couldnt get the categories')
        }

        const cat = await getCategory.json()
        const getCatID = cat.categories.items[1].id

        console.log(cat)
        console.log(getCatID)

        const getPlaylist = await fetch(`https://api.spotify.com/v1/browse/categories/${getCatID}/playlists?limit=4`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + response.access_token }

        });

        if (!getPlaylist.ok) {
          throw new Error('we couldnt get the Playlist')
        }

        const parseCatID = await getPlaylist.json();
        const getPlaylistID = parseCatID.playlists.items[0].id
        console.log(getPlaylistID)

        // Here, i get my five artists by accessing the top 5 tracks on selected Playlist
        //and then picking the artists on those five tracks.
        const getArtists = await fetch(`https://api.spotify.com/v1/playlists/${getPlaylistID}/tracks?limit=5`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + response.access_token }

        })

        if (!getArtists.ok) {
          throw new Error('we could not get the artists')
        }

        const parseTracks = await getArtists.json();
        console.log(parseTracks)
        const artistArray = parseTracks.items;
        console.log(artistArray)
        const p = artistArray.map(e => {
          const mainartist = e.track.artists[0]

          return {
            name: mainartist.name,
            id: mainartist.id,
            href: mainartist.href
          }
        })

        console.log(p)

      } catch (err) {
        console.log(err)
      }

    }

    T();
  }, [])

  const router = createBrowserRouter([
    { path: '/', element: <SearchNation /> },
    {
      path: '/tweet', element: <TweetWrapper>
        <TweetAuth />
        <ReadTweet />
        <TweetNavBar />
      </TweetWrapper>
    }

  ])


  return (
    <RouterProvider router={router} />
  );
}

export default App;

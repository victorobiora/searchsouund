import SearchNation from '../src/components/Search/SearchNation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TweetWrapper from './components/tweet/TweetWrapper'
import ReadTweet from './components/tweet/tweetcontent/ReadTweet'
import TweetAuth from './components/tweet/tweetcontent/TweetAuth'
import TweetNavBar from './components/tweet/tweetcontent/TweetNavBar'
//import useRequests from './components/customhook/useRequests';
import { useEffect, useState } from 'react';



const clientID = 'e059534c9cfc42d393d39aa22780394a';
const clientSecret = 'bab4f094593f421082c77f211ee43808';
console.log(clientID)

function App() {
  const [token, setToken] = useState('')
//const { data, sendRequest } = useRequests()

console.log(clientID + ':' + clientSecret)
  useEffect(()=> {
    const T = async ()=> {

      try{
        //http req to get the access key for the spotify account. pay attention
        //to the parameters in the object passed into the fetch method
          const getToken = await fetch('https://accounts.spotify.com/api/token', {
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret),
            },
            method: 'POST',
            body: 'grant_type=client_credentials'
          });

    if (!getToken.ok){
      throw new Error('This didnt work')
    } 
//converting http req response from json to normal data
// and then setting it to token
    const response = await getToken.json()
       setToken(response.access_token)
      }catch(err){
            console.groupCollapsed(err)
      }

    }

    T();
  }, [])
  console.log(token)

  const router = createBrowserRouter([
    { path: '/', element: <SearchNation/>},
    { path: '/tweet', element: <TweetWrapper> 
          <TweetAuth/>
          <ReadTweet/>
          <TweetNavBar/>
    </TweetWrapper>}

  ])


  return (
    <RouterProvider router={router} />
  );
}

export default App;

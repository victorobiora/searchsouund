import SearchNation from '../src/components/Search/SearchNation'
import { useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TweetWrapper from './components/tweet/TweetWrapper'
import ReadTweet from './components/tweet/tweetcontent/ReadTweet'
import TweetAuth from './components/tweet/tweetcontent/TweetAuth'
import TweetNavBar from './components/tweet/tweetcontent/TweetNavBar'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <SearchNation/>},
    { path: '/tweet', element: <TweetWrapper> 
          <TweetAuth/>
          <ReadTweet/>
          <TweetNavBar/>
    </TweetWrapper>}

  ])

  const search = useSelector(state => state.search);
  console.log(search)
  return (
    <RouterProvider router={router} />
  );
}

export default App;

import SearchNation from "../src/components/Search/SearchNation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TweetWrapper from "./components/tweet/TweetWrapper";
import ReadTweet from "./components/tweet/tweetcontent/ReadTweet";
import TweetAuth from "./components/tweet/tweetcontent/TweetAuth";
import TweetNavBar from "./components/tweet/tweetcontent/TweetNavBar";
//import useRequests from './components/customhook/useRequests';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenAction } from "./store/reduxStore";
import MusicPlayer from "./components/Player/MusicPlayer";
import RootLayout from "./components/customhook/Root";

const clientID = "e059534c9cfc42d393d39aa22780394a";
const clientSecret = "bab4f094593f421082c77f211ee43808";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTokenOnStart = async () => {
      try {
        //http req to get the access key for the spotify account. pay attention
        //to the parameters in the object passed into the fetch method
        const getToken = await fetch("https://accounts.spotify.com/api/token", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
          },
          method: "POST",
          body: "grant_type=client_credentials",
        });

        if (!getToken.ok) {
          throw new Error("This didnt work");
        }

        const response = await getToken.json();

        dispatch(tokenAction.setState(response.access_token));
      } catch (err) {
        console.log(err);
      }
    };

    fetchTokenOnStart();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {index: true, element: <SearchNation/>},
        { path: "prayer", element: <MusicPlayer /> },
        {
          path: "tweet",
          element: (
            <TweetWrapper>
              <TweetAuth />
              <ReadTweet />
              <TweetNavBar />
            </TweetWrapper>
          ),
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;

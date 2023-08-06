import { searchActions } from "./reduxStore";
import { json } from "react-router-dom";

console.log(window.navigator.onLine);

export const updateMusicians = (nation, token) => {
  return async (dispatch) => {
    try {
      dispatch(searchActions.setSpinner());

      const checkP = await fetch(`https://api.spotify.com/v1/browse/categories/toplists/playlists?country=${nation}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      })

      const viewP = await checkP.json()
      console.log(viewP)

      const getCategory = await fetch(
        `https://api.spotify.com/v1/browse/categories?country=${nation}&limit=3`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(getCategory.status);

      if (!getCategory.ok) {
        throw new Error({
          message: "we could not get the categories",
          status: getCategory.status,
        });
      }

      const cat = await getCategory.json();
      console.log(cat)
      const getCatID = cat.categories.items[1].id;

      const getPlaylist = await fetch(
        `https://api.spotify.com/v1/browse/categories/${getCatID}/playlists?country=${nation}&limit=4`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (!getPlaylist.ok) {
        throw new Error({
          message: "we could not get the playlists",
          status: getPlaylist.status,
        });
      }

      const parseCatID = await getPlaylist.json();
      const getPlaylistID = parseCatID.playlists.items[0].id;

      // Here, i get my five artists by accessing the top 5 tracks on selected Playlist
      //and then picking the artists on those five tracks.
      const getTracks = await fetch(
        `https://api.spotify.com/v1/playlists/${getPlaylistID}/tracks?country=${nation}&limit=5`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (!getTracks.ok) {
        throw new Error({
          message: "we could not get the tracks",
          status: getTracks.status,
        });
      }

      const parseTracks = await getTracks.json();
      const artistArray = parseTracks.items;
      console.log(artistArray);
      const artistHref = [];
      //some of the objects in artistArray are null, so use for of to be
      //able to skip over those ones that are.
      //getting the href for the chosen artists
      for (const cur of artistArray) {
        if (cur.track === null) {
          continue;
        }
        console.log(cur);
        const mainartist = cur.track.artists[0];
        const songlink = cur.track.href;
        artistHref.push({
          artistRef: mainartist.href,
          songRef: songlink,
        });
        //  artistHref.push(mainartist.href)
      }
      console.log(artistHref);
      //getting the images and data for the top artists/Updating redux
      const realArtistData = await Promise.all(
        artistHref.map(async (act) => {
          const getActDataRequest = await fetch(`${act.artistRef}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
          });
          const getActData = await getActDataRequest.json();

          const actImages = getActData.images.map((img) => img.url);
          const actData = {
            name: getActData.name,
            href: getActData.href,
            id: getActData.id,
            images: actImages,
            song: act.songRef,
          };
          return actData;
        })
      );

      dispatch(searchActions.setArtists(realArtistData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const songLoader = (arg, token) => {
  return async (dispatch) => {
    const argId = "https://api.spotify.com/v1/tracks/3vLPMgS9AtFGiYm07KMEaP"
    try {
      const getTrack = await fetch(
        argId,  {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      if(!getTrack.ok){
        throw json({message: 'We could not get track', status: 401})
      }
      const getTrackData = await getTrack.json()

      console.log(getTrackData)
    } catch (err) {}
  };
};

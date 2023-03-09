import {configureStore } from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import nationsList from './nationsList'
import {twitterData} from './nationsList'

const searchInitialState = {
    nationsList,
    selectedCountry: 'CA',
    isDataLoaded: false,
    artists: [],
}

const tweetInitialState = {
    twitterData
}

const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {
       pickCountry(state, action){
        state.selectedCountry = action.payload
       },
       setArtists(state, action){
        state.artists = action.payload
        state.isDataLoaded = true;
       }
    }
})

const tweetSlice = createSlice ({
    name: 'twitter',
    initialState: tweetInitialState,
    reducers: {

    }
})

const tokenSlice = createSlice({
    name: 'token',
    initialState: { token: ''},
    reducers: {
        setState(state,action){
            state.token = action.payload
        }
    }

})

export const searchActions = searchSlice.actions;
export const tokenAction = tokenSlice.actions;

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        twitter: tweetSlice.reducer,
        token: tokenSlice.reducer
    }
});

export default store;
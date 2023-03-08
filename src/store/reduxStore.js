import {configureStore } from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import nationsList from './nationsList'
import {twitterData} from './nationsList'

const searchInitialState = {
    nationsList,
    selectedCountry: null,
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
    initialState: '',
    reducers: {
        setState(state,action){
            state = action.payload
        }
    }

})

export const searchActions = searchSlice.actions

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        twitter: tweetSlice.reducer,
        token: tokenSlice.reducer
    }
});

export default store;
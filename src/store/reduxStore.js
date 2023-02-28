import {configureStore } from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import nationsList from './nationsList'
import {twitterData} from './nationsList'

const searchInitialState = {
    nationsList
}

const tweetInitialState = {
    twitterData
}

const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {

    }
})

const tweetSlice = createSlice ({
    name: 'twitter',
    initialState: tweetInitialState,
    reducers: {

    }
})

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        twitter: tweetSlice.reducer
    }
});

export default store;
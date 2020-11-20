import React from 'react';
import axios from 'axios';
import { actions } from '../constants/actions';
import { categories } from '../constants/categories';
import { TMDBContext } from '../stateMangement/provider'
import { BASE_API_URL, API_KEY, BASE_PARAMS} from '../config/api';

import './entryScreen.css';

export default function EntryScreen() {
    const {state, dispatch} = React.useContext(TMDBContext);

    const performSearch = (data: any) => {
        const finalRes = {
            search: data.search,
            category: data.category,
            result: {}
        }
        
        const searchCategory = data.category === categories.MOVIES ? 'movie' : 'tv';
        const url = data.search.length > 2 ? 
            `${BASE_API_URL}/search/${searchCategory}?api_key=${API_KEY}&${BASE_PARAMS}&query=${data.search}` : 
            `${BASE_API_URL}/${searchCategory}/top_rated?api_key=${API_KEY}&${BASE_PARAMS}`;

        axios.get(url).then((res) => {
            finalRes.result = res.data
            dispatch({ type: actions.SEARCH, action: finalRes})
        })
    }

    const handleChange = (value: any) => {
        const searchObject = {
            search: value,
            category: state.category
        }
        performSearch(searchObject)
    }

    return (
        <React.Fragment>
            <div className="App">
                <input
                    type="text"
                    value={state.search}
                    onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                    ): void => handleChange(ev.target.value)}
                />
            </div>
            <div className="results">
                <p>{JSON.stringify(state.result)}</p>
            </div>
        </React.Fragment>
    )
}
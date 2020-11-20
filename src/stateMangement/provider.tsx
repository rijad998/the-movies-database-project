import React, { Dispatch } from 'react';
//import axios from 'axios';
import { actions } from '../constants/actions';
import { categories } from '../constants/categories';
// import { TMDBContext } from './context';
//import { BASE_API_URL, API_KEY, BASE_PARAMS} from '../config/api';

interface Actions {
    type: string;
    action: any;
}

interface IState {
    search: string,
    category: string,
    result: {},
}

const initialState = {
    search: "",
    category: categories.TV_SHOWS,
    result: {},
}

interface IContextProps {
    state: IState,
    dispatch: Dispatch<Actions>
}

function reducer (state: any, action: any) {
    switch (action.type) {
        case actions.SEARCH: {
            return {
                search: action.search,
                category: action.category,
                result: action.result
            }
        }
        default:
            return state
    }
}

export const TMDBContext = React.createContext<IContextProps>({} as IContextProps);

export function ContextProvider(props: any) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <TMDBContext.Provider value={{state, dispatch}}> 
            {props.children} 
        </TMDBContext.Provider>
    )
}

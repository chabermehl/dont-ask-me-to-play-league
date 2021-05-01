import {useEffect, useReducer} from 'react';

import {UseQueryState, UseQueryAction} from './useQuery.type';

const useQuery = (uri: string) => {
  const initialState: UseQueryState = {
    loading: false,
    error: false,
    data: null,
  };

  const reducer = (state: UseQueryState, action: UseQueryAction): UseQueryState => {
    switch (action.type) {
      case 'DATA':
        return {...state, error: false, loading: false, data: action.payload};
      case 'LOADING':
        return {...state, loading: action.payload};
      case 'ERROR':
        return {...state, error: action.payload};
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async (url: string) => {
      const proxyUrl =
        process.env.NODE_ENV === 'development'
          ? url
          : `https://my-next-league-game.netlify.app${url}`;

      dispatch({type: 'LOADING', payload: true});

      try {
        const result = await fetch(proxyUrl, {
          headers: {accept: 'Accept: application/json'},
          mode: 'cors',
        });
        dispatch({type: 'DATA', payload: await result.json()});
      } catch {
        dispatch({type: 'ERROR', payload: true});
      }
    };

    fetchData(uri);
  }, [uri]);

  return {...state};
};

export default useQuery;

export const HIDE_FORM = 'HIDE_FORM';
export const LOAD = 'LOAD';
export const LOAD_TYPES = 'LOAD_TYPES';
export const SET_CURRENT = 'SET_CURRENT';
export const SHOW_FORM = 'SHOW_FORM';

export const hideForm = () => ({
  type: HIDE_FORM,
});

export const showForm = () => ({
  type: SHOW_FORM,
});

const load = list => ({
  type: LOAD,
  list,
});

const loadTypes = types => ({
  type: LOAD_TYPES,
  types,
});

const setCurrent = current => ({
  type: SET_CURRENT,
  current,
});

export const createPokemon = data => async (dispatch) => {
  const response = await fetch(`/api/pokemon`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getPokemon());
    response.data = await response.json();
  }
  return response;
};

export const getOnePokemon = id => async (dispatch) => {
  const response = await fetch(`/api/pokemon/${id}`);

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrent(current));
  }
};

export const getPokemon = () => async (dispatch) => {
  const response = await fetch(`/api/pokemon`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPokemonTypes = () => async (dispatch) => {
  const response = await fetch(`/api/pokemon/types`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadTypes(list));
  }
};


const pokemonReducer = (state = { types: [] }, action) => {
  switch (action.type) {
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }
    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }
    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types,
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }
    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }
    default: return state;
  }
}

export default pokemonReducer;

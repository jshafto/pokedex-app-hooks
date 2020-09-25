import Cookies from 'js-cookie';

export const SET_USER = 'pokedex/authentication/SET_USER';
export const REMOVE_USER = 'pokedex/authentication/REMOVE_USER';

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const login = (email, password) => async dispatch => {
  const response = await fetch(`/api/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { player } = await response.json();
    dispatch(setUser(player));
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch(`/api/session`, {
    method: 'delete'
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

const authReducer = (state = loadUser(), action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user
    }
    case REMOVE_USER: {
      return {};
    }
    default: return state;
  }
}

export default authReducer;

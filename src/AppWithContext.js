import React,{useState} from 'react';
import PokemonContext from './PokemonContext';
import App from './App';


export default AppWithContext = (props) => {
const [pokemon, setPokemon] = useState([]);
const [singlePokemon, setSinglePokemon] = useState(null);
let initialUserId;
if (authToken) {
  try {
    const payload = authToken.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const { data } = payloadObj;
    initialUserId = data.id;
  } catch (e) {
    Cookies.remove("token");
  }
}
const [currentUserId, setCurrentUserId] = useState(initialUserId);
const [needLogin, setNeedLogin] = useState(!currentUserId);
const [authentication, setAuthentication] = setState()

return (
    <PokemonContext.Provider>
        <App {...props}/>
    </PokemonContext.Provider>

)
}

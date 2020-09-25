import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


// class LoginPanel extends Component {
const LoginPanel = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: 'demo@example.com',
  //     password: 'password',
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.updateEmail = this.updateValue('email');
  //   this.updatePassword = this.updateValue('password');
  // }

  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [currentUserId, setCurrentUserId] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const { player } = await response.json();
      props.updateUser(player.id);
      // this.setState({ currentUserId: player.id });
      setCurrentUserId(player.id)
    }
  }

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

//   const updateValue = name => e => {
//     this.setState({ [name]: e.target.value });
//   }

// const updateEmail = () =>{
//   return setEmail()
// }


    if (currentUserId) {
      return <Redirect to="/" />;
    }
    return (
      <main className="centered middled">
        <form onSubmit={handleSubmit}>
          <input type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail} />
          <input type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword} />
          <button type="submit">Login</button>
        </form>
      </main>
    );
  }


export default LoginPanel;

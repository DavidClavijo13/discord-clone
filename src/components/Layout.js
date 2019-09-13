import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';

const socketUrl = 'http://192.168.1.110:3001';
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount() {
    this.initSocket();
  }
  /**************** CONNECTS AND INITIALIZES SOCKET *********************/
  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });
    this.setState({ socket });
  };

  /**************** SETS USER PROPERTIES *********************/
  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  /**************** SETS USER STATE TO NULL *********************/
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { socket } = this.state;
    return (
      <div className='container'>
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}
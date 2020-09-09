import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


import AuthService from "../services/AuthService"
import EventService from "../services/EventService"

import { Switch, Route, Redirect } from 'react-router-dom'

import CustomToast from './ui/Toast'
import NavBar from "./ui/NavBar"
import Footer from "./ui/Footer"


import AuthPage from "./pages/auth-page/"
import ProfilePage from './pages/profile-page'
import CalendarPage from "./pages/calendar-page"
import EventsPage from './pages/events-page'
import HomePage from './pages/home-page'

import EventDetails from './pages/events-page/event-details'

import PersonForm from './pages/profile-page/personProfile/person-form'
import EventForm from './pages/events-page/event-form'

class App extends Component {
  constructor (){
    super ()
    this.state = {
      loggedInUser: null, 
      toast: {
        visible: false,
        text: ''
      },
      loggedInUserEvents: null, 
    }
    this.AuthService = new AuthService()
    this.EventService = new EventService()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user }, () => this.state)
  }

  isTheUserAllowed = (userAllowedId) => this.state.loggedInUser && this.state.loggedInUser._id === userAllowedId

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  handleToast = (visible, text = '') => {
    let toastCopy = { ...this.state.toast }
    toastCopy = { visible, text }
    this.setState({ toast: toastCopy })
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.loggedInUser !== prevState.loggedInUser) {
  //     this.state.loggedInUser.personDetails && 
  //     this.EventService.getAllFutureUserEvents(this.state.loggedInUser._id)
  //       .then(response => this.setState({ loggedInUserEvents: response.data }))
  //       .catch(err => err)
  //   }
  //   this.state.loggedInUserEvents !== prevState.loggedInUserEvents && this.render()
  // }

  render() {
    this.fetchUser()
    return (
      <>
        <NavBar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} handleToast={this.handleToast}/>

        <Switch>       
          <Route path="/signup" render={props => <AuthPage setTheUser={this.setTheUser} {...props} handleToast={this.handleToast}/>}></Route>
          <Route path="/login" render={props => <AuthPage setTheUser={this.setTheUser} {...props} handleToast={this.handleToast}/>}></Route>
          <Route exact path="/" render={() => <HomePage />}/>
         
          <Route exact path="/user/:id/event/create" render={props => this.state.loggedInUser ? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} handleToast={this.handleToast}/> : <Redirect to='/login' />} />
          <Route exact path="/user/:id/event/edit/:eventId" render={props => this.state.loggedInUser ? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} handleToast={this.handleToast}/> : <Redirect to='/login' />} />
          <Route exact path="/events" render={props => <EventsPage loggedInUser={this.state.loggedInUser} {...props} handleToast={this.handleToast}/>} />
          <Route exact path="/user/:userId/events/:eventId" render={props => <EventDetails loggedInUser={this.state.loggedInUser} {...props} handleToast={this.handleToast}/>} />

          <Route path="/profile/edit/:id" render={props => this.isTheUserAllowed(props.match.params.id) ? <PersonForm setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} handleToast={this.handleToast}/>: <Redirect to='/login' />}></Route>
          <Route path="/profile/:userId/calendar" render={props => this.isTheUserAllowed(props.match.params.userId) ? <CalendarPage loggedInUser={this.state.loggedInUser} {...props} handleToast={this.handleToast}/> : <Redirect to='/login' />} />
          <Route exact path="/profile/:userId" render={props => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} {...props} handleToast={this.handleToast}/> : <Redirect to='/login' />} />

        </Switch>
        
        <CustomToast {...this.state.toast} handleToast={this.handleToast} />
        
        {this.state.loggedInUser && this.state.loggedInUser.personDetails && this.state.loggedInUserEvents}
        {!this.state.loggedInUser} 
        
        <Footer />
      </>
    )
  }
}

export default App
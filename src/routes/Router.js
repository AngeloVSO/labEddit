import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FeedPage from '../pages/FeedPage/FeedPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostPage from '../pages/PostPage/PostPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'

const Router = () => {
   return (
    <BrowserRouter>
      <Switch>
          <Route exact path ='/'>
            <LoginPage />
          </Route>

          <Route exact path ='/signup'>
            <SignUpPage />
          </Route>

          <Route exact path ='/feed'>
            <FeedPage />
          </Route>
            
          <Route exact path ='/post/:id'>
            <PostPage />
          </Route>
      </Switch>
    </BrowserRouter>
   ) 
}

export default Router

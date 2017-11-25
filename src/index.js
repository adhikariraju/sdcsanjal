import React,{Component} from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import {ConnectedRouter,routerMiddleware} from 'react-router-redux'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import {reducer} from './reducers'
import thunk from 'redux-thunk'
import Main from './containers/main.jsx';
import App from './containers/App.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'

// material ui themes imports
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lime900,green700,green100,teal400,tealA700,lime50} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();  

const history=createBrowserHistory();

const store=createStore(reducer,applyMiddleware(thunk,...routerMiddleware(history)));



const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: tealA700 
  }
});

const NoMatch=()=>{
  return(
    <h3>Page not Found</h3>
  )
}


class Hello extends Component{
    render(){
        return(
            <Router history={history}>
              <div>
              <Switch>
                <Route path="/dashboard" component={App}/>
                <Route path="/" component={Main}/>
              </Switch>
                </div>
            </Router>
        )
    }
}

const SdcApp = () =>{
  return (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Hello />
  </MuiThemeProvider>
)};

ReactDom.render(
  <Provider store={store}>
    <SdcApp/>
  </Provider>,
 document.getElementById('root')
);
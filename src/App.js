import './App.css';
import Login from './Pages/LoginPage';
import HR from './Pages/HrPage';
import Employee from './Pages/EmployeePage';
import HrRoute from './Components/HrRoute';
import EmployeeRoute from './Components/EmployeeRoute';
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/'  >
              <Redirect to='/login'></Redirect>
            </Route>
            <Route exact path='/login' component={Login}></Route>
            <EmployeeRoute exact path='/employee' component={Employee} ></EmployeeRoute>
            <HrRoute exact path='/hr' component={HR} ></HrRoute>
            <Route path="/**" component={NotFound}></Route>      
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;



import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profile from './screens/Profilescreen';
import Admin from './screens/Adminscreen'
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
        <Navbar/>
      
        <BrowserRouter>
            <Route path="/home" exact component={Homescreen}/>
            <Route path='/book/:treakid' exact component={Bookingscreen}/>
            <Route path="/register" exact component={Registerscreen}/>
            <Route path="/login" exact component={Loginscreen}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/" exact component={Landingscreen}/>
            <Route path="/landing" exact component={Landingscreen}/>
        </BrowserRouter>
    </div>
  );
}

export default App;

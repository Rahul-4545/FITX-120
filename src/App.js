
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalizedTraining from './pages/personalizedTraining';
import NavBar from './pages/NavBar';
import Contact from './pages/Contact'
import Bodyrecompositionpage from './pages/Bodyrecompositionpage'
import About from './pages/About'
import Navcontent from './pages/NavContent'
import WeightlossPage from './pages/Weightlosspage';
import Weightgainpage from './pages/Weightgainpage';
import Addresspage from './pages/Addresspage';
import Forum from './pages/Forum'
import VideoChat from './pages/VideoChat'
import Calories from './pages/Calories'
import Goals from './pages/Goals'
import WorkoutPlan from './pages/WorkoutPlan';
import Navbar1 from './pages/Navbar1'
import Navcontent1 from './pages/Navcontent1'
import Polls from './pages/Polls';
import InCallMessages from './pages/InCallMessages';
import VideoPlayer from './pages/VideoPlayer';


 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
          
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="dash" element={<Dashboard />} />
            <Route path="video" element={<VideoPlayer />} />
      
            <Route path="special" element={<PersonalizedTraining />} />
            <Route path="navbar" element={<NavBar />} />
            <Route path="contact" element={<Contact />} />
            <Route path="loss" element={<WeightlossPage />} />
            <Route path="gain" element={<Weightgainpage />} />
            <Route path="both" element={<Bodyrecompositionpage />} />
            <Route path="about" element={<About/>} />
            <Route path="navcontent" element={<Navcontent/>} />
            <Route path="navcontent1" element={<Navcontent1/>} />
            <Route path="messages" element={<InCallMessages/>} />

            <Route path="polls" element={<Polls/>} />
            <Route path="address" element={<Addresspage/>} />
            <Route path="forum" element={<Forum/>}/>
            <Route path="videochat" element={<VideoChat/>}/>
            <Route path="cal" element={<Calories/>}/>
            <Route path="goal" element={<Goals/>}/>
            <Route path="plan" element={<WorkoutPlan/>}/>
            <Route path='nav1' element={<Navbar1/>}/>

            
            
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

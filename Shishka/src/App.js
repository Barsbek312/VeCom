import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Rating from './components/Rating/Rating';
import EntranceContainer from './components/Entrance/EntranceContainer';
import ProfileVolunteer from './components/ProfileVolunteer/ProfileVolunteer';
import Footer from './components/Footer/Footer';
import ProfileOrg from './components/ProfileOrg/ProfileOrg';
import DescribeOfPost from './components/DescribeOfPost/DescribeOfPost';
import { useEffect } from 'react';
import CreatePost from './components/CreatePost/CreatePost';
import ParticipantsOfEvent from './components/ParticipantsOfEvent/ParticipantsOfEvent';
import Verify from './components/Verify/AcceptVerify/Verify';
import MessageAboutVerify from './components/Verify/MessageAboutVerify/MessageAboutVerify';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/user.js';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [])

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rating' element={<Rating />} />
          <Route path="/entrance" element={<EntranceContainer />} />
          <Route path="/profileVol" element={<ProfileVolunteer />} />
          <Route path="/profileOrg" element={<ProfileOrg />} />
          <Route path="/describePost" element={<DescribeOfPost />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/participantsOfEvent" element={<ParticipantsOfEvent />} />
          <Route path="/messageVerify" element={<MessageAboutVerify />} />
          <Route path="/activate/:uid/:token" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

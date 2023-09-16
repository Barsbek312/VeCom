import React, { useRef } from 'react';
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
import { useEffect, useState } from 'react';
import CreatePost from './components/CreatePost/CreatePost';
import EventsOfOrg from './components/EventsOfOrg/EventsOfOrg';
import Verify from './components/Verify/AcceptVerify/Verify';
import MessageAboutVerify from './components/Verify/MessageAboutVerify/MessageAboutVerify';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/user.js';
import ParticipantsOfEvent from './components/ParticipantsOfEvent/ParticipantsOfEvent';
import Notifications from './components/Notifications/Notifications';
import event from './redux/event';
import Notification from './components/Notifications/Notification/Notification';
import { PDFViewer } from '@react-pdf/renderer';


function App() {

  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);
  const { isAuth, user } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [])

  useEffect(() => {
    if (isAuth === true && user !== null) {

      const socket = new EventSource(`http://127.0.0.1:8000/users/${user?.id}/events/`);

      socket.addEventListener("object_created", (event) => {

        let newNotification = JSON.parse(event?.data)?.text;
        setNotification({ nameOfOrg: newNotification?.[2], nameOfEvent: newNotification?.[1], id: newNotification?.[3], status: newNotification?.[4] });

      })

      socket.onerror = (event) => {
        console.log(event);
      }

      return () => {
        socket.close();
      }
    }

  }, [isAuth, user]);

  useEffect(() => {
    if(notification) {
      setTimeout(() => {
        setNotification(null);
      }, 4000)
    }
  }, [notification])


  // Надо добавить загрузку
  // Надо после выбора последнего элемента из дат закрыть всплывающее окно
  // Надо найти способ как можно обходить yarn build и обновлять веб-приложение
  // Надо добавить кнопку принять всех(поговорить с Эльдосом)
  // Сверстать всплывающее окно загрузки, уведомления и отдельной страницы уведомления
  // Надо добавить проверку, чтобы человек мог  зарегистрироваться если ему/ей от 7-8 лет



  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rating' element={<Rating />} />    
          <Route path="/entrance" element={<EntranceContainer />} />
          <Route path="/profileVol" element={<ProfileVolunteer />} />
          <Route path="/profileOrg/:id" element={<ProfileOrg />} />
          <Route path="/describePost/:id" element={<DescribeOfPost />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/eventsOfOrg" element={<EventsOfOrg />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messageVerify" element={<MessageAboutVerify />} />
          <Route path="/activate/:uid/:token" element={<Verify />} />
          <Route path="/participantsOfEvent/:id" element={<ParticipantsOfEvent />} />
          <Route path="/privacy_policy" element={<PDFViewer />} />
        </Routes>
        {notification && <Notification isAccepted={notification.status} isPopUp={true} nameOfOrg={notification.nameOfOrg} nameOfEvent={notification.nameOfEvent} id={notification.id} />}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

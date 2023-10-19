import * as auth from '../utils/auth';
import api from '../utils/api';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import { useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import ProtectedRoute from './ProtectedRoute';
import { withRouter } from './withRouter'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';


function App() {
    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '', cohort: '' });
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceOpne] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isOkTooltipOpen, setOkTooltipOpen] = useState(false);
    const [isErrorTooltipOpen, setErrorTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isUserOnSignupScreeen, setUserOnSignupScreeen] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    
    useEffect(() => {
      api.getUserInfo().then(setCurrentUser).catch(console.error);
    }, []);

    useEffect(() => {
      api.getCards().then(setCards).catch(console.error);
    }, []);


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        api.changeLikeCardStatus(card._id, !isLiked)
        .then(newCard => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(response => {
          if (response.message === 'Пост удалён') {
            setCards((state) => state.filter((item) => item._id !== card._id));
          }
        })
        .catch(console.error);
    }
  
    // COMMON

    function handleSubmit(request) {
      setIsLoading(true);
      request()
        .then(closeAllPopups)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }

    function handleUpdateUser({name, about}) {
      function makeRequest() {
        return api.patchUserInfo({ name, about }).then(setCurrentUser);
      }
      handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(link) {
      function makeRequest() {
        return api.patchAvatar(link).then(setCurrentUser);
      }
      handleSubmit(makeRequest);
    }

    function handleAddCard(name, link) {
      function makeRequest() {
        return api.postCard({name, link}).then((newCard) => {setCards([newCard, ...cards])});
      }
      handleSubmit(makeRequest);
    }

    function closeAllPopups() {
        setEditProfileOpen(false)
        setAddPlaceOpne(false)
        setEditAvatarOpen(false)
        setImagePopupOpen(false)
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    const checkToken = async (jwt) => {
        return auth.getContent(jwt)
          .then((res) => {
            if (res) {
                setLoggedIn(true);
                setUserEmail(res.data.email);
            }
          })
          .catch((err) => console.log(err))
      };
    
      useEffect(() => {
        const jwt = localStorage.getItem('jwt');
    
        if (jwt) {
            checkToken(jwt);
        }
      }, [loggedIn]);
    
      useEffect(() => {
        if (loggedIn) {navigate('/main')};
      }, [loggedIn]);

      useEffect(() => {
        if (message) {
            setErrorTooltipOpen(true)
        };
      }, [message]);

      useEffect(() => {
        if (!isErrorTooltipOpen) {
            setMessage('');
        };
      }, [isErrorTooltipOpen]);

      const onRegister = (password, email) => {
        return auth.register(password, email)
        .then((res) => {
          return res;
        })
        .catch((err) => {
            if (err === 'Ошибка 400') {
              setMessage('Пользователь с таким email уже существует')
            } else {
            console.log(err)
            }
        })
      };
    
      const onLogin = (password, email) => {
        return auth.authorize(email, password)
        .then((res) => {
            if (res.token) {
                setLoggedIn(true);
                localStorage.setItem('jwt', res.token);
            }
        })
        .catch((err) => {
            if (err === 'Ошибка 401') {
              setMessage('Неверный email или пароль')
            } else {
            console.log(err)
            }
        })
      };

      const onSignOut = () => {
        if (loggedIn) {
            localStorage.removeItem('jwt');
            setLoggedIn(false);
            navigate('/signin')
            }
      };

      const handleCloseErrorTooltip = () => {
        setErrorTooltipOpen(false);
      }

      const handleCloseOkTooltip = () => {
        setOkTooltipOpen(false);
        setUserOnSignupScreeen(false);
      }

    return (
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <CardsContext.Provider value={cards}>
            <div className="page">
              <Header
                loggedIn={loggedIn}
                isUserOnSignupScreeen={isUserOnSignupScreeen}
                setUserOnSignupScreeen={setUserOnSignupScreeen}
                userEmail={userEmail}
                onSignOut={onSignOut}
              />
              <Routes>
                <Route path='/signup' element={
                  <Register
                    onRegister={onRegister}
                    authTitle={"Регистрация"}
                    authButtonText={"Зарегистрироваться"}
                    setUserOnSignupScreeen={setUserOnSignupScreeen}
                    setOkTooltipOpen={setOkTooltipOpen}
                  />
                }/>
                <Route path='/signin' element={
                  <Login
                    onLogin={onLogin}
                    authTitle={"Вход"}
                    authButtonText={"Войти"}
                  />
                }/>
                <Route path='/main' element={<ProtectedRoute loggedIn={loggedIn} component={Main} onEditProfile={() => setEditProfileOpen(true)}
                  onAddPlace={() => setAddPlaceOpne(true)}
                  onEditAvatar={() => setEditAvatarOpen(true)}
                  closeAllPopups={closeAllPopups}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />} />  
                <Route path="*" element={loggedIn ? <Navigate to="/main" /> : <Navigate to="/signin" />}/>
              </Routes>
              <Footer />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddCard={handleAddCard}
              />
              <PopupWithForm
                popupName={'confirm-delete'}
                title={"Вы уверены?"}
                buttonText={"Да"}
              />
              <ImagePopup
                card={selectedCard}
              />
              <InfoTooltip
                tooltipStatus={"Ok"}
                isOpen={isOkTooltipOpen}
                onClose={handleCloseOkTooltip}
              />
              <InfoTooltip 
                tooltipStatus={"Error"}
                isOpen={isErrorTooltipOpen}
                onClose={handleCloseErrorTooltip}
                message={message}
              />
            </div>
          </CardsContext.Provider>
        </CurrentUserContext.Provider>
      </AppContext.Provider>
  );
}

export default withRouter(App);

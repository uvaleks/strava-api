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
import { useState, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import ProtectedRoute from './ProtectedRoute';
import { withRouter } from './withRouter'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { offlineCards } from '../utils/offlineCards';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [statistics, setStatistics] = useState('');
    const [devices, setDevices] = useState([]);
    // ytd_run_totals: Object { count: 73, distance: 877566, moving_time: 318633, … }
    const [cards, setCards] = useState([]);
    const [richRunCards, setRichRunCards] = useState([]);
    const [proxyRichRunCards, setProxyRichRunCards] = useState([]);
    const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceOpne] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isOkTooltipOpen, setOkTooltipOpen] = useState(false);
    const [isErrorTooltipOpen, setErrorTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    // const [isUserOnSignupScreeen, setUserOnSignupScreeen] = useState(false);
    // const [userEmail, setUserEmail] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkTheme, setDarkTheme] = useState(true)

    const navigate = useNavigate();

    const appId = '115268';
    const [accessToken, setAccessToken] = useState('');
    const [jwt, setJwt] = useState('');
    // const [urlAfterRedirect, setUrlAfterRedirect] = useState({});
    const [authorizationCode, setAuthorizationCode] = useState('');
    const [scopes, setScopes] = useState([]);

    const apiAthleteEndpoint = '/api/v3/athlete';
    const apiEndpoint = '/api/v3';
    const oauthEndpoint = '/oauth/token';
    // const athleteId = '31568705';
    const clientSecret = 'a6fe1331fd3494d905bbfe30e0515d1605964b40';
    // const refreshToken = '55b90095312b5107a22b39e69fc7a3535e2c977e';
    

    useEffect(() => {
      if (window.location.pathname === '/exchange_token') {
        setAuthorizationCode(window.location.search.split('code=')[1].split('&')[0]);
        setScopes(window.location.search.split('scope=')[1].split(','));
      }
    }, []);

    const onRegister = () => {

      window.location.assign('http://www.strava.com/oauth/authorize?client_id=' + appId + '&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read');

      // return auth.register(password, email)
      // .then((res) => {
      //   return res;
      // })
      // .catch((err) => {
      //     if (err === 'Ошибка 400') {
      //       setMessage('Пользователь с таким email уже существует')
      //     } else {
      //     console.log(err)
      //     }
      // })
    };

    // console.log(window.location.href);
    // if (window.location.pathname === 'refresh_token?') {
    //   console.log('STOP')
    // } else {
    // window.location.assign('http://www.strava.com/oauth/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read_all');
    // }
    // console.log(window.location.href);


    // useEffect(() => {
    //   if (accessToken === '') {
    //     console.log('Dont have access token yet, so lets fetch it')
    //     fetchNewAccessToken();
    //   } else {
    //     console.log('Already have access token ' + accessToken)
    //   }
    // }, []);

    // const fetchNewAccessToken = () => {
    //   api.getNewAccessToken(oauthEndpoint, clientId, clientSecret, refreshToken)
    //   .then((res) => {
    //     console.log(res);
    //     console.log('Recieve and will set access token ' + res.access_token);
    //     setAccessToken(res.access_token)
    //     console.log(res.access_token + ' was set');
    //   })
    //   .catch(console.error)
    // }

    useEffect(() => {
      if (authorizationCode) {
        api.getAccessToken(oauthEndpoint, appId, clientSecret, authorizationCode)
        .then((res) => {
          setAccessToken(res.access_token);
          localStorage.setItem('jwt', res.access_token);
        })
        .catch(console.error)
      }
    }, [authorizationCode]);

    useEffect(() => {
        if (accessToken) {
        api.getActivities(apiAthleteEndpoint, accessToken)
        .then((res) => {
          setCards(res);
        })
        .catch(console.error)
      }
    }, [accessToken]);

    useEffect(() => {
      if (cards) {
        cards.forEach((card, index) => {
          let count = 0;
          if ((card.type === 'Run') && (index < 3)) {
            count++;
            fetchActivityById(card.id)
          }
          if (count === 1) {
            createRichRunCards();
          }
        });
      };
    }, [cards]);

    const fetchActivityById = (activityId) => {
      api.getActivityById(apiEndpoint, accessToken, activityId)
      .then((res) => {
        if (res.photos.primary) {
          setProxyRichRunCards(proxyRichRunCards.push(res));
        }
      })
      .catch(console.error)
    }

    const createRichRunCards = () => {
      setRichRunCards(proxyRichRunCards);
    }

    useEffect(() => {
      setJwt(localStorage.getItem('jwt'));
    }, []);

    useEffect(() => {
      if (jwt) {
        setAccessToken(jwt);
      }
    }, [jwt]);

    useEffect(() => {
        if (accessToken) {navigate('/main')};
      }, [accessToken]);

    useEffect(() => {
        if (accessToken) {
        api.getAthleteInfo(apiAthleteEndpoint, accessToken)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(console.error)
      }
    }, [accessToken]);

    const onLogout = () => {
      localStorage.removeItem('jwt');
      setAccessToken('');
      navigate('/signup')
    };

    useEffect(() => {
      console.log(Boolean(accessToken))
      console.log(accessToken);
      console.log(Boolean(currentUser.id))
      console.log(currentUser.id);
      if (accessToken && currentUser.id) {
        api.getAthleteStats(apiAthleteEndpoint, currentUser.id, accessToken)
        .then((res) => {
          setStatistics(res);
        })
        .catch(console.error)
      }
    }, [currentUser.id]);
    
    useEffect(() => {
      if (richRunCards) {
        console.log(richRunCards)
        const arr = richRunCards.map(run => run.device_name)
        console.log(arr)
        setDevices(arr)
      }
    }, [richRunCards])

    useEffect(() => {
      if (devices.length === 2) {
        console.log(devices)
      }
    }, [devices]);

    // useEffect(() => {
    //   api.getUserInfo().then(setCurrentUser).catch(console.error);
    // }, []);

    // useEffect(() => {
    //   api.getCards().then(setCards).catch(console.error);
    // }, []);

    // function handleCardLike(card) {
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    //     api.changeLikeCardStatus(card._id, !isLiked)
    //     .then(newCard => {
    //         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //     })
    //     .catch(console.error);
    // }

    // function handleCardDelete(card) {
    //     api.deleteCard(card._id)
    //     .then(response => {
    //       if (response.message === 'Пост удалён') {
    //         setCards((state) => state.filter((item) => item._id !== card._id));
    //       }
    //     })
    //     .catch(console.error);
    // }
  
    // COMMON

    // function handleSubmit(request) {
    //   setIsLoading(true);
    //   request()
    //     .then(closeAllPopups)
    //     .catch(console.error)
    //     .finally(() => setIsLoading(false));
    // }

    // function handleUpdateUser({name, about}) {
    //   function makeRequest() {
    //     return api.patchUserInfo({ name, about }).then(setCurrentUser);
    //   }
    //   handleSubmit(makeRequest);
    // }

    // function handleUpdateAvatar(link) {
    //   function makeRequest() {
    //     return api.patchAvatar(link).then(setCurrentUser);
    //   }
    //   handleSubmit(makeRequest);
    // }

    // function handleAddCard(name, link) {
    //   function makeRequest() {
    //     return api.postCard({name, link}).then((newCard) => {setCards([newCard, ...cards])});
    //   }
    //   handleSubmit(makeRequest);
    // }

    function closeAllPopups() {
        setEditProfileOpen(false)
        setAddPlaceOpne(false)
        setEditAvatarOpen(false)
        setImagePopupOpen(false)
        setSelectedCard(null)
    }

    // function handleCardClick(card) {
    //     setSelectedCard(card)
    // }

    // const checkToken = async (jwt) => {
    //     return auth.getContent(jwt)
    //       .then((res) => {
    //         if (res) {
    //             setLoggedIn(true);
    //             setUserEmail(res.data.email);
    //         }
    //       })
    //       .catch((err) => console.log(err))
    //   };
    
      // useEffect(() => {
      //   const jwt = localStorage.getItem('jwt');
    
      //   if (jwt) {
      //       checkToken(jwt);
      //   }
      // }, [loggedIn]);

      // useEffect(() => {
      //   if (message) {
      //       setErrorTooltipOpen(true)
      //   };
      // }, [message]);

      // useEffect(() => {
      //   if (!isErrorTooltipOpen) {
      //       setMessage('');
      //   };
      // }, [isErrorTooltipOpen]);
    
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

      // const onSignOut = () => {
      //   if (loggedIn) {
      //       localStorage.removeItem('jwt');
      //       setLoggedIn(false);
      //       // navigate('/signin')
      //       }
      // };

      // const handleCloseErrorTooltip = () => {
      //   setErrorTooltipOpen(false);
      // }

      // const handleCloseOkTooltip = () => {
      //   setOkTooltipOpen(false);
      //   setUserOnSignupScreeen(false);
      // }

    return (
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={{ currentUser, statistics }}>
          <CardsContext.Provider value={richRunCards}>
            <div className={`page-wrapper ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
              <div className={`page ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <Header
                  // loggedIn={cards && true}
                  // isUserOnSignupScreeen={isUserOnSignupScreeen}
                  // setUserOnSignupScreeen={setUserOnSignupScreeen}
                  // userEmail={userEmail}
                  // onSignOut={onSignOut}
                  setDarkTheme={setDarkTheme}
                  isDarkTheme={isDarkTheme}
                  onLogout={onLogout}
                  loggedIn={accessToken && true}
                />
                <Routes>
                  <Route path='/signup' element={
                    <Register
                      onRegister={onRegister}
                      authTitle={"Регистрация"}
                      authButtonText={"Зарегистрироваться"}
                      // setUserOnSignupScreeen={setUserOnSignupScreeen}
                      // setOkTooltipOpen={setOkTooltipOpen}
                    />
                  }/>
                  <Route path='/exchange_token' element={
                    <Register
                      onRegister={onRegister}
                      authTitle={"Регистрация"}
                      authButtonText={"Зарегистрироваться"}
                      // setUserOnSignupScreeen={setUserOnSignupScreeen}
                      // setOkTooltipOpen={setOkTooltipOpen}
                    />
                  }/>
                  {/* <Route path='/signin' element={
                    <Login
                      onLogin={onLogin}
                      authTitle={"Вход"}
                      authButtonText={"Войти"}
                    />
                  }/> */}
                  <Route path='/main' element={<ProtectedRoute loggedIn={accessToken} component={Main} onEditProfile={() => setEditProfileOpen(true)}
                    // onAddPlace={() => setAddPlaceOpne(true)}
                    // onEditAvatar={() => setEditAvatarOpen(true)}
                    richRunCards={richRunCards}
                    // closeAllPopups={closeAllPopups}
                    // onCardClick={handleCardClick}
                    setSelectedCard={setSelectedCard}
                    // onCardLike={handleCardLike}
                    // onCardDelete={handleCardDelete}
                    // stats={stats}
                  />} />  
                  <Route path="*" element={accessToken ? <Navigate to="/main" /> : <Navigate to="/signup" />}/>
                </Routes>
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  // onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  // onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  // onAddCard={handleAddCard}
                />
                <PopupWithForm
                  popupName={'confirm-delete'}
                  title={"Вы уверены?"}
                  buttonText={"Да"}
                />
                <ImagePopup
                  selectedCard={selectedCard}
                />
                <InfoTooltip
                  tooltipStatus={"Ok"}
                  isOpen={isOkTooltipOpen}
                  // onClose={handleCloseOkTooltip}
                />
                <InfoTooltip 
                  tooltipStatus={"Error"}
                  isOpen={isErrorTooltipOpen}
                  // onClose={handleCloseErrorTooltip}
                  message={message}
                />
              </div>
            </div>
          </CardsContext.Provider>
        </CurrentUserContext.Provider>
      </AppContext.Provider>
  );
}

export default withRouter(App);

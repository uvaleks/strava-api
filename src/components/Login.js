import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, authTitle, authButtonText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(password, email)
      .then(() => {
          resetForm();
          navigate('/main');
        })
  }

  return (
    <div className="auth">
          <div className="auth__container auth__container_type_login">
            <form
              className="auth__form"
              onSubmit={handleSubmit}
            > 
              <h2 className="auth__title">{authTitle}</h2>
                <input
                  className="auth__input"
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required/>
                <span className="email-error auth__input-error"></span>
                <input className="auth__input"
                  placeholder="Пароль"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required/>
                <span className="password-error auth__input-error"></span>
              <button className="auth__submit-button" type="submit">{authButtonText}</button>
            </form>
          </div>
    </div>
  );
}

export default Login;





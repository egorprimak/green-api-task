import React, {useContext, useEffect, useState} from 'react';
import './Login.css';
import {useFetch} from "../../hooks/useFetch";
import {AccountService} from "../../api/account";
import {LoginDataContext} from "../../context/LoginDataContext";
import Spinner from "../../components/Spinner/Spinner";
import {ACCOUNT_SETTINGS, DASHBOARD_PAGE, LOGIN_DATA} from "../../consts";
import {AccountSettingsContext} from "../../context/AccountSettingsContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({idInstance: '', apiTokenInstance: ''});
    const [formValid, setFormValid] = useState(false);
    const {setLoginData} = useContext(LoginDataContext);
    const {setAccountSettings} = useContext(AccountSettingsContext);
    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();

        const {idInstance, apiTokenInstance} = formData;
        if (!idInstance.trim() || !apiTokenInstance.trim()) {
            return;
        }

        setFormValid(true);
    };

    const [fetch, loading, error] = useFetch(async () => {
        const {idInstance, apiTokenInstance} = formData;
        const response = await AccountService.getSettings(idInstance, apiTokenInstance);

        const lgData = {...formData};
        setLoginData(lgData);
        localStorage.setItem(LOGIN_DATA, JSON.stringify(lgData));

        const settings = response.data;
        setAccountSettings(settings);
        localStorage.setItem(ACCOUNT_SETTINGS, JSON.stringify(settings));

        navigate(DASHBOARD_PAGE);
    });

    useEffect(() => {
        if (!formValid) {
            return;
        }

        fetch();
        setFormValid(false);
    }, [formValid]);

    return (
        <div className="login">
            <div className="login__title">Авторизация</div>
            <form onSubmit={onSubmit} className="login__form">
                <input
                    className="input login__input"
                    value={formData.idInstance}
                    type="text"
                    placeholder="id instance"
                    onChange={e => setFormData({...formData, idInstance: e.target.value})}
                />
                <input
                    className="input login__input"
                    value={formData.apiTokenInstance}
                    type="text"
                    placeholder="api token"
                    onChange={e => setFormData({...formData, apiTokenInstance: e.target.value})}
                />
                <button className="button login__button">Войти</button>
            </form>
            {error && <div className="error-text">{error}</div>}
            {loading &&
                <div className="spinner-wrapper">
                    <Spinner/>
                </div>
            }
        </div>
    );
};

export default Login;

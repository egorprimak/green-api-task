import React, {useContext} from 'react';
import './ProfileInfo.css';
import {FaArrowLeft} from "react-icons/fa";
import {AccountSettingsContext} from "../../context/AccountSettingsContext";
import {LoginDataContext} from "../../context/LoginDataContext";

const ProfileInfo = ({close}) => {
    const {accountSettings} = useContext(AccountSettingsContext);
    const {loginData} = useContext(LoginDataContext);

    return (
        <div className="profile-info">
            <div className="profile-info__header">
                <div className="back-button" onClick={close}>
                    <FaArrowLeft />
                </div>
                <div className="profile-info__title">Профиль</div>
            </div>
            <div className="profile-info__content">
                <div className="profile-info__row">
                    <div className="profile-info__key">wid</div>
                    <div className="profile-info__value">{accountSettings.wid}</div>
                </div>
                <div className="profile-info__row">
                    <div className="profile-info__key">idInstance</div>
                    <div className="profile-info__value">{loginData.idInstance}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;

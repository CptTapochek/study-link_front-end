import style from "./profile.module.css";
import React, { useState, useEffect } from "react";
import {setGlobalState} from "../../state/header";


const Profile = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [validMessage, setValidMessage] = useState({});
    const [passwordVisibleState, setPasswordVisibleState] = useState(false);

    useEffect(() => {
        setGlobalState("headerTitle", "Profile");
    });

    let ChangeImage = (e) => {
        setSelectedImage(e.target.files[0]);
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const onChangeTextInput = (e) => {
        const { name, value } = e.target;
        let message = validMessage;
        switch (name) {
            case "firstName":
                delete message.firstName;
                setFirstName(value.trim());
                break;
            case "lastName":
                delete message.lastName;
                setLastName(value.trim());
                break;
            case "email":
                delete message.email;
                setEmail(value.trim());
                break;
            case "address": setAddress(value.trim()); break;
            case "phone":
                setPhone(value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|<|,/gm, "").trim());
                break;
            case "city": setCity(value.trim()); break;
            case "state": setState(value.trim()); break;
            case "zipCode": setZipCode(value.trim()); break;
            case "country": setCountry(value.trim()); break;
            case "password":
                delete message.password;
                setPassword(value.trim());
                break;
            default:
                break;
        }
        setValidMessage(message);
    };

    const passwordVisible = () => setPasswordVisibleState(!passwordVisibleState);

    const sendDates = async (e) => {
        e.preventDefault();
        let message = {};

        /* Validation */
        if (firstName.length < 3 || firstName.length > 18) {
            message.firstName = "The length of the name must be greater than 3 and less than 18";
        }
        if (lastName.length < 3 || lastName.length > 18) {
            message.lastName = "The length of the name must be greater than 3 and less than 18";
        }
        if(email.length === 0) {
            message.email = "Please fill out this field";
        }
        if (password.length < 8) {
            message.password = "The length of the first name must be greater than 8";
        }
        setValidMessage(message);
    };

    return (
        <div className={style.main}>
            <form className={style.mainUserSettings} onSubmit={sendDates}>
                {/* User avatar */}
                <div className={style.avatarInput}>
                    <label className={style.avatar_upload}>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: "none" }}
                            onChange={ChangeImage}
                        />
                        <i className={style.defaultProfileIcon}></i>
                        <div className={style.default_avatar} id="AvatarForm">
                            {imageUrl && selectedImage && (
                                <img src={imageUrl} className={style.inputAvatarImage} alt={selectedImage.name}/>
                            )}
                        </div>
                    </label>
                </div>
                {/* First Name + Last Name */}
                <div className={style.section}>
                    <div className={style.inputShort}>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            name="firstName"
                            type="text"
                            style={validMessage.firstName ? {border: "1px solid red"} : {}}
                            onChange={onChangeTextInput}
                            value={firstName}
                        />
                        <p>{validMessage.firstName || validMessage.lastName}</p>
                    </div>
                    <div className={style.inputShort}>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="lastName"
                            type="text"
                            style={validMessage.lastName ? {border: "1px solid red"} : {}}
                            onChange={onChangeTextInput}
                            value={lastName}
                        />
                    </div>
                </div>
                {/* Email */}
                <div className={style.section}>
                    <div className={style.inputLong}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            style={validMessage.email ? {border: "1px solid red"} : {}}
                            onChange={onChangeTextInput}
                            value={email}
                        />
                        <p>{validMessage.email}</p>
                    </div>
                </div>
                {/* Address + Contact Number */}
                <div className={style.section}>
                    <div className={style.inputShort}>
                        <label htmlFor="address">Address</label>
                        <input id="address" name="address" type="text" onChange={onChangeTextInput} value={address}/>
                    </div>
                    <div className={style.inputShort}>
                        <label htmlFor="contact_number">Contact Number</label>
                        <input id="contact_number" name="phone" type="text" onChange={onChangeTextInput} value={phone}/>
                    </div>
                </div>
                {/* City + State */}
                <div className={style.section}>
                    <div className={style.inputShort}>
                        <label htmlFor="city">City</label>
                        <input id="city" name="city" type="text" onChange={onChangeTextInput} value={city}/>
                    </div>
                    <div className={style.inputShort}>
                        <label htmlFor="state">State</label>
                        <input id="state" name="state" type="text" onChange={onChangeTextInput} value={state}/>
                    </div>
                </div>
                {/* Zip code + Country */}
                <div className={style.section}>
                    <div className={style.inputShort}>
                        <label htmlFor="zip_code">Zip code</label>
                        <input id="zip_code" name="zipCode" type="text" onChange={onChangeTextInput} value={zipCode}/>
                    </div>
                    <div className={style.inputShort}>
                        <label htmlFor="country">Country</label>
                        <input id="country" name="country" type="text" onChange={onChangeTextInput} value={country}/>
                    </div>
                </div>
                {/* Password */}
                <div className={style.section}>
                    <div className={style.inputLong}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={!passwordVisibleState ? 'password' : 'text'}
                            name="password"
                            style={validMessage.password ? {border: "1px solid red"} : {}}
                            onChange={onChangeTextInput}
                            value={password}
                            autoComplete={"password"}
                        />
                        <div
                            className={`${style.passwordVisible} ${!passwordVisibleState ? style.visible : style.invisible}`}
                            style={validMessage.password ? {border: "1px solid red", borderLeft: "1px solid transparent"} : {}}
                            onClick={passwordVisible}
                        />
                        <p>{validMessage.password}</p>
                    </div>

                </div>
                {/* Submit Button */}
                <div className={style.section}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
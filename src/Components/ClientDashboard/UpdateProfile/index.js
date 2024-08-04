import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/fireBase";
import { FaCamera, FaCheck, FaTimes } from "react-icons/fa";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profile, setProfile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const fetchUserProfile = JSON.parse(localStorage.getItem("user"));
    setProfile(fetchUserProfile.profileImgUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    await uploadImage({ image }, navigate);

    setImage(null);
    setPreviewUrl(null);
  };

  const handleCancel = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="update-profile-container">
      <div className="profile-image-wrapper">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="profile-Image"
          />
        ) : (
          <div className="profile-image-placeholder">
            {!profile ? (
              <FaCamera className="camera-icon" />
            ) : (
              <img src={profile} alt="" />
            )}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button
          className="change-image-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Change Image
        </button>
      </div>
      {previewUrl && (
        <div className="action-buttons">
          <button className="submit-btn" onClick={handleSubmit}>
            <FaCheck /> Submit
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;

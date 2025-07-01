import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { uploadProfileImage } from "../api/api";

type User = {
  id: number;
  username: string;
  email: string;
  contact: number;
  profile_image: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    try {
      setUploading(true);
      const res = await uploadProfileImage(formData);

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile image updated!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`http://localhost:5000${user.profile_image}`}
            alt="Profile"
            className="profile-image"
          />
          <div className="upload-inline">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <h2>{user.username}</h2>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="profile-body">
          <div className="profile-info">
            <label>ID:</label>
            <span>{user.id}</span>
          </div>
          <div className="profile-info">
            <label>Contact:</label>
            <span>{user.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

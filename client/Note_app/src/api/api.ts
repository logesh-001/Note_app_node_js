const endpointUrl = "http://localhost:5000/api";

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${endpointUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (userData: any) => {
  const response = await fetch(`${endpointUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ required to receive/set cookies
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to login user");
  }

  const data = await response.json();
  const sessionStorage = window.sessionStorage;
  sessionStorage.setItem("user", JSON.stringify(data.user));
  console.log("User data stored in sessionStorage:", data.user);

  // ✅ Don't expect token if you're using cookie auth
  return data;
};

export const logoutUser = async () => {
  const response = await fetch(`${endpointUrl}/auth/logout`, {
    method: "POST",
    credentials: "include", // ✅ required to receive/set cookies
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to logout user");
  }

  // Clear session storage on logout
  window.sessionStorage.removeItem("user");
  console.log("User data cleared from sessionStorage");

  return { message: "Logout successful" };
};

export const uploadProfileImage = async (formData: FormData) => {
  const response = await fetch(`${endpointUrl}/auth/upload-profile-image`, {
    method: "POST",
    body: formData,
    credentials: "include", // ✅ required to receive/set cookies
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to upload profile image");
  }

  const data = await response.json();
  console.log("Profile image uploaded successfully:", data);
  return data;
};

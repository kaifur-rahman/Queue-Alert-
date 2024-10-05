import { deleteRefreshToken } from "./dbHelpers.js";

const clearAllCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  res.clearCookie("userDetails", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  console.log("All cookies cleared.");
};

const signoutCleanup = async (res, userDetails) => {
  clearAllCookies(res);
  if (userDetails) {
    await deleteRefreshToken(userDetails);
    console.log("Refresh token deleted from user's db.");
  }
};
export { clearAllCookies, signoutCleanup };

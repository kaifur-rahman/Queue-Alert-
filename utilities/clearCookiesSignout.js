const clearCookiesSignout = (res) => {
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

export { clearCookiesSignout };

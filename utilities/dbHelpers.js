import userModel from "../models/userModel.js";

//saves new user login details to db with refresh token
export const saveNewUserLogin = async (userDetails, refreshToken) => {
  const newUserLogged = new userModel({
    _id: userDetails.sub,
    email: userDetails.email,
    refreshToken: refreshToken,
    picture: userDetails.picture,
    firstName: userDetails.given_name,
    lastName: userDetails.family_name,
  });
  return newUserLogged.save();
};

//existing user log in again update the refresh token
export const updateExistingUserLogin = async (userDetails, refreshToken) => {
  return userModel.findOneAndUpdate(
    { _id: userDetails.sub },
    {
      refreshToken: refreshToken,
    },
    { new: false }
  );
};

//delete refresh token from the user's details
export const deleteRefreshToken = async (userId) => {
  return userModel.findByIdAndUpdate(
    { _id: userId },
    { $unset: { refreshToken: "" } },
    { new: false }
  );
};

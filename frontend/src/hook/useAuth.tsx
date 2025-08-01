import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
	const user = useSelector((state: RootState) => state.user.user);
	// console.log("User authentication status:", user);
	return user;
};

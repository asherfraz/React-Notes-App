import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hook/useAuth";

const ProtectRouteIfLoggedIn = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const user = useAuth();

	if (user || user?.auth === true) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default ProtectRouteIfLoggedIn;

import { useLocation } from "wouter";
import { useStore } from "../state";

export const useAuthRedirect = (invert: boolean = false) => {
	const [, setLocation] = useLocation();
	const user = useStore((s) => s.authenticated);

	if (!user && invert) {
		setLocation("/login");
	}

	if (user && !invert) {
		setLocation("/me");
	}
};

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { privateUserInfo } from "../../../server/types";
import { trpc } from "../trpc";

type Store = {
	token?: string;
	authenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

export const useStore = create(
	persist<Store>(
		(set) => ({
			token: undefined,
			authenticated: false,
			login: (token) => {
				set({ token, authenticated: true });
			},
			logout: () => {
				set({ token: undefined, authenticated: false });
			},
		}),
		{
			name: "bier.cool",
		},
	),
);

export const useUser = create<{
	user?: privateUserInfo;
	setUser: (user: privateUserInfo) => void;
}>((set) => ({
	user: undefined,
	setUser: (user) => set({ user }),
}));

export const useSyncUser = () => {
	const [authenticated, logout] = useStore((state) => [state.authenticated, state.logout]);
	const setUser = useUser((state) => state.setUser);
	const user = trpc.user.getMe.useQuery(undefined, {
		enabled: authenticated,
	});

	useEffect(() => {
		if (user?.error?.data?.httpStatus === 401) {
			logout();
		}

		if (user.data) {
			// todo
			setUser(user.data as unknown as privateUserInfo);
		}
	}, [user.data, setUser]);
};

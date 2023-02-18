import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../../../server/prisma";
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
			getStorage: () => localStorage,
		},
	),
);

export const useUser = create<{
	user?: User;
	setUser: (user: User) => void;
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
			setUser(user);
		}
	}, [user.data, setUser]);
};

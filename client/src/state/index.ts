import { create } from "zustand";
import { persist } from "zustand/middleware";

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

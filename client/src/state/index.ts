import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
	token?: string;
	authenticated: boolean;
};

export const useStore = create(
	persist<Store>(
		(set) => ({
			token: undefined,
			authenticated: false,
		}),
		{
			name: "bier.cool",
			getStorage: () => localStorage,
		},
	),
);

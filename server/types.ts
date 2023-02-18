export type USER_ROLES = "ADMIN" | "MODERATOR" | "REFEREE" | "USER";
export type TEAM_ROLES = "CAPITAIN" | "MEMBER";

export type publicUserInfo = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	profilePicture: string;
	teams: publicTeamInfo[];
};

export type publicTeamInfo = {
	id: string;
	name: string;
};

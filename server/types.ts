import { z } from "zod";

export type USER_ROLES = "ADMIN" | "MODERATOR" | "REFEREE" | "USER";
export type TEAM_ROLES = "CAPITAIN" | "MEMBER";
export type TEAM_EVENT_ROLES = "ORGANIZER" | "ATTENDEE";

export const PREFERENCE = z.enum(["FLUNKY_BALL", "BIER_BALL"]);
export type PREFERENCE = z.infer<typeof PREFERENCE>;

// public info: everyone can see this
export type publicUserInfo = {
	id: string;
	username: string;
	displayName: string;
	bio: string | null;
	profilePicture: string | null;
	preference: string;
	TeamMember: publicTeamMemberInfo[];
};

export type publicTeamInfo = {
	id: string;
	name: string;
};

export type publicTeamMemberInfo = {
	id: string;
	nickName: string;
	role: string;
	team: publicTeamInfo;
};

// friend info: people you follow can see this
export type followerUserInfo = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	contact: string;
	profilePicture: string;
	preference: string;
	teams: publicTeamInfo[];
};

// private info: only you can see this
export type privateUserInfo = {
	id: string;
	username: string;
	email: string;
	displayName: string;
	bio: string;
	contact: string;
	profilePicture: string;
	role: string;
	preference: string;
	teamMember: publicTeamMemberInfo[];
	followers: followerUserInfo[];
	follows: publicUserInfo[];
};

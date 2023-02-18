export type USER_ROLES = "ADMIN" | "MODERATOR" | "REFEREE" | "USER";
export type TEAM_ROLES = "CAPITAIN" | "MEMBER";

// public info: everyone can see this
export type publicUserInfo = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	profilePicture: string;
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
	teamMember: publicTeamMemberInfo[];
	followers: followerUserInfo[];
	follows: publicUserInfo[];
};

/*
   id             String       @id @default(cuid())
  username       String       @unique
  email          String       @unique
  displayName    String
  password       String
  bio            String
  contact        String
  profilePicture String
  role           String
  TeamMember     TeamMember[]
  follows        User[]       @relation("UserFollows")
  followers      User[]       @relation("UserFollows")
  */

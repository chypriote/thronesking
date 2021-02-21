/* eslint-disable no-use-before-define */
export interface Ranking {
	id: number
	date: string
	rank: number
	player: Player
}

export enum RankingTypes {
	KINGDOM= 'kingdom',
	TOURNEY= 'tourney',
}

export type KingdomRanking = {
	id: number
	date: string
	rank: number
	power: number
	level: number
	player: Player
	alliance: Alliance
}

export type TourneyRanking = {
	id: number
	date: string
	rank: number
	points: number
	player: Player
}

export type Player = {
	id: number
	gid: number
	name: string
	vip: number

	military: number
	fortune: number
	provisions: number
	inspiration: number

	heroes: number
	maidens: number
	children: number
	intimacy: number

	rankings?: KingdomRanking[]
	alliance_members?: AllianceMembers[]

	alliance?: Alliance
	rank?: KingdomRanking
}

export type Alliance = {
	id: number
	aid: number
	name: string
	power: number
	level: number
	reputation: number
	alliance_members: AllianceMembers[]
	members: AllianceMembers[]
}

export type AllianceMembers = {
	id: number
	player: Player
	alliance: Alliance
	active: boolean
	leftAt: string
}

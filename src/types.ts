/**
 * Represents a game on Steam
 */
 export type Game = {
    name: string;
    storeUrl: string;
    iconUrl: string;
};

/**
 * Represents the most recent status on Steam.
 */
export type SteamStatus = {
    success: boolean;
    game: Game | null;
    error: any | null;
}
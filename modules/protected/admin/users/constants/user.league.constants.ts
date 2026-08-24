export interface LeagueConfig {
    name: string;
    color: string;
}

export const LEAGUE_CONFIGS: LeagueConfig[] = [
    { name: "Bronze", color: "var(--color-league-bronze)" },
    { name: "Silver", color: "var(--color-league-silver)" },
    { name: "Gold", color: "var(--color-league-gold)" },
    { name: "Sapphire", color: "var(--color-league-sapphire)" },
    { name: "Ruby", color: "var(--color-league-ruby)" },
    { name: "Emerald", color: "var(--color-league-emerald)" },
    { name: "Amethyst", color: "var(--color-league-amethyst)" },
    { name: "Pearl", color: "var(--color-league-pearl)" },
    { name: "Obsidian", color: "var(--color-league-obsidian)" },
    { name: "Diamond", color: "var(--color-league-diamond)" },
];

export function getLeagueConfig(leagueId: number | null): LeagueConfig | null {
    if (!leagueId) return null;
    const idx = (leagueId - 1) % LEAGUE_CONFIGS.length;
    return LEAGUE_CONFIGS[idx >= 0 ? idx : 0];
}

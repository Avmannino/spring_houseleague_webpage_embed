import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type AgeGroup = "Mites" | "Squirt" | "Peewee" | "Bantam" | "U16-18";

type GameRow = {
  id: string;
  date: string;
  time: string;
  matchup: string;
  rink: string;
  status: string;
};

type RosterPlayer = {
  id: string;
  team: string;
  firstName: string;
  lastName: string;
  isGoalie?: boolean;
};

type RSVPStatus = "yes" | "no" | "maybe" | "no-response";

type AttendanceMap = Record<string, Record<string, RSVPStatus>>;

type AttendanceSummary = {
  yes: number;
  no: number;
  maybe: number;
  noResponse: number;
  total: number;
};

type MatchupTeamBlock = {
  team: string;
  players: RosterPlayer[];
};

type RsvpFeatureProps = {
  activeGroup: AgeGroup;
  activeGames: GameRow[];
  activePlayers: RosterPlayer[];
};

const RSVP_STORAGE_KEY = "wings-inhouse-rsvp-attendance";

const RSVP_STATUS_LABELS: Record<Exclude<RSVPStatus, "no-response">, string> = {
  yes: "Yes",
  no: "No",
  maybe: "Maybe",
};

const RSVP_STATUS_STYLES: Record<Exclude<RSVPStatus, "no-response">, string> = {
  yes: "border-emerald-300/40 bg-emerald-400/15 text-emerald-100",
  no: "border-rose-300/40 bg-rose-400/15 text-rose-100",
  maybe: "border-amber-300/40 bg-amber-400/15 text-amber-100",
};

function normalizeTeamKey(team: string): string {
  const compact = team.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (compact.includes("germany") && compact.includes("nrlh")) return "germany-nrlh";
  if (compact.includes("germany") && compact.includes("nrlighting")) return "germany-nrlh";
  if (compact.includes("germany")) return "germany-nrlh";
  if (compact === "usa") return "usa";
  if (compact === "canada") return "canada";
  if (compact === "sweden") return "sweden";
  if (compact === "finland") return "finland";
  if (compact === "netherlands") return "netherlands";

  return compact;
}


function extractTeamsFromMatchup(matchup: string): string[] {
  const normalized = matchup
    .replace(/\s+vs\.\s+/gi, " vs ")
    .replace(/\s+vs\s+/gi, " vs ")
    .trim();

  if (!normalized.toLowerCase().includes(" vs ")) return [];

  return normalized.split(/ vs /i).map((part) => part.trim());
}

function getPlayersForMatchup(players: RosterPlayer[], matchup: string): MatchupTeamBlock[] {
  const matchupTeams = extractTeamsFromMatchup(matchup);

  return matchupTeams
    .map((matchupTeam) => {
      const matchupKey = normalizeTeamKey(matchupTeam);

      const matchedPlayers = players.filter(
        (player) => normalizeTeamKey(player.team) === matchupKey
      );

      return {
        team: matchupTeam,
        players: [...matchedPlayers].sort((a, b) => {
          if (Boolean(b.isGoalie) !== Boolean(a.isGoalie)) {
            return Number(b.isGoalie) - Number(a.isGoalie);
          }

          const lastNameCompare = a.lastName.localeCompare(b.lastName);
          if (lastNameCompare !== 0) return lastNameCompare;

          return a.firstName.localeCompare(b.firstName);
        }),
      };
    })
    .filter((teamBlock) => teamBlock.players.length > 0);
}

function getPlayerAttendance(
  attendance: AttendanceMap,
  gameId: string,
  playerId: string
): RSVPStatus {
  return attendance[gameId]?.[playerId] ?? "no-response";
}

function buildAttendanceSummary(
  players: RosterPlayer[],
  attendance: AttendanceMap,
  gameId: string
): AttendanceSummary {
  const summary: AttendanceSummary = {
    yes: 0,
    no: 0,
    maybe: 0,
    noResponse: 0,
    total: players.length,
  };

  players.forEach((player) => {
    const status = getPlayerAttendance(attendance, gameId, player.id);

    if (status === "yes") summary.yes += 1;
    else if (status === "no") summary.no += 1;
    else if (status === "maybe") summary.maybe += 1;
    else summary.noResponse += 1;
  });

  return summary;
}

export function RsvpFeature({
  activeGroup,
  activeGames,
  activePlayers,
}: RsvpFeatureProps) {
  const [selectedGame, setSelectedGame] = useState<GameRow | null>(null);
  const [attendance, setAttendance] = useState<AttendanceMap>({});

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(RSVP_STORAGE_KEY);
      if (storedValue) {
        setAttendance(JSON.parse(storedValue) as AttendanceMap);
      }
    } catch (error) {
      console.error("Failed to load RSVP attendance:", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(attendance));
    } catch (error) {
      console.error("Failed to save RSVP attendance:", error);
    }
  }, [attendance]);

  useEffect(() => {
    if (!selectedGame) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedGame(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedGame]);

  const selectedGameTeams = useMemo(() => {
    if (!selectedGame) return [];
    return getPlayersForMatchup(activePlayers, selectedGame.matchup);
  }, [activePlayers, selectedGame]);

  function handleSetAttendance(
    gameId: string,
    playerId: string,
    status: Exclude<RSVPStatus, "no-response">
  ) {
    setAttendance((prev) => {
      const currentStatus = prev[gameId]?.[playerId] ?? "no-response";
      const nextGameAttendance = { ...(prev[gameId] ?? {}) };

      if (currentStatus === status) {
        delete nextGameAttendance[playerId];

        const hasAnySelections = Object.keys(nextGameAttendance).length > 0;

        if (!hasAnySelections) {
          const next = { ...prev };
          delete next[gameId];
          return next;
        }

        return {
          ...prev,
          [gameId]: nextGameAttendance,
        };
      }

      return {
        ...prev,
        [gameId]: {
          ...(prev[gameId] ?? {}),
          [playerId]: status,
        },
      };
    });
  }

  return (
    <>
      <div className="hidden md:block">
        <div className="max-h-[560px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#0f3c72]/90 backdrop-blur-sm text-white uppercase tracking-[0.06em] text-sm">
                <th className="px-5 py-4 text-left font-bold">Date</th>
                <th className="px-5 py-4 text-left font-bold">Time</th>
                <th className="px-5 py-4 text-left font-bold">Matchup</th>
                <th className="px-5 py-4 text-left font-bold">Rink</th>
                <th className="px-5 py-4 text-left font-bold">Status</th>
                <th className="px-5 py-4 text-left font-bold">RSVP</th>
              </tr>
            </thead>

            <tbody>
              {activeGames.length > 0 ? (
                activeGames.map((game, index) => (
                  <tr
                    key={game.id}
                    className={
                      index % 2 === 0
                        ? "bg-white/10 text-white"
                        : "bg-[#0d2f5a]/55 text-white"
                    }
                  >
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px]">
                      {game.date}
                    </td>
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px] font-medium whitespace-nowrap">
                      {game.time}
                    </td>
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px] font-semibold">
                      {game.matchup}
                    </td>
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px]">
                      {game.rink}
                    </td>
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px]">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[14px]">
                        {game.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px]">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedGame(game)}
                          className="inline-flex items-center rounded-full border border-[#ff9aad] bg-[#e51837] mr-6 px-5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#f02445]"
                        >
                          RSVP
                        </button>

                        {(() => {
                          const matchupTeams = getPlayersForMatchup(activePlayers, game.matchup);
                          const totalConfirmed = matchupTeams.reduce(
                            (sum, team) =>
                              sum +
                              buildAttendanceSummary(team.players, attendance, game.id).yes,
                            0
                          );
                          const totalPlayers = matchupTeams.reduce(
                            (sum, team) => sum + team.players.length,
                            0
                          );

                          return (
                            <span className="text-xs text-[#d6edf1] whitespace-nowrap">
                              {totalConfirmed}/{totalPlayers} confirmed
                            </span>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white/10 text-white">
                  <td colSpan={6} className="px-5 py-10 text-center">
                    No upcoming games to display for {activeGroup}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden px-3 py-3">
        <div className="max-h-[640px] overflow-y-auto space-y-3 pr-1">
          {activeGames.length > 0 ? (
            activeGames.map((game) => {
              const matchupTeams = getPlayersForMatchup(activePlayers, game.matchup);
              const totalConfirmed = matchupTeams.reduce(
                (sum, team) => sum + buildAttendanceSummary(team.players, attendance, game.id).yes,
                0
              );
              const totalPlayers = matchupTeams.reduce(
                (sum, team) => sum + team.players.length,
                0
              );

              return (
                <div
                  key={game.id}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-[2px]"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[15px] font-semibold leading-snug">
                        {game.matchup}
                      </p>
                      <p className="text-[13px] text-[#d6edf1] mt-1">{game.date}</p>
                    </div>

                    <span className="shrink-0 rounded-full border border-white/20 bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white">
                      {game.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[12px] sm:text-[13px]">
                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-[#c4e6ea] uppercase tracking-wide text-[10px] mb-1">
                        Time
                      </p>
                      <p className="font-medium">{game.time}</p>
                    </div>

                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-[#c4e6ea] uppercase tracking-wide text-[10px] mb-1">
                        Rink
                      </p>
                      <p className="font-medium">{game.rink}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[12px] text-[#d6edf1]">
                      {totalConfirmed}/{totalPlayers} confirmed
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedGame(game)}
                      className="inline-flex items-center rounded-full border border-[#ff9aad] bg-[#e51837] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#f02445]"
                    >
                      Manage RSVP
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center text-white">
              No upcoming games to display for {activeGroup}.
            </div>
          )}
        </div>
      </div>

      {selectedGame && createPortal(
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 px-3 py-4 sm:px-5"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[24px] border border-white/15 bg-[#102e63] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative border-b border-white/10 bg-[#0f2a59] px-4 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b2dbd7]">
                    {activeGroup} RSVP Tracker
                  </p>
                  <h3 className="mt-1 text-[1.35rem] font-semibold text-white sm:text-[1.7rem]">
                    {selectedGame.matchup}
                  </h3>
                  <p className="mt-2 text-sm text-[#d6edf1] sm:text-[15px]">
                    {selectedGame.date} • {selectedGame.time} • {selectedGame.rink}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGame(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-white/15"
                  aria-label="Close RSVP modal"
                >
                  ×
                </button>
              </div>
              <p className="mt-3 text-left text-[13px] text-[#b2dbd7] italic whitespace-nowrap sm:absolute sm:mt-0 sm:bottom-4 sm:right-6 sm:text-right">
                Please Note: Your RSVP is encouraged, but not required
              </p>
            </div>

            <div className="max-h-[75vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              {selectedGameTeams.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {selectedGameTeams.map((teamBlock) => {
                    const summary = buildAttendanceSummary(
                      teamBlock.players,
                      attendance,
                      selectedGame.id
                    );

                    return (
                      <div
                        key={teamBlock.team}
                        className="rounded-2xl border border-white/15 bg-white/8 p-4"
                      >
                        <div className="mb-4">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-lg font-semibold text-white">
                              {teamBlock.team}
                            </h4>
                            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-[#d6edf1]">
                              {summary.yes}/{summary.total} attending
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-emerald-100">
                              Yes: {summary.yes}
                            </span>
                            <span className="rounded-full border border-rose-300/30 bg-rose-400/10 px-2.5 py-1 text-rose-100">
                              No: {summary.no}
                            </span>
                            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-amber-100">
                              Maybe: {summary.maybe}
                            </span>
                            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-white">
                              No Response: {summary.noResponse}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {teamBlock.players.map((player) => {
                            const currentStatus = getPlayerAttendance(
                              attendance,
                              selectedGame.id,
                              player.id
                            );

                            return (
                              <div
                                key={player.id}
                                className="rounded-xl border border-white/10 bg-[#0d2854]/55 p-3"
                              >
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                  <div>
                                    <p className="text-sm font-semibold text-white sm:text-[15px]">
                                      {player.firstName} {player.lastName}
                                    </p>
                                    {player.isGoalie && (
                                      <span className="mt-1 inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-2 py-[2px] text-[11px] font-semibold text-sky-100">
                                        Goalie
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {(Object.keys(RSVP_STATUS_LABELS) as Array<
                                      Exclude<RSVPStatus, "no-response">
                                    >).map((status) => {
                                      const isActive = currentStatus === status;

                                      return (
                                        <button
                                          key={status}
                                          type="button"
                                          onClick={() =>
                                            handleSetAttendance(
                                              selectedGame.id,
                                              player.id,
                                              status
                                            )
                                          }
                                          className={[
                                            "rounded-full border px-3 py-1.5 text-[12px] font-semibold transition",
                                            isActive
                                              ? RSVP_STATUS_STYLES[status]
                                              : "border-white/15 bg-white/6 text-[#dceef2] hover:bg-white/12",
                                          ].join(" ")}
                                        >
                                          {RSVP_STATUS_LABELS[status]}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/15 bg-white/8 px-4 py-8 text-center text-white">
                  No matching roster players were found for this matchup.
                </div>
              )}
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
import React, { useMemo, useState } from "react";
import { RsvpFeature } from "./components/RsvpFeature";
import logo from "../assets/wingslogo.png";
import heroImage1 from "../assets/hero/hero-1.jpg";
import heroImage2 from "../assets/hero/hero-2.jpg";
import heroImage3 from "../assets/hero/hero-3.jpg";
import heroImage4 from "../assets/hero/hero-4.jpg";
import { HeroCarousel } from "@/app/components/HeroCarousel";
import { InfoBox } from "@/app/components/InfoBox";
import { PriceCard } from "@/app/components/PriceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import coedIcon from "../assets/icons/coed.png";
import allAgesIcon from "../assets/icons/icons8-birth-date-100.png";
import practiceIcon from "../assets/icons/icons8-practice-64.png";
import hockeyFieldIcon from "../assets/icons/icons8-hockey-field-100.png";
import coachingIcon from "../assets/icons/icons8-coaching-100.png";
import qrCode from "../assets/Registration_QR.png";

type AgeGroup = "Mites" | "Squirt" | "Peewee" | "Bantam" | "U16-18";
type DetailView = "games" | "standings" | "rosters";

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


type StandingsRow = {
  team: string;
  wins: number;
  losses: number;
  ties: number;
};

const AGE_GROUPS: AgeGroup[] = [
  "Mites",
  "Squirt",
  "Peewee",
  "Bantam",
  "U16-18",
];

const LEAGUE_YEAR = 2026;

const STANDINGS_DATA: Record<AgeGroup, StandingsRow[]> = {
  Mites: [
    { team: "Germany", wins: 3, losses: 1, ties: 1 },
    { team: "USA", wins: 1, losses: 1, ties: 1 },
  ],
  Squirt: [
    { team: "Sweden", wins: 4, losses: 1, ties: 0 },
    { team: "Canada", wins: 4, losses: 1, ties: 0 },
    { team: "Germany", wins: 1, losses: 4, ties: 0 },
    { team: "USA", wins: 1, losses: 4, ties: 0 },
  ],
  Peewee: [
    { team: "Netherlands", wins: 5, losses: 0, ties: 0 },
    { team: "Finland", wins: 3, losses: 2, ties: 0 },
    { team: "Germany", wins: 2, losses: 3, ties: 0 },
    { team: "Sweden", wins: 0, losses: 5, ties: 0 },
  ],
  Bantam: [
    { team: "Finland", wins: 4, losses: 1, ties: 0 },
    { team: "Germany", wins: 3, losses: 2, ties: 0 },
    { team: "Canada", wins: 1, losses: 3, ties: 1 },
    { team: "Sweden", wins: 1, losses: 3, ties: 1 },
  ],
  "U16-18": [
    { team: "USA", wins: 5, losses: 1, ties: 0 },
    { team: "Finland", wins: 4, losses: 2, ties: 0 },
    { team: "Netherlands", wins: 2, losses: 4, ties: 0 },
    { team: "Canada", wins: 1, losses: 5, ties: 0 },
  ],
};

function getWinPercentage(row: StandingsRow): number {
  const gamesPlayed = row.wins + row.losses + row.ties;
  if (gamesPlayed === 0) return 0;
  return (row.wins + row.ties * 0.5) / gamesPlayed;
}

const MONTH_MAP: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseGameDateTime(dateStr: string, timeStr: string): Date | null {
  const cleanedDate = dateStr.replace(/,/g, "").trim();
  const dateMatch = cleanedDate.match(
    /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s+([A-Za-z]+)\s+(\d{1,2})(st|nd|rd|th)?$/i
  );

  if (!dateMatch) return null;

  const monthName = dateMatch[2].toLowerCase();
  const day = Number(dateMatch[3]);
  const monthIndex = MONTH_MAP[monthName];

  if (monthIndex === undefined || Number.isNaN(day)) return null;

  const timeMatch = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!timeMatch) return null;

  let hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const meridiem = timeMatch[3].toUpperCase();

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  return new Date(LEAGUE_YEAR, monthIndex, day, hour, minute, 0, 0);
}

const GAME_DATA: Record<AgeGroup, GameRow[]> = {
  Mites: [
    {
      id: "mites-2",
      date: "Sunday, March 22nd",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-3",
      date: "Sunday, March 29th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-4",
      date: "Sunday, April 12th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-5",
      date: "Sunday, April 19th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-6",
      date: "Sunday, April 26th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-7",
      date: "Sunday, May 3rd",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-8",
      date: "Sunday, May 10th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-9",
      date: "Sunday, May 17th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-10",
      date: "Sunday, May 31st",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "mites-11",
      date: "Sunday, June 7th",
      time: "8:10 AM",
      matchup: "USA vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
  ],

  Squirt: [
    {
      id: "squirt-2",
      date: "Sunday, March 22nd",
      time: "9:20 AM",
      matchup: "Germany vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-3",
      date: "Sunday, March 22nd",
      time: "10:30 AM",
      matchup: "Canada vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-4",
      date: "Sunday, March 29th",
      time: "9:20 AM",
      matchup: "USA vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-5",
      date: "Sunday, March 29th",
      time: "10:30 AM",
      matchup: "Sweden vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-6",
      date: "Sunday, April 12th",
      time: "9:20 AM",
      matchup: "Canada vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-7",
      date: "Sunday, April 12th",
      time: "10:30 AM",
      matchup: "USA vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-8",
      date: "Sunday, April 19th",
      time: "9:20 AM",
      matchup: "Sweden vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-9",
      date: "Sunday, April 19th",
      time: "10:30 AM",
      matchup: "Germany vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-10",
      date: "Sunday, April 26th",
      time: "9:20 AM",
      matchup: "USA vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-11",
      date: "Sunday, April 26th",
      time: "10:30 AM",
      matchup: "Canada vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-12",
      date: "Sunday, May 3rd",
      time: "9:20 AM",
      matchup: "Germany vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-13",
      date: "Sunday, May 3rd",
      time: "10:30 AM",
      matchup: "USA vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-14",
      date: "Sunday, May 10th",
      time: "9:20 AM",
      matchup: "Canada vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-15",
      date: "Sunday, May 10th",
      time: "10:30 AM",
      matchup: "Sweden vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-16",
      date: "Sunday, May 17th",
      time: "9:20 AM",
      matchup: "Germany vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-17",
      date: "Sunday, May 17th",
      time: "10:30 AM",
      matchup: "Canada vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-18",
      date: "Sunday, May 31st",
      time: "9:20 AM",
      matchup: "Sweden vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-19",
      date: "Sunday, May 31st",
      time: "10:30 AM",
      matchup: "Germany vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-20",
      date: "Sunday, June 7th",
      time: "9:20 AM",
      matchup: "Canada vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "squirt-21",
      date: "Sunday, June 7th",
      time: "10:30 AM",
      matchup: "USA vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
  ],

  Peewee: [
    {
      id: "peewee-2",
      date: "Sunday, March 22nd",
      time: "1:30 PM",
      matchup: "Netherlands vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-3",
      date: "Sunday, March 22nd",
      time: "2:40 PM",
      matchup: "Finland vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-4",
      date: "Sunday, March 29th",
      time: "1:30 PM",
      matchup: "Netherlands vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-5",
      date: "Sunday, March 29th",
      time: "2:40 PM",
      matchup: "Sweden vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-6",
      date: "Sunday, April 12th",
      time: "1:30 PM",
      matchup: "Germany vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-7",
      date: "Sunday, April 12th",
      time: "2:40 PM",
      matchup: "Netherlands vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-8",
      date: "Sunday, April 19th",
      time: "1:30 PM",
      matchup: "Sweden vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-9",
      date: "Sunday, April 19th",
      time: "2:40 PM",
      matchup: "Netherlands vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-10",
      date: "Sunday, April 26th",
      time: "1:30 PM",
      matchup: "Finland vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-11",
      date: "Sunday, April 26th",
      time: "2:40 PM",
      matchup: "Sweden vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-12",
      date: "Sunday, May 3rd",
      time: "1:30 PM",
      matchup: "Germany vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-13",
      date: "Sunday, May 3rd",
      time: "2:40 PM",
      matchup: "Finland vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-14",
      date: "Sunday, May 10th",
      time: "1:30 PM",
      matchup: "Netherlands vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-15",
      date: "Sunday, May 10th",
      time: "2:40 PM",
      matchup: "Germany vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-16",
      date: "Sunday, May 17th",
      time: "1:30 PM",
      matchup: "Finland vs. Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-17",
      date: "Sunday, May 17th",
      time: "2:40 PM",
      matchup: "Germany vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-18",
      date: "Sunday, May 31st",
      time: "1:30 PM",
      matchup: "Sweden vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-19",
      date: "Sunday, May 31st",
      time: "2:40 PM",
      matchup: "Netherlands vs. Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-20",
      date: "Sunday, June 7th",
      time: "1:30 PM",
      matchup: "Germany vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "peewee-21",
      date: "Sunday, June 7th",
      time: "2:40 PM",
      matchup: "Sweden vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
  ],

  Bantam: [
    {
      id: "bantam-2",
      date: "Sunday, March 22nd",
      time: "3:55 PM",
      matchup: "Canada vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-3",
      date: "Sunday, March 22nd",
      time: "5:20 PM",
      matchup: "Finland vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-4",
      date: "Sunday, March 29th",
      time: "3:55 PM",
      matchup: "Germany vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-5",
      date: "Sunday, March 29th",
      time: "5:20 PM",
      matchup: "Canada vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-6",
      date: "Sunday, April 12th",
      time: "3:55 PM",
      matchup: "Finland vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-7",
      date: "Sunday, April 12th",
      time: "5:20 PM",
      matchup: "Germany vs Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-8",
      date: "Sunday, April 19th",
      time: "3:55 PM",
      matchup: "Germany vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-9",
      date: "Sunday, April 19th",
      time: "5:20 PM",
      matchup: "Sweden vs Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-10",
      date: "Sunday, April 26th",
      time: "3:55 PM",
      matchup: "Canada vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-11",
      date: "Sunday, April 26th",
      time: "5:20 PM",
      matchup: "Sweden vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-12",
      date: "Sunday, May 3rd",
      time: "3:55 PM",
      matchup: "Sweden vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-13",
      date: "Sunday, May 3rd",
      time: "5:20 PM",
      matchup: "Canada vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-14",
      date: "Sunday, May 10th",
      time: "3:55 PM",
      matchup: "Canada vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-15",
      date: "Sunday, May 10th",
      time: "5:20 PM",
      matchup: "Finland vs Germany",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-16",
      date: "Sunday, May 17th",
      time: "3:55 PM",
      matchup: "Germany vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-17",
      date: "Sunday, May 17th",
      time: "5:20 PM",
      matchup: "Canada vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-18",
      date: "Sunday, May 31st",
      time: "3:55 PM",
      matchup: "Finland vs Sweden",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-19",
      date: "Sunday, May 31st",
      time: "5:20 PM",
      matchup: "Germany vs Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-20",
      date: "Sunday, June 7th",
      time: "3:55 PM",
      matchup: "Germany vs Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "bantam-21",
      date: "Sunday, June 7th",
      time: "5:20 PM",
      matchup: "Sweden vs Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
  ],

  "U16-18": [
    {
      id: "u16-2",
      date: "Sunday, March 22nd",
      time: "6:50 PM",
      matchup: "Finland vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-3",
      date: "Sunday, March 22nd",
      time: "8:15 PM",
      matchup: "Canada vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-4",
      date: "Sunday, March 29th",
      time: "6:50 PM",
      matchup: "USA vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-5",
      date: "Sunday, March 29th",
      time: "8:15 PM",
      matchup: "Netherlands vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-6",
      date: "Sunday, April 12th",
      time: "6:50 PM",
      matchup: "Canada vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-7",
      date: "Sunday, April 12th",
      time: "8:15 PM",
      matchup: "USA vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-8",
      date: "Sunday, April 19th",
      time: "6:50 PM",
      matchup: "Netherlands vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-9",
      date: "Sunday, April 19th",
      time: "8:15 PM",
      matchup: "Finland vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-10",
      date: "Sunday, April 26th",
      time: "6:50 PM",
      matchup: "Finland vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-11",
      date: "Sunday, April 26th",
      time: "8:15 PM",
      matchup: "Canada vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-12",
      date: "Sunday, May 3rd",
      time: "6:50 PM",
      matchup: "USA vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-13",
      date: "Sunday, May 3rd",
      time: "8:15 PM",
      matchup: "Finland vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-14",
      date: "Sunday, May 10th",
      time: "6:50 PM",
      matchup: "Canada vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-15",
      date: "Sunday, May 10th",
      time: "8:15 PM",
      matchup: "Netherlands vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-16",
      date: "Sunday, May 17th",
      time: "6:50 PM",
      matchup: "USA vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-17",
      date: "Sunday, May 17th",
      time: "8:15 PM",
      matchup: "Canada vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-18",
      date: "Sunday, May 31st",
      time: "6:50 PM",
      matchup: "Netherlands vs. Finland",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-19",
      date: "Sunday, May 31st",
      time: "8:15 PM",
      matchup: "USA vs. Canada",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-20",
      date: "Sunday, June 7th",
      time: "6:50 PM",
      matchup: "Canada vs. USA",
      rink: "Wings Arena",
      status: "Scheduled",
    },
    {
      id: "u16-21",
      date: "Sunday, June 7th",
      time: "8:15 PM",
      matchup: "Finland vs. Netherlands",
      rink: "Wings Arena",
      status: "Scheduled",
    },
  ],
};

const ROSTER_DATA: Record<AgeGroup, RosterPlayer[]> = {
  Mites: [
    { id: "mites-r-1", team: "USA", firstName: "Jack", lastName: "Guzinski" },
    { id: "mites-r-2", team: "USA", firstName: "Joseph", lastName: "Karwosky Jr" },
    { id: "mites-r-3", team: "USA", firstName: "Brooks", lastName: "Kyle" },
    { id: "mites-r-4", team: "USA", firstName: "Thatcher", lastName: "Kyle" },
    { id: "mites-r-5", team: "USA", firstName: "Jack", lastName: "Sanders" },
    { id: "mites-r-6", team: "USA", firstName: "Eleni", lastName: "Dounis" },
    { id: "mites-r-7", team: "USA", firstName: "George", lastName: "Harlow" },
    { id: "mites-r-8", team: "USA", firstName: "Thomas", lastName: "Walsh" },
    { id: "mites-r-9", team: "USA", firstName: "Rex", lastName: "Stagg" },
    { id: "mites-r-10", team: "USA", firstName: "Brooks", lastName: "Bowen" },
    { id: "mites-r-11", team: "USA", firstName: "Brody", lastName: "Nyberg", isGoalie: true },

    { id: "mites-r-12", team: "Germany", firstName: "Lucas", lastName: "Chiavaroli" },
    { id: "mites-r-13", team: "Germany", firstName: "Finn", lastName: "Clark" },
    { id: "mites-r-14", team: "Germany", firstName: "Devin", lastName: "Ward" },
    { id: "mites-r-15", team: "Germany", firstName: "Vincent", lastName: "Altomare" },
    { id: "mites-r-16", team: "Germany", firstName: "Miles", lastName: "Mainhardt" },
    { id: "mites-r-17", team: "Germany", firstName: "Lucas", lastName: "Kreiner" },
    { id: "mites-r-18", team: "Germany", firstName: "Colton", lastName: "Dempsey" },
    { id: "mites-r-19", team: "Germany", firstName: "Tucker", lastName: "Miller" },
    { id: "mites-r-20", team: "Germany", firstName: "Alexander", lastName: "Kallet" },
    { id: "mites-r-21", team: "Germany", firstName: "Mason", lastName: "Dassler" },
    { id: "mites-r-22", team: "Germany", firstName: "Jack", lastName: "Aleman", isGoalie: true },
  ],

  Squirt: [
    { id: "squirt-r-1", team: "Canada", firstName: "Edie", lastName: "Guzinski" },
    { id: "squirt-r-2", team: "Canada", firstName: "Nate", lastName: "Serajeddini" },
    { id: "squirt-r-3", team: "Canada", firstName: "Aleksei", lastName: "McCormack" },
    { id: "squirt-r-4", team: "Canada", firstName: "Thomas", lastName: "McIntyre" },
    { id: "squirt-r-5", team: "Canada", firstName: "JW", lastName: "Miller" },
    { id: "squirt-r-6", team: "Canada", firstName: "Hatch", lastName: "Merrins" },
    { id: "squirt-r-7", team: "Canada", firstName: "Cooper", lastName: "Gault" },
    { id: "squirt-r-8", team: "Canada", firstName: "Callum", lastName: "Basham" },

    { id: "squirt-r-9", team: "Sweden", firstName: "Archie", lastName: "Shepherd" },
    { id: "squirt-r-10", team: "Sweden", firstName: "Katie", lastName: "Paretti" },
    { id: "squirt-r-11", team: "Sweden", firstName: "Tasman", lastName: "Hutchinson" },
    { id: "squirt-r-12", team: "Sweden", firstName: "Bryson", lastName: "Grabowski" },
    { id: "squirt-r-13", team: "Sweden", firstName: "David", lastName: "Buzin" },
    { id: "squirt-r-14", team: "Sweden", firstName: "Matthew", lastName: "Shannon" },
    { id: "squirt-r-15", team: "Sweden", firstName: "Declan", lastName: "Shannon" },
    { id: "squirt-r-16", team: "Sweden", firstName: "Jaxson", lastName: "Stover" },

    { id: "squirt-r-17", team: "USA", firstName: "Gus", lastName: "Schwefel" },
    { id: "squirt-r-18", team: "USA", firstName: "Sebastian", lastName: "Ebanks" },
    { id: "squirt-r-19", team: "USA", firstName: "Scottlyn", lastName: "Miller" },
    { id: "squirt-r-20", team: "USA", firstName: "Rye", lastName: "Robinson" },
    { id: "squirt-r-21", team: "USA", firstName: "Graham", lastName: "Exum" },
    { id: "squirt-r-22", team: "USA", firstName: "James", lastName: "McNamara" },
    { id: "squirt-r-23", team: "USA", firstName: "Brody", lastName: "Neri" },
    { id: "squirt-r-24", team: "USA", firstName: "Julian", lastName: "Serowik" },
    { id: "squirt-r-25", team: "USA", firstName: "Wilson", lastName: "Wiener" },
    { id: "squirt-r-26", team: "USA", firstName: "Lawson", lastName: "Wiener" },

    { id: "squirt-r-27", team: "Germany", firstName: "Maya", lastName: "Greenberg" },
    { id: "squirt-r-28", team: "Germany", firstName: "Julia", lastName: "Lungariello" },
    { id: "squirt-r-29", team: "Germany", firstName: "Udo", lastName: "Wilson-Njoku" },
    { id: "squirt-r-30", team: "Germany", firstName: "Ashley", lastName: "Martins" },
    { id: "squirt-r-31", team: "Germany", firstName: "Dylan", lastName: "Martins" },
    { id: "squirt-r-32", team: "Germany", firstName: "Hank", lastName: "Hollander" },
    { id: "squirt-r-33", team: "Germany", firstName: "Liam", lastName: "Frusciante" },
    { id: "squirt-r-34", team: "Germany", firstName: "Sean", lastName: "Finnegan" },
    { id: "squirt-r-35", team: "Germany", firstName: "Langston", lastName: "Basile" },
    { id: "squirt-r-36", team: "Germany", firstName: "Brenton", lastName: "Weiner" },

    { id: "squirt-r-37", team: "Canada", firstName: "Cameron", lastName: "Feeley", isGoalie: true },
    { id: "squirt-r-38", team: "Sweden", firstName: "Leo", lastName: "McGlynn", isGoalie: true },
    { id: "squirt-r-39", team: "Canada", firstName: "Logan", lastName: "Thorne", isGoalie: true },
    { id: "squirt-r-40", team: "USA", firstName: "Luke", lastName: "Ziegert Maron", isGoalie: true },
    { id: "squirt-r-41", team: "Germany", firstName: "Jacob", lastName: "Lokerson", isGoalie: true },
    { id: "squirt-r-42", team: "USA", firstName: "James", lastName: "Lacey", isGoalie: true },
    { id: "squirt-r-43", team: "Germany", firstName: "Roman", lastName: "Rusinowicz", isGoalie: true },
  ],

  Peewee: [
    { id: "peewee-r-1", team: "Finland", firstName: "Bennett", lastName: "Cooper" },
    { id: "peewee-r-2", team: "Finland", firstName: "Luke", lastName: "Muchmoore" },
    { id: "peewee-r-3", team: "Finland", firstName: "Dylan", lastName: "Hendrick" },
    { id: "peewee-r-4", team: "Finland", firstName: "Alex", lastName: "Oberbeck" },
    { id: "peewee-r-5", team: "Finland", firstName: "RD", lastName: "McCormack" },
    { id: "peewee-r-6", team: "Finland", firstName: "Coley", lastName: "Dalton" },
    { id: "peewee-r-7", team: "Finland", firstName: "Harry", lastName: "Brown" },
    { id: "peewee-r-8", team: "Finland", firstName: "John", lastName: "Greenstein" },

    { id: "peewee-r-9", team: "Netherlands", firstName: "Owen", lastName: "Erensen" },
    { id: "peewee-r-10", team: "Netherlands", firstName: "Oliver", lastName: "Hunter" },
    { id: "peewee-r-11", team: "Netherlands", firstName: "Theo", lastName: "Adams" },
    { id: "peewee-r-12", team: "Netherlands", firstName: "Kingsley", lastName: "Stagg" },
    { id: "peewee-r-13", team: "Netherlands", firstName: "Reeve", lastName: "Saypol" },
    { id: "peewee-r-14", team: "Netherlands", firstName: "Alexander", lastName: "Graff" },
    { id: "peewee-r-15", team: "Netherlands", firstName: "West", lastName: "Mandes" },

    { id: "peewee-r-16", team: "Sweden", firstName: "Leo", lastName: "Tilton" },
    { id: "peewee-r-17", team: "Sweden", firstName: "Maxwell", lastName: "Lim" },
    { id: "peewee-r-18", team: "Sweden", firstName: "Hayes", lastName: "Kwasniewski" },
    { id: "peewee-r-19", team: "Sweden", firstName: "Jude", lastName: "Cassidy" },
    { id: "peewee-r-20", team: "Sweden", firstName: "Estella", lastName: "Park" },
    { id: "peewee-r-21", team: "Sweden", firstName: "Kieran", lastName: "Farrelly" },
    { id: "peewee-r-22", team: "Sweden", firstName: "Calder", lastName: "Tortorella" },

    { id: "peewee-r-23", team: "Germany", firstName: "Desi", lastName: "Criscuolo" },
    { id: "peewee-r-24", team: "Germany", firstName: "Maddie", lastName: "Schwefel" },
    { id: "peewee-r-25", team: "Germany", firstName: "Mika", lastName: "Macleod" },
    { id: "peewee-r-26", team: "Germany", firstName: "Hayes", lastName: "Macleod" },
    { id: "peewee-r-27", team: "Germany", firstName: "Sebastian", lastName: "Kronewitter" },
    { id: "peewee-r-28", team: "Germany", firstName: "Melanie", lastName: "Farson" },
    { id: "peewee-r-29", team: "Germany", firstName: "Matthew", lastName: "Staffieri" },

    { id: "peewee-r-30", team: "Finland", firstName: "Luke", lastName: "DeMarco", isGoalie: true },
    { id: "peewee-r-31", team: "Finland", firstName: "Noah", lastName: "Lovejoy", isGoalie: true },
    { id: "peewee-r-32", team: "Germany", firstName: "Hudson", lastName: "Basile", isGoalie: true },
    { id: "peewee-r-33", team: "Netherlands", firstName: "Michael", lastName: "Nyarady", isGoalie: true },
    { id: "peewee-r-34", team: "Netherlands", firstName: "Trip", lastName: "Graham", isGoalie: true },
    { id: "peewee-r-35", team: "Sweden", firstName: "Ryan", lastName: "Aleman", isGoalie: true },
  ],

  Bantam: [
    { id: "bantam-r-1", team: "Canada", firstName: "Sienna", lastName: "Chodos" },
    { id: "bantam-r-2", team: "Canada", firstName: "Will", lastName: "Dalton" },
    { id: "bantam-r-3", team: "Canada", firstName: "Connor", lastName: "Greenstein" },
    { id: "bantam-r-4", team: "Canada", firstName: "Theodore", lastName: "Sack" },
    { id: "bantam-r-5", team: "Canada", firstName: "Olivia", lastName: "Laoun" },
    { id: "bantam-r-6", team: "Canada", firstName: "Joe", lastName: "McCurdy" },
    { id: "bantam-r-7", team: "Canada", firstName: "Edward", lastName: "Rizzo" },
    { id: "bantam-r-8", team: "Canada", firstName: "Charlie", lastName: "Morin" },
    { id: "bantam-r-9", team: "Canada", firstName: "Violet", lastName: "Parisi" },
    { id: "bantam-r-10", team: "Canada", firstName: "Kiki", lastName: "Davis" },
    { id: "bantam-r-11", team: "Canada", firstName: "Jace", lastName: "Garcia" },

    { id: "bantam-r-12", team: "Sweden", firstName: "Thomas", lastName: "Miranowski" },
    { id: "bantam-r-13", team: "Sweden", firstName: "Max", lastName: "Gordon" },
    { id: "bantam-r-14", team: "Sweden", firstName: "Jason", lastName: "Vartuli" },
    { id: "bantam-r-15", team: "Sweden", firstName: "Willet", lastName: "Carpenteri" },
    { id: "bantam-r-16", team: "Sweden", firstName: "Quinn", lastName: "Kwasniewsk" },
    { id: "bantam-r-17", team: "Sweden", firstName: "Angus", lastName: "Valentine" },
    { id: "bantam-r-18", team: "Sweden", firstName: "Chole", lastName: "Gaggin" },
    { id: "bantam-r-19", team: "Sweden", firstName: "Jack", lastName: "Vives" },
    { id: "bantam-r-20", team: "Sweden", firstName: "Graydon", lastName: "Kronewitter" },
    { id: "bantam-r-21", team: "Sweden", firstName: "Jaquelyn", lastName: "Farson" },
    { id: "bantam-r-22", team: "Sweden", firstName: "Austin", lastName: "Moore" },
    { id: "bantam-r-23", team: "Sweden", firstName: "Henry", lastName: "Mason" },

    { id: "bantam-r-24", team: "Finland", firstName: "Hunter", lastName: "Ward" },
    { id: "bantam-r-25", team: "Finland", firstName: "Luke", lastName: "Salib" },
    { id: "bantam-r-26", team: "Finland", firstName: "Ryan", lastName: "Hellinger" },
    { id: "bantam-r-27", team: "Finland", firstName: "Juliana", lastName: "Ebanks" },
    { id: "bantam-r-28", team: "Finland", firstName: "Teddy", lastName: "Jordan" },
    { id: "bantam-r-29", team: "Finland", firstName: "Reva", lastName: "Tilton" },
    { id: "bantam-r-30", team: "Finland", firstName: "Jordy", lastName: "Hellinger" },
    { id: "bantam-r-31", team: "Finland", firstName: "Jake", lastName: "Schwefel" },
    { id: "bantam-r-32", team: "Finland", firstName: "Joy", lastName: "Adams" },
    { id: "bantam-r-33", team: "Finland", firstName: "Bennett", lastName: "Van Dusen" },

    { id: "bantam-r-34", team: "Germany", firstName: "Mason", lastName: "Warwick" },
    { id: "bantam-r-35", team: "Germany", firstName: "Dylan", lastName: "Zalis" },
    { id: "bantam-r-36", team: "Germany", firstName: "Arthur", lastName: "Butcher" },
    { id: "bantam-r-37", team: "Germany", firstName: "Dino", lastName: "Ibrahim" },
    { id: "bantam-r-38", team: "Germany", firstName: "Charles", lastName: "Bittman" },
    { id: "bantam-r-39", team: "Germany", firstName: "Ian", lastName: "Bishop" },
    { id: "bantam-r-40", team: "Germany", firstName: "Max", lastName: "Magnant" },
    { id: "bantam-r-41", team: "Germany", firstName: "Jaden", lastName: "Vazquez" },
    { id: "bantam-r-42", team: "Germany", firstName: "Luke", lastName: "Scaramella" },
    { id: "bantam-r-43", team: "Germany", firstName: "Charlotte", lastName: "Bishop" },
    { id: "bantam-r-44", team: "Germany", firstName: "Lucien", lastName: "Yantorno" },

    { id: "bantam-r-45", team: "Canada", firstName: "Grace", lastName: "Garcia", isGoalie: true },
    { id: "bantam-r-46", team: "Sweden", firstName: "Patrick", lastName: "Melton", isGoalie: true },
    { id: "bantam-r-47", team: "Finland", firstName: "Anèleah", lastName: "Stahl", isGoalie: true },
    { id: "bantam-r-48", team: "Finland", firstName: "Ryan", lastName: "Feinstein", isGoalie: true },
    { id: "bantam-r-49", team: "Germany", firstName: "Louis", lastName: "Thorne", isGoalie: true },
    { id: "bantam-r-50", team: "Sweden", firstName: "Luke", lastName: "DeMarco", isGoalie: true },
    { id: "bantam-r-51", team: "Germany", firstName: "Chase", lastName: "Hammock", isGoalie: true },
  ],

  "U16-18": [
    { id: "u16-r-1", team: "USA", firstName: "Lucas", lastName: "Oliver" },
    { id: "u16-r-2", team: "USA", firstName: "Cooper", lastName: "Auerswald" },
    { id: "u16-r-3", team: "USA", firstName: "Isaac", lastName: "Snedeker" },
    { id: "u16-r-4", team: "USA", firstName: "Langston", lastName: "Worth" },
    { id: "u16-r-5", team: "USA", firstName: "Topher", lastName: "Kern" },
    { id: "u16-r-6", team: "USA", firstName: "Charlie", lastName: "Tusa" },
    { id: "u16-r-7", team: "USA", firstName: "William", lastName: "Lewis" },
    { id: "u16-r-8", team: "USA", firstName: "Max", lastName: "Corbo" },
    { id: "u16-r-9", team: "USA", firstName: "Auggie", lastName: "Krueger" },
    { id: "u16-r-10", team: "USA", firstName: "Cook", lastName: "Van Wyck" },
    { id: "u16-r-11", team: "USA", firstName: "Mannie", lastName: "Stafford" },

    { id: "u16-r-12", team: "Netherlands", firstName: "Sasha", lastName: "Miranowski" },
    { id: "u16-r-13", team: "Netherlands", firstName: "Jackson", lastName: "Kronewitter" },
    { id: "u16-r-14", team: "Netherlands", firstName: "Hailey", lastName: "Dreher" },
    { id: "u16-r-15", team: "Netherlands", firstName: "Kiki", lastName: "Worden" },
    { id: "u16-r-16", team: "Netherlands", firstName: "John", lastName: "Greifzu III" },
    { id: "u16-r-17", team: "Netherlands", firstName: "Alexa", lastName: "Kwasniewski" },
    { id: "u16-r-18", team: "Netherlands", firstName: "Lexi", lastName: "Lisjak" },
    { id: "u16-r-19", team: "Netherlands", firstName: "Ethan", lastName: "Brown-Toussaint" },
    { id: "u16-r-20", team: "Netherlands", firstName: "Jake", lastName: "Spitz" },
    { id: "u16-r-21", team: "Netherlands", firstName: "Aidan", lastName: "Murray" },
    { id: "u16-r-22", team: "Netherlands", firstName: "Dylan", lastName: "Murray" },
    { id: "u16-r-23", team: "Netherlands", firstName: "Anderson", lastName: "Wiener" },

    { id: "u16-r-24", team: "Canada", firstName: "Andrew", lastName: "Salce" },
    { id: "u16-r-25", team: "Canada", firstName: "Alex", lastName: "Lonergan" },
    { id: "u16-r-26", team: "Canada", firstName: "Mack", lastName: "Grillo" },
    { id: "u16-r-27", team: "Canada", firstName: "Alexander", lastName: "Morin" },
    { id: "u16-r-28", team: "Canada", firstName: "Quinn", lastName: "Murphy" },
    { id: "u16-r-29", team: "Canada", firstName: "Henry", lastName: "Schwefel" },
    { id: "u16-r-30", team: "Canada", firstName: "Will", lastName: "Staffieri" },
    { id: "u16-r-31", team: "Canada", firstName: "Bo", lastName: "Carpenteri" },
    { id: "u16-r-32", team: "Canada", firstName: "Lachlan", lastName: "Welch" },
    { id: "u16-r-33", team: "Canada", firstName: "Asher", lastName: "Kepler" },
    { id: "u16-r-34", team: "Canada", firstName: "Jakob", lastName: "Pollack" },
    { id: "u16-r-35", team: "Canada", firstName: "Billy", lastName: "McGarvey" },

    { id: "u16-r-36", team: "Finland", firstName: "Andrew", lastName: "Erensen" },
    { id: "u16-r-37", team: "Finland", firstName: "Ryan", lastName: "Mora" },
    { id: "u16-r-38", team: "Finland", firstName: "Brendan", lastName: "OBrien" },
    { id: "u16-r-39", team: "Finland", firstName: "James", lastName: "Orrico" },
    { id: "u16-r-40", team: "Finland", firstName: "Zach", lastName: "Tuers" },
    { id: "u16-r-41", team: "Finland", firstName: "Luke", lastName: "Vartuli" },
    { id: "u16-r-42", team: "Finland", firstName: "Colton", lastName: "Green" },
    { id: "u16-r-43", team: "Finland", firstName: "Gabriel", lastName: "De Carvalho" },
    { id: "u16-r-44", team: "Finland", firstName: "Cooper", lastName: "O'Toole" },
    { id: "u16-r-45", team: "Finland", firstName: "Thomas", lastName: "Lomasney" },
    { id: "u16-r-46", team: "Finland", firstName: "Jonah", lastName: "Guttman" },
    { id: "u16-r-47", team: "Finland", firstName: "Myer", lastName: "Guttman" },
    { id: "u16-r-48", team: "Finland", firstName: "Ethan", lastName: "Brown-Toussaint" },
    { id: "u16-r-49", team: "Finland", firstName: "Jake", lastName: "McQuillan" },

    { id: "u16-r-50", team: "Canada", firstName: "Tiago", lastName: "Da Silva", isGoalie: true },
    { id: "u16-r-51", team: "Netherlands", firstName: "Bill", lastName: "Salib", isGoalie: true },
    { id: "u16-r-52", team: "Finland", firstName: "Henry", lastName: "Levin", isGoalie: true },
    { id: "u16-r-53", team: "USA", firstName: "Liam", lastName: "Feinstein", isGoalie: true },
    { id: "u16-r-54", team: "USA", firstName: "Graham", lastName: "Speck", isGoalie: true },
    { id: "u16-r-55", team: "Netherlands", firstName: "Jacob", lastName: "Solomon", isGoalie: true },
  ],
};

export default function App() {
  const [activeGroup, setActiveGroup] = useState<AgeGroup>("Mites");
  const [detailView, setDetailView] = useState<DetailView>("games");
  const ENABLE_RSVP = true;

  const heroImages = [
    { url: heroImage3, alt: "Wings Arena seating area" },
    { url: heroImage1, alt: "Wings Arena ice rink facility" },
    { url: heroImage2, alt: "Wings Arena ice rink view" },
    { url: heroImage4, alt: "Ice skates rental" },
  ];

  const SHADOW = "shadow-[0_8px_20px_rgba(0,0,0,0.45)]";
  const PAGE_BG = "bg-[#1f419b]";
  const CARD_OVERLAY = "bg-[#e51837]/85";

  const activeGames = useMemo(() => {
    const now = new Date();

    return GAME_DATA[activeGroup].filter((game) => {
      const matchup = game.matchup?.trim().toLowerCase() ?? "";

      if (
        matchup === "" ||
        matchup === "tbd" ||
        matchup === "4 vs 4 - all players bring light & dark jersey"
      ) {
        return false;
      }

      const gameDate = parseGameDateTime(game.date, game.time);
      if (!gameDate) return true;

      return gameDate >= now;
    });
  }, [activeGroup]);

  const activeStandings = useMemo(() => {
    return [...(STANDINGS_DATA[activeGroup] ?? [])].sort((a, b) => {
      const winPctDiff = getWinPercentage(b) - getWinPercentage(a);
      if (winPctDiff !== 0) return winPctDiff;

      if (b.wins !== a.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      if (b.ties !== a.ties) return b.ties - a.ties;

      return a.team.localeCompare(b.team);
    });
  }, [activeGroup]);

  const rosterGroups = useMemo(() => {
    const players = ROSTER_DATA[activeGroup] ?? [];
    const grouped = players.reduce<Record<string, RosterPlayer[]>>((acc, player) => {
      if (!acc[player.team]) acc[player.team] = [];
      acc[player.team].push(player);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([teamA], [teamB]) =>
      teamA.localeCompare(teamB)
    );
  }, [activeGroup]);

  const hasRoster = ROSTER_DATA[activeGroup].length > 0;

  return (
    <div className={`min-h-screen ${PAGE_BG} flex flex-col sm:block`}>
      {/* Header */}
      <header className={`${PAGE_BG} border-b border-[#b2dbd7]/70`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4">
          <nav className="flex items-center justify-between"></nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${PAGE_BG} border-b border-[#b2dbd7]/70`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 xl:px-0 py-12">
          <div className="grid lg:grid-cols-2 gap-y-8 lg:gap-y-8 lg:gap-x-[162px] items-center">
            <div className="lg:-ml-[60px] min-[1001px]:max-[1325px]:ml-0 min-[1001px]:max-[1325px]:pr-5">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={logo}
                  alt="Wings Arena"
                  className="w-[100px] mt-[-40px] mb-2"
                />
                <h1 className="text-[2.0rem] sm:text-4xl text-white text-center">
                  In-House Spring League
                </h1>

                <p className="text-[#b2dbd7] font-bold tracking-wide mt-3 text-center">
                  2026 Season
                </p>

                <div className="mt-[15px] -mb-[10px] h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
              </div>

              <div className="text-gray-200 mb-4 space-y-5 text-center text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                <p className="font-semibold text-gray-200">
                  A recreational league for travel team players.
                </p>

                <p>
                  In-house teams with a focus on <strong>development</strong> and{" "}
                  <strong>game play</strong>. Non-checking league.
                </p>

                <p className="text-gray-300 font-semibold">
                  Practice &amp; skills development designed to provide a
                  structured, competitive hockey experience
                </p>
              </div>
            </div>

            <div
              className={`
                relative h-64 sm:h-80 lg:h-96
                ml-[0px] lg:ml-0
                min-[1001px]:max-[1325px]:h-[320px]
                min-[1001px]:max-[1325px]:ml-0
                min-[1001px]:max-[1325px]:scale-[0.93]
                min-[1001px]:max-[1325px]:origin-top-left
                ${SHADOW}
                rounded-lg overflow-hidden
              `}
            >
              <HeroCarousel images={heroImages} interval={3000} />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Games / Rosters Section */}
      <section className={`${PAGE_BG} py-8 sm:py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="text-center mb-5">
            <h2 className="text-[1.65rem] sm:text-[2.2rem] text-white">
              League Schedule &amp; Rosters
            </h2>
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
            <p className="text-gray-200 text-sm sm:text-base">
              Select an age group, then switch between upcoming games, standings, and team rosters.
            </p>
          </div>

          <div
            className={`relative overflow-hidden rounded-[24px] border border-[#b2dbd7]/30 ${SHADOW}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(229,24,55,0.16)_0%,rgba(0,54,102,0.22)_22%,rgba(255,255,255,0.06)_100%)]" />
            <div className="absolute inset-0 bg-[#1b3f97]/45 backdrop-blur-[3px]" />

            <div className="relative z-10">
              {/* Age tabs */}
              <div className="border-b border-white/15 px-3 sm:px-5 pt-3 sm:pt-4">
                <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {AGE_GROUPS.map((group) => {
                    const isActive = activeGroup === group;

                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setActiveGroup(group)}
                        className={[
                          "shrink-0 rounded-full border px-4 py-2 text-sm sm:text-[15px] font-semibold transition whitespace-nowrap",
                          isActive
                            ? "bg-[#e51837] text-white border-[#ff9aad] shadow-[0_6px_18px_rgba(229,24,55,0.28)]"
                            : "bg-white/12 text-[#eef8fa] border-white/20 hover:bg-white/18",
                        ].join(" ")}
                      >
                        {group}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* View toggle */}
              <div className="px-3 sm:px-5 py-3 border-b border-white/15">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDetailView("games")}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      detailView === "games"
                        ? "bg-white text-[#0f3c72] border-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/15",
                    ].join(" ")}
                  >
                    View Games
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailView("standings")}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      detailView === "standings"
                        ? "bg-white text-[#0f3c72] border-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/15",
                    ].join(" ")}
                  >
                    View Standings
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailView("rosters")}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      detailView === "rosters"
                        ? "bg-white text-[#0f3c72] border-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/15",
                    ].join(" ")}
                  >
                    View Rosters
                  </button>
                </div>
              </div>

              {/* Games view */}
              {detailView === "games" &&
                (ENABLE_RSVP ? (
                  <RsvpFeature
                    activeGroup={activeGroup}
                    activeGames={activeGames}
                    activePlayers={ROSTER_DATA[activeGroup] ?? []}
                  />
                ) : (
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
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-white/10 text-white">
                                <td colSpan={5} className="px-5 py-10 text-center">
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
                          activeGames.map((game) => (
                            <div
                              key={game.id}
                              className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-[2px]"
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                  <p className="text-[15px] font-semibold leading-snug">
                                    {game.matchup}
                                  </p>
                                  <p className="text-[13px] text-[#d6edf1] mt-1">
                                    {game.date}
                                  </p>
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
                            </div>
                          ))
                        ) : (
                          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center text-white">
                            No upcoming games to display for {activeGroup}.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))}

              {/* Standings view */}
              {detailView === "standings" && (
                <div className="px-3 sm:px-5 py-4 sm:py-5">
                  {activeStandings.length > 0 ? (
                    <>
                      <div className="hidden md:block">
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-[2px]">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-[#0f3c72]/75 text-white uppercase tracking-[0.06em] text-sm">
                                <th className="px-5 py-4 text-left font-bold">Division-{activeGroup}-Teams</th>
                                <th className="px-5 py-4 text-center font-bold">Wins</th>
                                <th className="px-5 py-4 text-center font-bold">Losses</th>
                                <th className="px-5 py-4 text-center font-bold">Ties</th>
                              </tr>
                            </thead>

                            <tbody>
                              {activeStandings.map((row, index) => (
                                <tr
                                  key={`${activeGroup}-${row.team}`}
                                  className={
                                    index % 2 === 0
                                      ? "bg-white/10 text-white"
                                      : "bg-[#0d2f5a]/55 text-white"
                                  }
                                >
                                  <td className="px-5 py-4 border-b border-white/10 text-[15px] lg:text-[16px] font-semibold">
                                    {row.team}
                                  </td>
                                  <td className="px-5 py-4 border-b border-white/10 text-center text-[15px] lg:text-[16px]">
                                    {row.wins}
                                  </td>
                                  <td className="px-5 py-4 border-b border-white/10 text-center text-[15px] lg:text-[16px]">
                                    {row.losses}
                                  </td>
                                  <td className="px-5 py-4 border-b border-white/10 text-center text-[15px] lg:text-[16px]">
                                    {row.ties}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="md:hidden">
                        <div className="space-y-3">
                          <div className="rounded-2xl border border-white/15 bg-[#0f3c72]/70 px-4 py-3 text-center text-white">
                            <p className="text-[1rem] font-semibold">Division-{activeGroup}-Teams</p>
                          </div>

                          {activeStandings.map((row) => (
                            <div
                              key={`${activeGroup}-${row.team}`}
                              className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-[2px]"
                            >
                              <div className="flex items-center justify-between gap-3 mb-3">
                                <h3 className="text-[15px] font-semibold leading-snug">{row.team}</h3>
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
                                  {row.wins}W-{row.losses}L-{row.ties}T
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="rounded-xl bg-white/10 px-3 py-2">
                                  <p className="text-[#c4e6ea] uppercase tracking-wide text-[10px] mb-1">Wins</p>
                                  <p className="font-medium text-[15px]">{row.wins}</p>
                                </div>

                                <div className="rounded-xl bg-white/10 px-3 py-2">
                                  <p className="text-[#c4e6ea] uppercase tracking-wide text-[10px] mb-1">Losses</p>
                                  <p className="font-medium text-[15px]">{row.losses}</p>
                                </div>

                                <div className="rounded-xl bg-white/10 px-3 py-2">
                                  <p className="text-[#c4e6ea] uppercase tracking-wide text-[10px] mb-1">Ties</p>
                                  <p className="font-medium text-[15px]">{row.ties}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-8 text-center text-white">
                      <h3 className="text-[1.1rem] sm:text-[1.25rem] font-semibold mb-2">
                        {activeGroup} standings will be posted soon!
                      </h3>
                    </div>
                  )}
                </div>
              )}

              {/* Rosters view */}
              {detailView === "rosters" && (
                <div className="px-3 sm:px-5 py-4 sm:py-5">
                  {hasRoster ? (
                    <div className="max-h-[640px] overflow-y-auto pr-1">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {rosterGroups.map(([team, players]) => (
                          <div
                            key={team}
                            className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-[2px] overflow-hidden"
                          >
                            <div className="border-b border-white/15 px-4 py-3 bg-[#0f3c72]/55">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-white text-[1rem] sm:text-[1.1rem] font-semibold">
                                  {team}
                                </h3>
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] sm:text-[12px] text-white">
                                  {players.length} Player{players.length === 1 ? "" : "s"}
                                </span>
                              </div>
                            </div>

                            <div className="px-4 py-3">
                              <div className="space-y-2">
                                {players.map((player, index) => (
                                  <div
                                    key={player.id}
                                    className={[
                                      "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-white",
                                      index % 2 === 0 ? "bg-white/8" : "bg-white/4",
                                    ].join(" ")}
                                  >
                                    <div className="min-w-0">
                                      <p className="font-medium leading-tight">
                                        {player.firstName} {player.lastName}
                                      </p>
                                    </div>

                                    {player.isGoalie && (
                                      <span className="shrink-0 rounded-full border border-[#b2dbd7]/40 bg-[#b2dbd7]/15 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-[#e7fbff]">
                                        Goalie
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-8 text-center text-white">
                      <h3 className="text-[1.1rem] sm:text-[1.25rem] font-semibold mb-2">
                        {activeGroup} roster will be posted soon!
                      </h3>
                    </div>
                  )}
                </div>
              )}

              <div className="relative z-10 border-t border-white/15 px-4 sm:px-5 py-3 text-center text-[12px] sm:text-[13px] text-[#d7edf0]">
                Viewing:{" "}
                <span className="font-semibold text-white">
                  {activeGroup} {detailView === "games" ? "Games" : detailView === "standings" ? "Standings" : "Rosters"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section
        className="
          max-w-[calc(80rem*0.97+200px)]
          mx-auto
          px-0
          sm:px-6
          xl:px-8
          py-8
          max-[1000px]:pt-0
          max-[1000px]:mt-[18px]
          lg:mt-[25px]
        "
      >
        <div className="max-[640px]:w-[100vw] max-[640px]:ml-[calc(50%-50vw)] max-[640px]:px-3 max-[640px]:box-border">
          <div className="flex justify-center mb-[calc(1rem*1.0356)]">
            <div className={`w-full max-w-[760px] [&>*]:!w-full [&>*]:${SHADOW}`}>
              <InfoBox
                iconImage={allAgesIcon}
                title="Ages (Birth Years)"
                description={
                  <>
                    <strong>Mites</strong> (2020–2018) • <strong>Squirt</strong>{" "}
                    (2017–2016) • <strong>Peewee</strong> (2015–2014) •{" "}
                    <strong>Bantam</strong> (2013–2012) • <strong>U16-18</strong>{" "}
                    (2011–2008)
                  </>
                }
                iconSize="w-[35.35px] h-[35.35px]"
                iconOffset="-mt-[10px]"
                textOffset="-mt-[1.5px]"
                titleClassName="text-[15px] sm:text-[16px]"
                descriptionClassName="text-[11px] sm:text-[13px] leading-snug"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[calc(1rem*1.0356)] justify-items-stretch">
              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={practiceIcon}
                  title="Friday Practices"
                  description="Practices on Fridays (limited practice spots)"
                  iconSize="w-[40px] h-[40px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={hockeyFieldIcon}
                  title="Sunday Games"
                  description="Games on Sundays (weekly, by age group)"
                  iconSize="w-[39px] h-[39px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={coachingIcon}
                  title="Coaching"
                  description="Coached by Wings Arena professional coaches"
                  iconSize="w-[39px] h-[39px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={coedIcon}
                  title="Co-Ed League"
                  description="Open to both boys and girls"
                  iconSize="w-[36px] h-[36px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight min-h-[2.6em]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`${PAGE_BG} py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.7rem] sm:text-[2.15625rem] mb-2 text-white text-center">
            Pricing Options
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
          <p className="text-center text-gray-200 mb-6 font-semibold">
            Jersey included • Goalies play for FREE
          </p>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6 sm:gap-x-10 w-full max-w-5xl">
              <div
                className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}
              >
                <PriceCard
                  title="Games Only"
                  price="$550"
                  description="Jersey included"
                  features={["Non-checking league"]}
                />
              </div>

              <div
                className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}
              >
                <PriceCard
                  title="Games + Weekly Practice"
                  price="$800"
                  description="Jersey included"
                  features={["Friday practice (limited spots)", "Sunday games"]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule header + divider */}
      <section className={`${PAGE_BG} pt-2 pb-0`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.5625rem] sm:text-[2.2625rem] mb-0 sm:mb-5 text-white text-center">
            Schedule
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
        </div>
      </section>

      {/* Weekly Schedules */}
      <div className="w-[92%] sm:w-full max-w-6xl mx-auto my-8 mt-2">
        <div
          className={`relative overflow-hidden rounded-lg border border-white/20 p-6 sm:p-8 ${SHADOW}`}
        >
          <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
              <div>
                <h3 className="text-white text-[1.25rem] sm:text-[1.6rem] mb-3 text-center">
                  Friday Practice Schedule
                </h3>

                <ul className="text-white space-y-2 text-[0.98rem] sm:text-[1.05rem] text-center">
                  <li>• 4:10 PM — Mites</li>
                  <li>• 5:20 PM — Squirt</li>
                  <li>• 6:30 PM — Peewee</li>
                </ul>

                <p className="text-white mt-4 text-[0.92rem] text-center">
                  Limited practice spots available.
                </p>
              </div>

              <div className="md:border-l md:border-white/25 md:pl-8">
                <h3 className="text-white text-[1.25rem] sm:text-[1.6rem] mb-4 text-center">
                  Sunday Game Schedule
                </h3>

                <ul className="text-white space-y-2 text-[0.98rem] sm:text-[1.05rem] text-center">
                  <li>• 7:00 AM / 8:10 AM — Mites</li>
                  <li>• 9:20 AM / 10:30 AM — Squirt</li>
                  <li>• 1:30 PM / 2:40 PM — Peewee</li>
                  <li>• 3:55 PM / 5:20 PM — Bantam</li>
                  <li>• 6:50 PM / 8:15 PM — U16-18</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration / Contact */}
      <section className={`${PAGE_BG} py-8 pb-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.5625rem] sm:text-[2.2625rem] mb-0 sm:mb-5 text-white text-center">
            Registration
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          <div className="w-[90%] sm:w-full max-w-3xl mx-auto my-8">
            <div
              className={`relative overflow-hidden rounded-lg border border-white/20 p-6 sm:p-8 text-center ${SHADOW}`}
            >
              <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />
              <div className="relative z-10">
                <h3 className="text-white text-[1.35rem] sm:text-[1.65rem] mb-2 -mt-[10px]">
                  Register Today!
                </h3>

                <p className="text-white leading-relaxed">
                  Use the QR code or click the link below to register.
                </p>

                <img
                  src={qrCode}
                  alt="Registration QR Code"
                  className="mx-auto mt-5 w-[120px] sm:w-[160px] h-auto rounded-md bg-white p-2"
                />

                <a
                  href="https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=8390&GroupID=3982414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-bold underline underline-offset-4 text-blue-600 hover:text-blue-700 transition text-lg md:text-3xl lg:text-3xl xl:text-4xl"
                >
                  Click Here to Register
                </a>

                <div className="my-6 h-px w-full bg-white/25" />

                <h3 className="text-white text-[1.35rem] sm:text-[1.65rem] mb-3">
                  Questions?
                </h3>

                <p className="text-white">
                  Email: <span className="font-semibold">Kebanks@wingsarena.com</span>
                </p>

                <div className="mt-4 text-white space-y-1">
                  <p className="font-semibold text-white">Wings Arena</p>
                  <p>5 Barry Place • Stamford, CT 06902</p>
                  <p>203.357.1055</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`${PAGE_BG} py-12 sm:py-12 pt-0 sm:pt-12 mt-[35px] sm:mt-0 -translate-y-[15px]`}
      >
        <div className="max-w-[58.08rem] mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-white text-center">
            Frequently Asked Questions
          </h2>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          <div
            className={`relative overflow-hidden rounded-lg border border-white/20 ${SHADOW}`}
          >
            <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />

            <div className="relative z-10">
              <Accordion
                type="single"
                collapsible
                className="bg-transparent px-4 sm:px-6"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-white">
                    Who is this league for?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    This is a recreational in-house spring league for travel team
                    players, designed for Ages 7–18 (Mite/Squirt/Peewee/Bantam/U16-18).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-white">
                    What’s included with registration?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    Pricing options include Games Only ($550) or Games + 1 Weekly
                    Practice ($800). A jersey is included with both options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-white">
                    When are practices and games?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    Practices are Fridays (limited spots). Games are Sundays. See the
                    schedule sections above for the full breakdown by age group.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-white">
                    Do goalies have to pay?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    No — goalies play for FREE.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
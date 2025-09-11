import type { Option } from "../types";

export const initialChordOptions: Option[] = [
  {
    id: 1,
    label: "7",
    pronunciation: "dominant seven",
    active: true,
  },
  {
    id: 2,
    label: "M7",
    pronunciation: "major seven",
    active: true,
  },
  {
    id: 3,
    label: "m7",
    pronunciation: "minor 7",
    active: false,
  },
  {
    id: 4,
    label: "m7(\u266d5)",
    pronunciation: "minor seven flat five",
    active: false,
  },
  {
    id: 5,
    label: "\u00B07",
    pronunciation: "diminished seven",
    active: false,
  },
  {
    id: 6,
    label: "7alt",
    pronunciation: "altered seven",
    active: false,
  },
];

import { isSameDay, parse } from "date-fns";
import { MANIFEST } from ".";
import { ManifestEntry } from "./types";

export function getManifestEntryByDate(date: Date): ManifestEntry | undefined {
    return MANIFEST.entries.find(entry => {
        let thisDate = new Date();
        thisDate = parse(entry.date, "MM/dd", thisDate);

        return isSameDay(thisDate, date);
    });
}

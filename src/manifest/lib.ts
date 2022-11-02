import { isSameDay, parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { MANIFEST } from ".";
import { Manifest, ManifestEntry, UserManifest, UserManifestEntry } from "./types";

export function getManifestEntryByDate(date: Date): ManifestEntry | undefined {
    return MANIFEST.entries.find(entry => {
        return isSameDay(entry.date, date);
    });
}

export function createManifest(manifest: UserManifest): Manifest {
    return {
        entries: manifest.entries.map(e => populateManifestEntry(e, manifest.timezone)),
    };
}

function populateManifestEntry(entry: UserManifestEntry, tz: string): ManifestEntry {
    let thisDate = new Date();
    thisDate = parse(entry.date, "MM/dd", thisDate);
    thisDate = parse(entry.time, "h:mmaaa", thisDate);
    thisDate = zonedTimeToUtc(thisDate, tz);

    return {
        title: entry.title,
        date: thisDate,
    };
}

import { useMemo } from "react";

import { getManifestEntryByDate } from "../../manifest/lib";
import { MatchedScheduleEntry } from "./MatchedScheduleEntry";
import { UnmatchedScheduleEntry } from "./UnmatchedScheduleEntry";

export interface ScheduleEntryProps {
    date: Date;
}

export function ScheduleEntry(props: ScheduleEntryProps) {
    const { date } = props;

    const matchedEntry = useMemo(() => getManifestEntryByDate(date), [date]);

    if (matchedEntry) {
        return <MatchedScheduleEntry entry={matchedEntry} date={date} />;
    }

    return <UnmatchedScheduleEntry date={date} />;
}

import { isSameDay, parse } from "date-fns";
import { MANIFEST } from "../../manifest";
import { MatchedScheduleEntry } from "./MatchedScheduleEntry";
import { UnmatchedScheduleEntry } from "./UnmatchedScheduleEntry";

export interface ScheduleEntryProps {
    date: Date;
}

export function ScheduleEntry(props: ScheduleEntryProps) {
    const { date } = props;

    const matchedEntry = MANIFEST.entries.find(entry => {
        let thisDate = new Date();
        thisDate = parse(entry.date, "MM/dd", thisDate);

        return isSameDay(thisDate, date);
    });

    if (matchedEntry) {
        return <MatchedScheduleEntry entry={matchedEntry} date={date} />;
    }

    return <UnmatchedScheduleEntry date={date} />;
}

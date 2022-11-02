import { addDays, addWeeks, eachDayOfInterval, format, startOfWeek, subDays } from "date-fns";

import { getManifestEntryByDate } from "./manifest/lib";

import { Fragment } from "react";
import styled from "styled-components";
import backgroundUrl from "./assets/Background.jpg";
import { ManifestEntry } from "./manifest/types";

const RootDiv = styled.div`
    position: relative;
    overflow: hidden;
`;

const BackgroundImg = styled.img`
    width: 100%;
`;

const WeekOfText = styled.div`
    position: absolute;
    right: 1vw;
    top: 1vw;
    width: 41vw;

    text-align: center;

    font-size: 2vw;
    font-family: "Star Fighters";
`;

const EntriesDiv = styled.div`
    position: absolute;

    display: grid;
    top: 12vw;
    right: 1vw;
    width: 41vw;
    gap: 0 1vw;

    font-size: 2vw;

    grid-template:
        ". . ." 5vw
        ". . ." 5vw
        ". . ." 5vw
        ". . ." 5vw
        ". . ." 5vw
        ". . ." 5vw / auto 1fr auto;
`;

function App() {
    const [weekStart, weekEnd] = getScheduleDateRange();

    const weekFrom = format(weekStart, "M/dd");
    const weekTo = format(weekEnd, "M/dd");

    const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
    });

    const monEntry = getManifestEntryByDate(days[0]);
    const tuesEntry = getManifestEntryByDate(days[1]);
    const wedEntry = getManifestEntryByDate(days[2]);
    const thursEntry = getManifestEntryByDate(days[3]);
    const friEntry = getManifestEntryByDate(days[4]);
    const satEntry = getManifestEntryByDate(days[5]);
    const sunEntry = getManifestEntryByDate(days[6]);

    const weekendDay = satEntry != null ? "Saturday" : sunEntry != null ? "Sunday" : "Weekend";
    const weekendEntry = satEntry ?? sunEntry;

    return (
        <RootDiv>
            <BackgroundImg src={backgroundUrl}></BackgroundImg>

            <WeekOfText>
                Week of
                <br />
                {weekFrom} - {weekTo}
            </WeekOfText>

            <EntriesDiv>
                <EntryRow day="Monday" entry={monEntry} />
                <EntryRow day="Tuesday" entry={tuesEntry} />
                <EntryRow day="Wednesday" entry={wedEntry} />
                <EntryRow day="Thursday" entry={thursEntry} />
                <EntryRow day="Friday" entry={friEntry} />

                <EntryRow day={weekendDay} entry={weekendEntry} />
            </EntriesDiv>
        </RootDiv>
    );
}

const DayDiv = styled.div``;

const EmptyDayDiv = styled(DayDiv)`
    color: rgba(0, 0, 0, 0.5);
`;

const NameDiv = styled.div`
    justify-self: center;
    font-weight: bold;
`;

const TimeDiv = styled.div`
    font-family: "Digital 7";
    font-size: 1.2em;
    justify-self: end;
`;

function EntryRow(props: { day: string; entry: ManifestEntry | undefined }) {
    const { day, entry } = props;

    if (!entry) {
        return (
            <Fragment>
                <EmptyDayDiv>{day}</EmptyDayDiv>
                <NameDiv></NameDiv>
                <TimeDiv></TimeDiv>
            </Fragment>
        );
    }
    const dateText = format(entry.date, "h:mm aa");

    return (
        <Fragment>
            <DayDiv>{day}</DayDiv>

            <NameDiv>{entry.title}</NameDiv>

            <TimeDiv>{dateText}</TimeDiv>
        </Fragment>
    );
}

export default App;

function getScheduleDateRange(): [Date, Date] {
    const now = new Date();
    let weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const thisSunday = addDays(weekStart, 6);

    const nextWeekStart = addWeeks(weekStart, 1);

    // Skip to next week if its close to next week and no Sunday stream
    const entry = getManifestEntryByDate(thisSunday);
    if (nextWeekStart < addDays(now, 1) && !entry) {
        weekStart = nextWeekStart;
    }

    const lastDayInWeek = subDays(addWeeks(weekStart, 1), 1);

    return [weekStart, lastDayInWeek];
}

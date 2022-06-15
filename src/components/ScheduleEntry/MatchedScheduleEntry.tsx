import { format, parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { MANIFEST, ManifestScheduleEntry } from "../../manifest";
import { DAY_OF_WEEK_WIDTH, ScheduleEntryRootDiv } from "./constants";

export interface MatchedScheduleEntryProps extends ScheduleEntryProps {
    entry: ManifestScheduleEntry;
}

const RootDiv = styled(ScheduleEntryRootDiv)`
    overflow: hidden;
    display: grid;
    position: relative;

    z-index: 1;

    grid-template:
        "dayOfWeek entryTitle" 1fr
        "entryTime entryTitle" 1fr /
        ${DAY_OF_WEEK_WIDTH} 1fr;
`;

const DayOfWeekDiv = styled.div`
    grid-area: dayOfWeek;

    align-self: flex-end;
`;
const EntryTimeDiv = styled.div`
    grid-area: entryTime;
`;
const EntryNameDiv = styled.div`
    grid-area: entryTitle;

    align-self: center;

    display: flex;
    flex-direction: column;

    align-content: center;
`;

const BackgroundVideo = styled.video`
    position: absolute;
    top: -200px;
    left: 0;
    z-index: -1;

    filter: blur(4px);

    width: 100%;
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 200px;
`;

export function MatchedScheduleEntry(props: MatchedScheduleEntryProps) {
    const { entry, date } = props;

    let thisDate = new Date();
    thisDate = parse(entry.date, "MM/dd", thisDate);
    thisDate = parse(entry.time, "h:mmaaa", thisDate);
    thisDate = zonedTimeToUtc(thisDate, MANIFEST.timezone);

    return (
        <RootDiv>
            {entry.background?.type === "video" && (
                <BackgroundVideo autoPlay loop muted src={entry.background?.url} />
            )}
            {entry.background?.type === "image" && <BackgroundImage src={entry.background?.url} />}

            <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
            <EntryTimeDiv>{format(thisDate, "h:mmaaa")}</EntryTimeDiv>

            <EntryNameDiv>
                {entry.logo ? (
                    <img style={entry.logo.css} title={entry.title} src={entry.logo.url} />
                ) : (
                    entry.title
                )}
            </EntryNameDiv>
        </RootDiv>
    );
}

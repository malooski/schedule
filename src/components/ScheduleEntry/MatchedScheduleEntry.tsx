import { format, parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { THEME } from "../../constants";
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

const EntryDescriptionDiv = styled.div`
    font-size: 48px;
`;

const LogoImg = styled.img``;

const CollabersDiv = styled.div`
    position: absolute;

    font-size: 16px;
    bottom: 4px;
    left: 300px;

    display: flex;
    flex-direction: row;
    gap: 4px;

    a {
        color: ${THEME.colors.lightGrey};
    }
`;

const CollabersListDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

export function MatchedScheduleEntry(props: MatchedScheduleEntryProps) {
    const { entry, date } = props;

    let thisDate = new Date();
    thisDate = parse(entry.date, "MM/dd", thisDate);
    thisDate = parse(entry.time, "h:mmaaa", thisDate);
    thisDate = zonedTimeToUtc(thisDate, MANIFEST.timezone);

    return (
        <RootDiv>
            <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
            <EntryTimeDiv>{format(thisDate, "h:mmaaa")}</EntryTimeDiv>

            <EntryNameDiv>
                {entry.logo ? (
                    <LogoImg style={entry.logo.css} title={entry.title} src={entry.logo.url} />
                ) : (
                    <EntryDescriptionDiv>{entry.title}</EntryDescriptionDiv>
                )}
            </EntryNameDiv>

            {entry.collabers && (
                <CollabersDiv>
                    <span>Joined by:</span>
                    <CollabersListDiv>
                        {entry.collabers.map(c => (
                            <a href={c.twitterUrl} target="_blank" rel="noopener noreferrer">
                                {c.name}
                            </a>
                        ))}
                    </CollabersListDiv>
                </CollabersDiv>
            )}
        </RootDiv>
    );
}

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
    background-size: cover;
    background-position: center;

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
    font-weight: bold;

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
    font-size: 1.5em;
    color: ${THEME.colors.lightGrey};
`;

const LogoImg = styled.img`
    width: auto;
    height: 2.5em;
`;

const CollabersDiv = styled.div`
    position: absolute;
    bottom: 2em;
    left: 15em;

    font-size: 0.5em;
    bottom: 0.1em;

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
    gap: 0.5em;
`;

export function MatchedScheduleEntry(props: MatchedScheduleEntryProps) {
    const { entry, date } = props;

    let thisDate = new Date();
    thisDate = parse(entry.date, "MM/dd", thisDate);
    thisDate = parse(entry.time, "h:mmaaa", thisDate);
    thisDate = zonedTimeToUtc(thisDate, MANIFEST.timezone);

    return (
        <RootDiv
            style={{
                backgroundColor: entry.bgColor,
                color: entry.textColor,
                backgroundImage: entry.bgImage,
                borderColor: entry.borderColor,
            }}
        >
            <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
            <EntryTimeDiv>{format(thisDate, "h:mmaaa")}</EntryTimeDiv>

            <EntryNameDiv>
                {entry.logo ? (
                    <div>
                        <LogoImg style={entry.logo.css} title={entry.title} src={entry.logo.url} />
                    </div>
                ) : (
                    <EntryDescriptionDiv style={{ color: entry.textColor }}>
                        {entry.title}
                    </EntryDescriptionDiv>
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

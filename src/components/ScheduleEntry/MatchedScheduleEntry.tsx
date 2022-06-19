import { format, parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { THEME } from "../../constants";
import { MANIFEST, ManifestScheduleEntry } from "../../manifest";
import { DayOfWeekDiv, ScheduleEntryRootDiv } from "./common";
import { CONTENT_HORIZONTAL_PADDING, DAY_OF_WEEK_WIDTH } from "./constants";

export interface MatchedScheduleEntryProps extends ScheduleEntryProps {
    entry: ManifestScheduleEntry;
}

const RootDiv = styled(ScheduleEntryRootDiv)`
    overflow: hidden;
    z-index: 1;

    display: flex;
    flex-direction: column;
`;

const HeaderDiv = styled.div`
    display: grid;
    grid-template:
        "dayOfWeek entryTime" 1fr /
        ${DAY_OF_WEEK_WIDTH} 1fr;

    font-size: 1.2em;
    margin: 0.2em 1em;
`;

const FooterDiv = styled.div`
    font-size: 0.667em;
    margin: 0.2em ${CONTENT_HORIZONTAL_PADDING};
`;

const BodyDiv = styled.div`
    background-size: cover;
    background-position: center;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const EntryTimeDiv = styled.div`
    grid-area: entryTime;
    justify-self: end;

    font-family: "Digital 7", monospace;
`;
const EntryNameDiv = styled.div`
    grid-area: entryTitle;

    align-self: center;

    display: flex;
    flex-direction: column;

    align-content: center;

    overflow: hidden;
`;

const EntryDescriptionDiv = styled.div`
    font-size: 1.5em;
    color: ${THEME.colors.lightGrey};
`;

const LogoImg = styled.img`
    height: 4em;
    padding: 0.5em;
`;

const CollabersDiv = styled.div`
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
        <RootDiv>
            <HeaderDiv>
                <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
                <EntryTimeDiv>{format(thisDate, "h:mmaaa")}</EntryTimeDiv>
            </HeaderDiv>
            <BodyDiv style={{ backgroundImage: entry.bgImage }}>
                <EntryNameDiv>
                    {entry.logo ? (
                        <div>
                            <LogoImg
                                style={entry.logo.css}
                                title={entry.title}
                                src={entry.logo.url}
                            />
                        </div>
                    ) : (
                        <EntryDescriptionDiv style={{ color: entry.textColor }}>
                            {entry.title}
                        </EntryDescriptionDiv>
                    )}
                </EntryNameDiv>
            </BodyDiv>
            {entry.collabers && (
                <FooterDiv>
                    {entry.collabers && (
                        <CollabersDiv>
                            <span>Joined by:</span>
                            <CollabersListDiv>
                                {entry.collabers.map(c => (
                                    <a
                                        href={c.twitterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {c.name}
                                    </a>
                                ))}
                            </CollabersListDiv>
                        </CollabersDiv>
                    )}
                </FooterDiv>
            )}
        </RootDiv>
    );
}

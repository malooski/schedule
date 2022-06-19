import { format, parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { THEME } from "../../constants";
import { MANIFEST } from "../../manifest";
import { ManifestEntry } from "../../manifest/types";
import useIntervalFlip from "../../util/react/use-interval-flip";
import { DayOfWeekDiv, ScheduleEntryRootDiv } from "./common";
import { CONTENT_HORIZONTAL_PADDING, DAY_OF_WEEK_WIDTH } from "./constants";

export interface MatchedScheduleEntryProps extends ScheduleEntryProps {
    entry: ManifestEntry;
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
    margin: 0.2em 1em; ;
`;

const FooterDiv = styled.div`
    font-size: 0.667em;
    margin: 0.2em ${CONTENT_HORIZONTAL_PADDING};
`;

const BodyDiv = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    min-height: 4em;

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

const BackgroundVideo = styled.video`
    max-width: 100%;
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

    const { theme } = entry;

    let thisDate = new Date();
    thisDate = parse(entry.date, "MM/dd", thisDate);
    thisDate = parse(entry.time, "h:mmaaa", thisDate);
    thisDate = zonedTimeToUtc(thisDate, MANIFEST.timezone);

    const timeText = useIntervalFlip(
        () => format(thisDate, "h:mmaaa"),
        () => format(thisDate, "h mmaaa"),
        1000,
        [thisDate]
    );

    return (
        <RootDiv>
            <HeaderDiv>
                <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
                <EntryTimeDiv>{timeText}</EntryTimeDiv>
            </HeaderDiv>
            <BodyDiv style={{ backgroundImage: theme?.bgImage }}>
                {theme?.bgVideo && (
                    <BackgroundVideo autoPlay loop muted playsInline src={theme?.bgVideo} />
                )}
                <EntryNameDiv>
                    {theme?.logo && (
                        <div>
                            <LogoImg
                                style={theme?.logo.css}
                                title={entry.title}
                                src={theme?.logo.url}
                            />
                        </div>
                    )}
                    {entry.text && (
                        <EntryDescriptionDiv style={{ color: theme?.textColor }}>
                            {entry.text}
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

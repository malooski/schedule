import { faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays, addWeeks, eachDayOfInterval, format, startOfWeek, subDays } from "date-fns";
import styled from "styled-components";

import { ScheduleEntry } from "./components/ScheduleEntry";
import { MALOOSKI_LOGO_WEBM_URL } from "./components/ScheduleEntry/constants";
import { THEME } from "./constants";
import { getManifestEntryByDate } from "./manifest/lib";

const RootDiv = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        -45deg,
        #eda3ec,
        #c765c8,
        #855cd2,
        #613fb6,
        #c765c8,
        #eda3ec,
        #f2b5cf
    );
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`;

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0.5em 0;
`;

const InnerDiv = styled.div`
    border-radius: 1em;

    width: 900px;

    flex-grow: 1;
    background-image: radial-gradient(#515257, #3b3846);
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2em 0;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;

    gap: 2em;

    margin: 0.5em 0em;
`;

const HeaderLink = styled.a`
    color: ${THEME.colors.lightGrey};
`;

const LogoVideo = styled.video`
    width: 100%;
    margin: -8em 0 -4em 0;

    // click through
    user-select: none;
    pointer-events: none;
`;

const EntriesArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    gap: 8px;
`;

const WeekHeader = styled.div`
    font-family: "Star Fighters";

    font-size: 2em;
    font-weight: bold;
    color: ${THEME.colors.lightGrey};
`;

function App() {
    const [weekStart, weekEnd] = getScheduleDateRange();

    const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
    });

    return (
        <RootDiv>
            <ContainerDiv>
                <Header>
                    <HeaderLink href="https://maloo.ski" target="_blank" rel="norefferer">
                        Home
                    </HeaderLink>
                    <HeaderLink href="https://twitch.tv/malooski" target="_blank" rel="norefferer">
                        <FontAwesomeIcon icon={faTwitch} /> Twitch
                    </HeaderLink>
                    <HeaderLink
                        href="https://twitter.com/malooski_vt"
                        target="_blank"
                        rel="norefferer"
                    >
                        <FontAwesomeIcon icon={faTwitter} /> Twitter
                    </HeaderLink>
                </Header>
                <InnerDiv>
                    <LogoVideo autoPlay muted loop src={MALOOSKI_LOGO_WEBM_URL} />

                    <WeekHeader>
                        Week Of {format(weekStart, "M/d")} - {format(weekEnd, "M/d")}
                    </WeekHeader>

                    <EntriesArea>
                        {days.map(day => (
                            <ScheduleEntry date={day} />
                        ))}
                    </EntriesArea>
                </InnerDiv>
            </ContainerDiv>
        </RootDiv>
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

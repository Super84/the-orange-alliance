import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Match from '../../models/Match';
import Team from '../../models/Team';

@Component({
  selector: 'match-table',
  templateUrl: './match-table.component.html'
})
export class MatchTableComponent {
  @Input() matchList?: Match[];
  @Input() match?: Match;
  @Input() team?: Team;

  public getMatchResultString(match: Match): string {
    let teamStation = 0;
    for (const participant of match.participants) {
      // Again, don't know why === isn't working, it's probably a type error?
      if (participant.teamKey == this.team.teamKey) {
        teamStation = participant.station;
        break;
      }
    }

    if (match.redScore == null || match.blueScore == null) {
      return '';
    } else if (teamStation < 20 && match.redScore > match.blueScore) {
      return 'W';
    } else if (match.redScore == match.blueScore) {
      return 'T';
    } else if (teamStation > 20 && match.redScore < match.blueScore) {
      return 'W';
    } else {
      return 'L';
    }
  }

  public getParticipantString(match: Match, index: number): string {
    return match.participants[index].teamKey.toString() + (match.participants[index].stationStatus === 0 ?  + '*' : '');
  }

  public isSelectedTeam(match: Match, index: number): boolean {
    // Don't know why, but there is a typing problem here when I use ===
    return match.participants[index].teamKey == this.team.teamNumber;
  }
}

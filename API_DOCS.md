# NRSSSA Football Results Portal - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Health Check
```
GET /health
```
Returns API status and version.

### Tournaments

#### List All Tournaments
```
GET /tournaments
```
Response:
```json
[
  {
    "id": "uuid",
    "name": "NRSSSA Championship 2026",
    "description": "Main championship",
    "start_date": "2026-06-01",
    "end_date": "2026-08-31",
    "max_teams": 16,
    "num_groups": 2,
    "status": "draft",
    "created_at": "2026-07-07T10:00:00Z"
  }
]
```

#### Create Tournament
```
POST /tournaments
Content-Type: application/json

{
  "name": "Tournament Name",
  "description": "Description",
  "start_date": "2026-06-01",
  "end_date": "2026-08-31",
  "max_teams": 16,
  "num_groups": 2
}
```

#### Get Tournament Details
```
GET /tournaments/{id}
```

#### Update Tournament
```
PUT /tournaments/{id}
Content-Type: application/json

{
  "status": "ongoing",
  "name": "Updated Name"
}
```

#### Delete Tournament
```
DELETE /tournaments/{id}
```

### Teams

#### Get All Teams in Tournament
```
GET /tournaments/{tournamentId}/teams
```

#### Register Team
```
POST /tournaments/{tournamentId}/teams
Content-Type: application/json

{
  "name": "Team Name",
  "logo_url": "https://example.com/logo.png",
  "group_id": "uuid (optional)"
}
```

#### Get Team Details
```
GET /tournaments/{tournamentId}/teams/{teamId}
```

#### Update Team Stats
```
PUT /tournaments/{tournamentId}/teams/{teamId}
Content-Type: application/json

{
  "wins": 3,
  "losses": 1,
  "draws": 0,
  "goals_for": 10,
  "goals_against": 3,
  "points": 9
}
```

#### Delete Team
```
DELETE /tournaments/{tournamentId}/teams/{teamId}
```

### Fixtures (Matches)

#### Get All Fixtures
```
GET /tournaments/{tournamentId}/fixtures
```

#### Get Fixtures by Stage
```
GET /tournaments/{tournamentId}/fixtures/stage/{stage}
```
Stages: `group`, `quarterfinal`, `semifinal`, `final`

#### Create Fixture
```
POST /tournaments/{tournamentId}/fixtures
Content-Type: application/json

{
  "home_team_id": "uuid",
  "away_team_id": "uuid",
  "match_date": "2026-06-15T14:00:00Z",
  "stage": "group",
  "group_id": "uuid (optional)"
}
```

#### Update Fixture Result
```
PUT /tournaments/{tournamentId}/fixtures/{fixtureId}
Content-Type: application/json

{
  "status": "completed",
  "home_goals": 2,
  "away_goals": 1
}
```

#### Delete Fixture
```
DELETE /tournaments/{tournamentId}/fixtures/{fixtureId}
```

### Groups

#### Get All Groups
```
GET /tournaments/{tournamentId}/groups
```

#### Create Group
```
POST /tournaments/{tournamentId}/groups
Content-Type: application/json

{
  "name": "Group A",
  "group_number": 1
}
```

#### Delete Group
```
DELETE /tournaments/{tournamentId}/groups/{groupId}
```

### Results

#### Get Result by Fixture
```
GET /results/fixture/{fixtureId}
```

#### Get All Results for Tournament
```
GET /results/tournament/{tournamentId}
```

#### Record Match Result
```
POST /results
Content-Type: application/json

{
  "fixture_id": "uuid",
  "home_team_id": "uuid",
  "away_team_id": "uuid",
  "home_goals": 2,
  "away_goals": 1,
  "recorded_by": "admin@example.com"
}
```

#### Update Result
```
PUT /results/{resultId}
Content-Type: application/json

{
  "home_goals": 3,
  "away_goals": 1
}
```

#### Delete Result
```
DELETE /results/{resultId}
```

### Brackets (Knockout)

#### Get All Brackets
```
GET /tournaments/{tournamentId}/brackets
```

#### Get Brackets by Stage
```
GET /tournaments/{tournamentId}/brackets/stage/{stage}
```
Stages: `quarterfinal`, `semifinal`, `final`

#### Create Bracket Match
```
POST /tournaments/{tournamentId}/brackets
Content-Type: application/json

{
  "stage": "quarterfinal",
  "match_id": 1,
  "team1_id": "uuid (optional)",
  "team2_id": "uuid (optional)"
}
```

#### Update Bracket Match
```
PUT /tournaments/{tournamentId}/brackets/{bracketId}
Content-Type: application/json

{
  "team1_id": "uuid",
  "team2_id": "uuid",
  "winner_id": "uuid"
}
```

#### Delete Bracket Match
```
DELETE /tournaments/{tournamentId}/brackets/{bracketId}
```

### Standings

#### Get Group Standings
```
GET /tournaments/{tournamentId}/standings
```
Response:
```json
[
  {
    "id": "uuid",
    "name": "Team A",
    "points": 9,
    "wins": 3,
    "draws": 0,
    "losses": 0,
    "goals_for": 10,
    "goals_against": 2
  }
]
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes
- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently no rate limiting. Implement based on your deployment needs.

## Authentication

Currently no authentication. Implement JWT tokens for production use.

## Testing with cURL

### Create Tournament
```bash
curl -X POST http://localhost:5000/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Tournament",
    "description": "A test tournament",
    "start_date": "2026-06-01",
    "end_date": "2026-08-31",
    "max_teams": 16,
    "num_groups": 2
  }'
```

### Get Health
```bash
curl http://localhost:5000/api/health
```

### Get All Tournaments
```bash
curl http://localhost:5000/api/tournaments
```

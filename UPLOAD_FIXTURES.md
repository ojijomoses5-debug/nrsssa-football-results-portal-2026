# Upload Fixtures Guide

## Overview

The portal now includes a **CSV Upload** feature to quickly populate tournaments with fixtures based on your CSV data.

## Your Tournament Data

Your NRSSSA 2026 tournament has the following structure:

### Girls Division
- **Pool A**: MAGINA, LWAK, MOBAMBA, AHERO (4 teams)
- **Pool B**: NYAKACH, MASOSA, ULANDA, KOBALA (4 teams)

### Boys Division
- **Pool A**: MASENO, BITICHA, KODEROBARA, GENDIA (4 teams)
- **Pool B**: RINGA, SAMETA, YALA, KISUMU 2 (4 teams)

**Total: 2 categories, 4 pools, 16 teams**

## How to Upload

### Step 1: Access the Upload Page
1. Open http://localhost:3000
2. Click "📤 Upload Fixtures" in the navigation

### Step 2: Configure Tournament
Fill in the tournament details:
- **Name**: NRSSSA 2026 Football Championship
- **Description**: Combined Boys and Girls Tournament
- **Start Date**: Select your tournament start date
- **End Date**: Select your tournament end date

### Step 3: Select Your CSV File
- Click the file input area
- Select your `NRSSSA_2026_Football_Boys_Girls_Combined.csv` file

### Step 4: Preview
- Click "Preview CSV" button
- Verify the data is correct
- See summary of teams and groups

### Step 5: Upload
- Click "Upload Fixtures"
- System will:
  - Create tournament
  - Create 4 groups (one for each pool)
  - Register 16 teams
  - Generate round-robin fixtures for each group
  - Auto-assign match dates

## What Gets Created

### Automatically Generated:

1. **Tournament**
   - Name: NRSSSA 2026 Football Championship
   - 2 Categories (Girls/Boys)
   - 4 Groups/Pools
   - 16 Teams total

2. **Groups**
   - Girls Pool A
   - Girls Pool B
   - Boys Pool A
   - Boys Pool B

3. **Teams**
   - All 16 teams assigned to their respective groups

4. **Fixtures**
   - Round-robin matches for each group
   - Each team plays each other team once
   - **Girls Pool A**: 6 matches (4 teams)
   - **Girls Pool B**: 6 matches (4 teams)
   - **Boys Pool A**: 6 matches (4 teams)
   - **Boys Pool B**: 6 matches (4 teams)
   - **Total**: 24 group stage matches

5. **Match Scheduling**
   - Dates auto-distributed over tournament period
   - Random times between 9 AM - 5 PM

## API Endpoint

### Bulk Upload
```
POST /api/bulk-upload/bulk-upload

Request Body:
{
  "tournaments": [{
    "name": "Tournament Name",
    "description": "Description",
    "start_date": "2026-06-01",
    "end_date": "2026-08-31",
    "max_teams": 16,
    "categories": [
      {
        "category_name": "Girls",
        "pools": [
          {
            "pool_name": "A",
            "teams": ["MAGINA", "LWAK", "MOBAMBA", "AHERO"]
          }
        ]
      }
    ]
  }]
}

Response:
{
  "message": "Fixtures uploaded successfully",
  "tournaments": [{
    "tournament_id": "uuid",
    "tournament": "NRSSSA 2026 Football Championship",
    "categories": [...]
  }]
}
```

### Get Tournament Summary
```
GET /api/bulk-upload/summary/{tournamentId}

Response:
{
  "tournament": {...},
  "groups_count": 4,
  "teams_count": 16,
  "fixtures_count": 24,
  "groups": [...],
  "teams": [...],
  "fixtures": [...]
}
```

## After Upload

Once fixtures are uploaded, you can:

1. **View Standings**
   - Real-time group standings
   - Goal difference calculations
   - Team points

2. **Record Results**
   - Enter match scores
   - Standings update automatically

3. **View Brackets**
   - After group stage completes
   - Generate knockout brackets
   - View quarterfinals, semifinals, finals

4. **Export Data**
   - Export standings
   - Export results
   - Generate reports

## CSV Format

Your CSV should follow this format:

```
Category,Pool,Team1,Team2,Team3,Team4
Girls,A,MAGINA,LWAK,MOBAMBA,AHERO
Girls,B,NYAKACH,MASOSA,ULANDA,KOBALA
Boys,A,MASENO,BITICHA,KODEROBARA,GENDIA
Boys,B,RINGA,SAMETA,YALA,KISUMU 2
```

**Headers:**
- `Category`: Division name (Girls/Boys)
- `Pool`: Group identifier (A/B/C/etc)
- `Team1-Team4`: Team names (up to 4 per pool)

## Fixture Generation

The system automatically generates **round-robin** fixtures:

For 4 teams, each plays 3 matches:
- Team A vs B
- Team A vs C
- Team A vs D
- Team B vs C
- Team B vs D
- Team C vs D

**Total: 6 matches per group**

## Next Steps

After uploading:

1. ✅ Verify tournament created
2. ✅ Check groups and teams
3. ✅ Review fixture schedule
4. ✅ Record match results
5. ✅ View standings
6. ✅ Generate knockouts

## Troubleshooting

**Upload fails:**
- Check CSV format matches example
- Ensure all team names are correct
- Verify no special characters in names

**Fixtures not created:**
- Check backend logs: `docker-compose logs backend`
- Verify tournament was created
- Check groups exist

**Wrong number of matches:**
- System generates round-robin
- For N teams: N × (N-1) / 2 matches
- 4 teams = 6 matches per group

## Support

For issues:
1. Check logs: `docker-compose logs -f backend`
2. Verify CSV format
3. Try uploading again
4. Check portal features work manually

# Setup Instructions

## Quick Start with Docker

1. **Install Docker and Docker Compose** (if not already installed)

2. **Clone the repository**
```bash
git clone https://github.com/ojijomoses5-debug/nrsssa-football-results-portal-2026.git
cd nrsssa-football-results-portal-2026
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

## Manual Setup (Without Docker)

### Prerequisites
- Node.js 16+ 
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update .env with your database credentials**
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=tournament_portal
```

5. **Create database and tables**
```bash
psql -U postgres -d tournament_portal -f ../backend/src/database/schema.sql
```

6. **Start the backend server**
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
```

4. **Start the development server**
```bash
npm start
```

The frontend will open at http://localhost:3000

## Database Schema

The application uses PostgreSQL with the following main tables:

- **tournaments** - Tournament information and settings
- **groups** - Group stage divisions
- **teams** - Team details and statistics
- **fixtures** - Match schedules and results
- **results** - Detailed match results
- **brackets** - Knockout stage brackets
- **users** - User authentication

## API Documentation

### Tournaments
- `GET /api/tournaments` - List all tournaments
- `POST /api/tournaments` - Create tournament
- `GET /api/tournaments/:id` - Get tournament details
- `PUT /api/tournaments/:id` - Update tournament

### Teams
- `GET /api/tournaments/:id/teams` - Get tournament teams
- `POST /api/tournaments/:id/teams` - Register team
- `GET /api/teams/:id` - Get team details
- `PUT /api/teams/:id` - Update team

### Fixtures
- `GET /api/tournaments/:id/fixtures` - Get all fixtures
- `POST /api/tournaments/:id/fixtures/generate` - Generate fixtures
- `GET /api/fixtures/:id` - Get fixture details
- `PUT /api/fixtures/:id` - Update fixture result

### Standings
- `GET /api/tournaments/:id/standings` - Get group standings

### Brackets
- `GET /api/tournaments/:id/brackets` - Get knockout brackets

## Troubleshooting

### Port Already in Use
If port 3000, 5000, or 5432 is already in use, you can change them in `docker-compose.yml`

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists: `createdb tournament_portal`

### Frontend Not Loading API
- Ensure backend is running on http://localhost:5000
- Check CORS settings in backend .env
- Check browser console for errors

## Development

### Backend Development
```bash
cd backend
npm run dev # Runs with ts-node for hot reload
```

### Frontend Development
```bash
cd frontend
npm start # Runs with hot reload
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serves the optimized build
```

## Support

For issues or questions, please create an issue in the repository.

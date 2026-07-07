# NRSSSA Football Results Portal 2026

## 🎯 Overview

A comprehensive **tournament management system** for football/soccer tournaments with mixed format support (group stage + knockout elimination).

Built with:
- **Backend**: Node.js/Express/TypeScript + PostgreSQL
- **Frontend**: React/TypeScript
- **Deployment**: Docker & Docker Compose

## ✨ Features

### Tournament Management
- ✅ Create tournaments with custom settings
- ✅ Mixed format: Group stage → Knockout rounds
- ✅ Support for multiple groups
- ✅ Automatic standings calculation
- ✅ Real-time bracket progression

### Team Management
- ✅ Register teams to tournaments
- ✅ Assign teams to groups
- ✅ Track team statistics (wins, losses, draws, goals)
- ✅ Calculate points automatically

### Fixture Management
- ✅ Create fixtures for group stage
- ✅ Generate knockout rounds
- ✅ Support for 4 stages:
  - Group Stage
  - Quarterfinals
  - Semifinals
  - Finals
- ✅ Record match results
- ✅ Update standings automatically

### Standings & Brackets
- ✅ Real-time group standings
- ✅ Goal difference calculation
- ✅ Knockout bracket visualization
- ✅ Tournament progression tracking

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/ojijomoses5-debug/nrsssa-football-results-portal-2026/main/setup-local.sh | bash
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/ojijomoses5-debug/nrsssa-football-results-portal-2026.git
cd nrsssa-football-results-portal-2026
docker-compose up -d
```

### Option 2: Manual Setup
```bash
git clone https://github.com/ojijomoses5-debug/nrsssa-football-results-portal-2026.git
cd nrsssa-football-results-portal-2026
docker-compose up -d
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## 📖 Documentation

- [Getting Started Guide](GETTING_STARTED.md) - Local development setup
- [Setup Instructions](SETUP.md) - Detailed installation guide
- [Deployment Guide](DEPLOYMENT.md) - Production deployment (4 options)
- [API Documentation](API_DOCS.md) - Complete API reference

## 📁 Project Structure

```
nrsssa-football-results-portal-2026/
├── backend/
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   ├── database/        # Schema & connection
│   │   └── index.ts         # Server entry
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # UI components
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript definitions
│   │   └── App.tsx          # Main component
│   └── Dockerfile
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Development environment
├── docker-compose.prod.yml  # Production environment
├── setup-local.sh           # Local setup script
├── deploy.sh                # Deployment script
├── health-check.sh          # Health monitoring
├── backup.sh                # Database backup
├── GETTING_STARTED.md       # Quick start guide
├── SETUP.md                 # Setup details
├── DEPLOYMENT.md            # Deployment options
└── API_DOCS.md              # API reference
```

## 🛠️ Development

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Restart Services
```bash
docker-compose restart
```

### Reset Everything
```bash
docker-compose down -v
docker-compose up -d
```

### Update Code
```bash
git pull
docker-compose build
docker-compose up -d
```

## 📊 Database Schema

- **tournaments** - Tournament metadata
- **groups** - Group stage divisions
- **teams** - Team information and stats
- **fixtures** - Match schedule and results
- **results** - Detailed match records
- **brackets** - Knockout stage structure
- **users** - User authentication (future)

## 🔌 API Endpoints

### Tournaments
- `GET /api/tournaments` - List tournaments
- `POST /api/tournaments` - Create tournament
- `GET /api/tournaments/:id` - Get details
- `PUT /api/tournaments/:id` - Update
- `DELETE /api/tournaments/:id` - Delete

### Teams
- `GET /api/tournaments/:id/teams` - List teams
- `POST /api/tournaments/:id/teams` - Register team
- `PUT /api/teams/:id` - Update team

### Fixtures
- `GET /api/tournaments/:id/fixtures` - List fixtures
- `POST /api/tournaments/:id/fixtures` - Create fixture
- `PUT /api/fixtures/:id` - Update result

### Standings
- `GET /api/tournaments/:id/standings` - Get standings

### Brackets
- `GET /api/tournaments/:id/brackets` - Get brackets

See [API_DOCS.md](API_DOCS.md) for complete reference.

## 🚀 Deployment

### Local Development
```bash
docker-compose up -d
# Access: http://localhost:3000
```

### Production Deployment

Choose your platform:

1. **Railway.app** (Recommended)
   - Automatic deployment from GitHub
   - Free tier available
   - Custom domain support

2. **Heroku**
   - Simple git-based deployment
   - PostgreSQL add-on available

3. **AWS EC2 + RDS**
   - Full control
   - Scalable infrastructure

4. **DigitalOcean App Platform**
   - Managed deployment
   - PostgreSQL included

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🏥 Monitoring

### Health Checks
```bash
bash health-check.sh
```

### Service Status
```bash
docker-compose ps
```

### Database Backup
```bash
bash backup.sh
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database Connection Error
```bash
docker-compose logs postgres
docker-compose down -v
docker-compose up -d
```

### Reset Everything
```bash
docker-compose down -v
docker-compose up -d
```

See [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting.

## 📋 Requirements

- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))
- Git
- 2GB free disk space
- Modern web browser

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test locally
5. Submit pull request

## 📝 License

MIT License - feel free to use for personal and commercial projects

## 💡 Roadmap

- [ ] User authentication & authorization
- [ ] Team statistics dashboard
- [ ] Player management
- [ ] Match statistics (goals, assists, cards)
- [ ] Email notifications
- [ ] Mobile app
- [ ] Admin panel
- [ ] Advanced analytics

## 🆘 Support

- 📖 Check [GETTING_STARTED.md](GETTING_STARTED.md)
- 📚 Read [API_DOCS.md](API_DOCS.md)
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 Open GitHub issues

## 👨‍💻 Author

**ojijomoses5-debug**

## 📞 Contact

For questions or support, open an issue on GitHub.

---

**Ready to manage your football tournament? Start now! 🎉**

[Get Started](GETTING_STARTED.md) | [Documentation](SETUP.md) | [API Reference](API_DOCS.md) | [Deploy](DEPLOYMENT.md)

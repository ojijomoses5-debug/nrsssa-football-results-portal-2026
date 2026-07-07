import React, { useState } from 'react';
import * as api from '../services/api';
import './CSVUpload.css';

interface CSVData {
  category: string;
  pool: string;
  teams: string[];
}

function CSVUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [csvData, setCSVData] = useState<CSVData[]>([]);
  const [tournamentConfig, setTournamentConfig] = useState({
    name: 'NRSSSA 2026 Football Championship',
    description: 'Combined Boys and Girls Tournament',
    start_date: '2026-06-01',
    end_date: '2026-08-31'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError('');
      setSuccess('');
    }
  };

  const parseCSV = (content: string): CSVData[] => {
    const lines = content.trim().split('\n');
    const data: CSVData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const [category, pool, team1, team2, team3, team4] = lines[i].split(',').map(item => item.trim());
      
      if (category && pool) {
        const teams = [team1, team2, team3, team4].filter(t => t && t.length > 0);
        data.push({
          category: category.trim(),
          pool: pool.trim(),
          teams
        });
      }
    }

    return data;
  };

  const handlePreview = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      const content = await file.text();
      const parsed = parseCSV(content);
      
      if (parsed.length === 0) {
        setError('No valid data found in CSV');
        return;
      }

      setCSVData(parsed);
      setSuccess(`Loaded ${parsed.length} groups from CSV`);
    } catch (err) {
      setError('Failed to parse CSV file');
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (csvData.length === 0) {
      setError('Please preview CSV first');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Transform CSV data to tournament structure
      const categories = groupByCategory(csvData);
      
      const uploadData = {
        tournaments: [{
          name: tournamentConfig.name,
          description: tournamentConfig.description,
          start_date: tournamentConfig.start_date,
          end_date: tournamentConfig.end_date,
          max_teams: calculateMaxTeams(csvData),
          categories
        }]
      };

      const response = await api.bulkUploadTournaments(uploadData);
      
      setSuccess(`✅ Successfully uploaded! Tournament ID: ${response.data.tournaments[0].tournament_id}`);
      setCSVData([]);
      setFile(null);
      
      // Redirect to tournament details after 2 seconds
      setTimeout(() => {
        window.location.href = `/tournaments/${response.data.tournaments[0].tournament_id}`;
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const groupByCategory = (data: CSVData[]) => {
    const grouped: { [key: string]: { [key: string]: string[] } } = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = {};
      }
      grouped[item.category][item.pool] = item.teams;
    });

    return Object.entries(grouped).map(([category_name, pools]) => ({
      category_name,
      pools: Object.entries(pools).map(([pool_name, teams]) => ({
        pool_name,
        teams
      }))
    }));
  };

  const calculateMaxTeams = (data: CSVData[]) => {
    const allTeams = new Set();
    data.forEach(item => {
      item.teams.forEach(team => allTeams.add(team));
    });
    return allTeams.size;
  };

  return (
    <div className="csv-upload">
      <h2>Upload Tournament Fixtures from CSV</h2>
      
      <div className="upload-container">
        <div className="config-section">
          <h3>Tournament Configuration</h3>
          <div className="form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              value={tournamentConfig.name}
              onChange={(e) => setTournamentConfig({...tournamentConfig, name: e.target.value})}
              placeholder="Enter tournament name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={tournamentConfig.description}
              onChange={(e) => setTournamentConfig({...tournamentConfig, description: e.target.value})}
              placeholder="Enter tournament description"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={tournamentConfig.start_date}
                onChange={(e) => setTournamentConfig({...tournamentConfig, start_date: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={tournamentConfig.end_date}
                onChange={(e) => setTournamentConfig({...tournamentConfig, end_date: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="file-section">
          <h3>Select CSV File</h3>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
            />
            {file && <span className="file-name">{file.name}</span>}
          </div>

          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={handlePreview}
              disabled={!file || loading}
            >
              Preview CSV
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {csvData.length > 0 && (
        <div className="preview-section">
          <h3>Preview ({csvData.length} groups)</h3>
          <div className="preview-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Pool</th>
                  <th>Teams</th>
                  <th>Team Count</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.pool}</td>
                    <td>{item.teams.join(', ')}</td>
                    <td>{item.teams.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary">
            <p><strong>Total Groups:</strong> {csvData.length}</p>
            <p><strong>Total Teams:</strong> {calculateMaxTeams(csvData)}</p>
            <p><strong>Categories:</strong> {[...new Set(csvData.map(d => d.category))].join(', ')}</p>
          </div>

          <button 
            className="btn btn-primary btn-large"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Fixtures'}
          </button>
        </div>
      )}

      <div className="csv-format">
        <h3>CSV Format Example</h3>
        <pre>{`Category,Pool,Team1,Team2,Team3,Team4
Girls,A,MAGINA,LWAK,MOBAMBA,AHERO
Girls,B,NYAKACH,MASOSA,ULANDA,KOBALA
Boys,A,MASENO,BITICHA,KODEROBARA,GENDIA
Boys,B,RINGA,SAMETA,YALA,KISUMU 2`}</pre>
      </div>
    </div>
  );
}

export default CSVUpload;

# Travo

**More joy in every journey**

A responsive tourism website with a React/Vite frontend and Python/Flask + SQLite backend.

## Project structure

```text
travo/
├── frontend/
│   ├── src/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   ├── database/
│   │   ├── init_db.py
│   │   └── seed.py
│   └── requirements.txt
└── README.md
```

## Run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run the backend

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

The API runs at `http://localhost:5000`.

## API endpoints

- `GET /api/health`
- `GET /api/destinations`
- `GET /api/destinations?category=Beach`
- `GET /api/destinations/1`

SQLite initialization and seed data are in `backend/database/` and separated from API routes.

# Sparta Code

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)


## Project Overview

### Description


### Backend Features
- A fastAPI backend (in main.py)
- Some pydantic model types (in models.py)
- A pydantic settings and env loader (in config.py)

That's it! The backend only has basic CRD (no updates!) for trades. There's a /insights route that returns some statistical insights about the trades. I started on a /ai-insights route that gives LLM-powered insights, but didn't quite finish it.

### Frontend Features
- A next.js frontend
- Basic BE requests (directly from client-site to BE) in networker.ts
- Global state management using jotai (in store/atoms.ts)
- Some charts using recharts (in components) > see bar-chart.tsx, pie-chart.tsx
- Input validation with zod
- Some components using shadcn/ui (in components)
- A table of trades, mostly adapted from shadcn/ui, powered by tanstack-table (in components/data-table.tsx)
- A sidenav bar, mostly adapted from shadcn/ui (in components/sidenav.tsx)
- A dark / light mode toggle powered by next JS theme and a custom component theme-toggle.tsx

Again. that's it!

## Installation

### Prerequisites
- Node.js
- Python 3.x

### Steps
1. Clone the repository
   ```bash
   git clone https://github.com/gurudewan/sparta-code.git
   ```
2. Navigate into the directory
   ```bash
   cd sparta-code
   ```
3. Install FE dependencies
   ```bash
   cd front-sparta
   npm install
   ```
4. Install BE dependencies
   ```bash
   cd core-sparta
   virtualenv env # or however you like to make your envs
   source env/bin/activate # or however you like to activate your envs
   pip install -r requirements.txt
   ```

## Usage

### Running the Application
```bash
# Frontend
npm run dev

# Backend
uvicorn app.main:app --reload
```

## Dependencies

### Frontend
- Node.js 
- Next.js (for frontend)
- shadcn/ui (for components) > see src/components
- TailwindCSS (for style)
- jotai (for state management) > see src/store/atoms.ts
- recharts (for charts)

### Backend
- Python 3.x
- FastAPI
- uvicorn
- openai

## Configuration

For the (unimplemented) /ai-insights route in the backend, you would need to add an OpenAI API key.

```env
# .env file example
OPENAI_API_KEY="sk-xyz...abc"
```

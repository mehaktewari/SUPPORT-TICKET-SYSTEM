# Tech Intern – Full Stack Development Assessment (Clootrack)

## Overview
This project is a full-stack **Support Ticket System** developed as part of the Clootrack **Tech Intern – Full Stack Development** assessment.

The application allows users to submit support tickets, receive AI-based suggestions for category and priority, manage ticket status, and view real-time aggregated statistics.  
The entire system is fully containerized and can be run using a single Docker command.

---

## Features
- Create support tickets with title and detailed description
- AI-powered classification of ticket **category** and **priority**
- Ability to override AI suggestions before submission
- View all tickets with filtering and search
- Update ticket status (open, in progress, resolved, closed)
- Dashboard with aggregated statistics
- Fully Dockerized setup (backend, frontend, database)

---

## Tech Stack
**Backend**
- Django
- Django REST Framework
- PostgreSQL

**Frontend**
- React
- Axios

**AI / LLM**
- OpenAI GPT (via API)

**Infrastructure**
- Docker
- Docker Compose

---

## LLM Integration
When a user enters a ticket description, the system calls an LLM to suggest:
- Ticket category: `billing`, `technical`, `account`, `general`
- Ticket priority: `low`, `medium`, `high`, `critical`

The suggestions are pre-filled in the UI and can be edited by the user.  
If the LLM service is unavailable, ticket submission still works without AI suggestions.

The API key is securely managed using environment variables and is not hardcoded.

---

## API Endpoints
- `POST /api/tickets/` – Create a new ticket
- `GET /api/tickets/` – List tickets (supports filters & search)
- `PATCH /api/tickets/<id>/` – Update ticket status or fields
- `POST /api/tickets/classify/` – AI-based ticket classification
- `GET /api/tickets/stats/` – Aggregated ticket statistics

> Note: The stats endpoint uses **database-level aggregation** via Django ORM for efficiency.

---

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose

## Steps to Run

### 1. Set the OpenAI API key (optional but recommended)

**Windows (PowerShell)**

```powershell
setx OPENAI_API_KEY "your_api_key_here"
````

> Restart the terminal after setting the key.

**Mac / Linux**

```bash
export OPENAI_API_KEY="your_api_key_here"
```

---

### 2. Run the application

```bash
docker-compose up --build
```

> The first run may take a few minutes as Docker builds the images.

---

### 3. Access the application

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:8000/api/](http://localhost:8000/api/)

---

## Design Decisions

* Database-level constraints enforced directly in Django models
* ORM-based aggregation for statistics instead of Python loops
* Graceful handling of LLM failures to ensure ticket submission always works
* Minimal but functional UI to focus on core requirements
* Clear separation of backend, frontend, and infrastructure layers

---

## Notes

* The `.git` directory is included to demonstrate incremental development
* No secrets or API keys are committed to the repository
* The application runs fully with a single Docker command

---

## Author

**Mehak Tewari**

📧 Email: [tewarimehak2107@gmail.com](mailto:tewarimehak2107@gmail.com)

🔗 LinkedIn: [https://www.linkedin.com/in/mehak-tewari-04934b247/](https://www.linkedin.com/in/mehak-tewari-04934b247/)

````



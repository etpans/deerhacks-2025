# Unite™ - Interactive Event Discovery for UofT

Unite™ is a simple and interactive event discovery platform designed to help University of Toronto students stay informed about important events and dates on campus. With an intuitive interface and an interactive map, students can easily navigate campus and connect with their community.

This project was developed for **DeerHacks 2025**, with the theme of **Discovery**.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Python + Flask
- **Database**: MySQL

## Installation

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Python](https://www.python.org/) (v3.8+ recommended)
- [MySQL](https://www.mysql.com/) (for database setup later)

### Setup Instructions

#### 1. Clone the repository
```sh
git clone https://github.com/etpans/deerhacks-2025.git
cd deerhacks-2025
```

#### 2. Install Dependencies
```sh
npm install
cd ../flask_app
pip install -r requirements.txt
```

#### 2. Starting Servers
Front-end:
```sh
cd deerhacks-2025
npm run dev
```
Back-end:
```sh
cd flask_app
python app.py
```

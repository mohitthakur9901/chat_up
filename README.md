# 💬 Chatty App

Real-time chat application built with **MERN Stack**, **Socket.IO**, and **Docker**, supporting secure authentication, live messaging, profile updates, and modern UI.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + Zustand + Axios + TailwindCSS
- **Backend**: Node.js + Express + MongoDB + Socket.IO
- **Auth**: JWT + Cookies
- **Media**: Cloudinary for image uploads
- **Deployment**: Docker, Docker Hub, EC2 (AWS), Nginx
- **CI/CD**: GitHub Actions

---

## 📦 Features

- 🔐 JWT Authentication (Signup/Login/Logout)
- 🧑‍💻 Profile Updates (Cloudinary for image uploads)
- 📬 Real-time Messaging with Socket.IO
- 👀 Online Users Tracking
- ⚙️ REST API with CORS support
- ☁️ Dockerized frontend and backend
- 🌍 Nginx serving Vite frontend on port `80`
- 📦 CI/CD pipeline to Docker Hub

---

## 📁 Project Structure

```
/chatty-app
├── server/          # Express backend
│   ├── routes/
│   ├── libs/
│   └── Dockerfile
├── frontend/        # Vite React frontend
│   ├── src/
│   ├── public/
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/
```

---

## 🐳 Docker Compose (Local Dev)

```bash
# Clone the repo
git clone https://github.com/your-username/chatty-app.git
cd chatty-app

# Start both containers
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3000

---

## 📤 Deployment

### 🐙 CI/CD with Docker Hub

> Push to `main` automatically builds & pushes Docker images for both frontend and backend.

`.github/workflows/deployment.yml` handles:

- Docker Hub login
- Build & push:
  - `chatapp-backend:latest`
  - `chatapp-frontend:latest`

### 🖥️ Deploy to EC2 with Docker

1. SSH into your EC2 instance:
   ```bash
   ssh ec2-user@your-ec2-ip
   ```

2. Pull images:
   ```bash
   docker pull your-docker-username/chatapp-backend:latest
   docker pull your-docker-username/chatapp-frontend:latest
   ```

3. Run with Docker Compose or manually with `docker run`.

---

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Use `env_file: .env` in Docker Compose, or pass them via `docker run -e`.

---

## 🌐 Nginx Configuration (for Vite build)

`frontend/nginx.conf`:

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## 📄 License

MIT © [mohitthakur9901](https://github.com/mohitthakur9901)

---

## 🙋‍♂️ Author

Built with ❤️ by [me]

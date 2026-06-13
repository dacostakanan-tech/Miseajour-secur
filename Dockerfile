# ========== Étape 1 : Build du frontend React ==========
FROM node:20-alpine AS frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY frontend/ ./
# REACT_APP_BACKEND_URL vide -> le frontend appellera /api en relatif
ENV REACT_APP_BACKEND_URL=""
ENV ENABLE_HEALTH_CHECK=false
RUN yarn build


# ========== Étape 2 : Backend Python + frontend statique ==========
FROM python:3.11-slim

WORKDIR /app

# Dépendances système minimales
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Dépendances Python
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Code backend
COPY backend/ ./

# Frontend buildé -> servi en statique par FastAPI
COPY --from=frontend-build /frontend/build ./static

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT}"]

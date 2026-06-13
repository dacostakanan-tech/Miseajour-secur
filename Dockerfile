# ========== Étape 1 : Build du frontend React ==========
FROM node:20-alpine AS frontend-build

WORKDIR /frontend

# Copie package.json (et yarn.lock s'il existe, grâce au glob *)
COPY frontend/package.json ./
COPY frontend/yarn.loc[k] ./

RUN yarn install --network-timeout 600000

COPY frontend/ ./
# Frontend appelle /api en relatif (même origine que le backend)
ENV REACT_APP_BACKEND_URL=""
ENV ENABLE_HEALTH_CHECK=false
ENV CI=false
RUN yarn build


# ========== Étape 2 : Backend Python + frontend statique ==========
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

# Frontend buildé -> servi en statique par FastAPI
COPY --from=frontend-build /frontend/build ./static

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT}"]

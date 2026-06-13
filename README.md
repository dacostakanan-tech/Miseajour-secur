# SG Clone — Déploiement Railway (mode simple)

## ⚡ Déploiement ultra-simple

Tout est dans **un seul service Railway**. Le backend FastAPI sert aussi le frontend React.

### Sur Railway (à faire une seule fois)

1. **New Project** → **Deploy from GitHub repo** → choisir ce repo
2. **+ New** → **Database** → **Add MongoDB**
3. Sur le service principal (issu de GitHub), onglet **Variables**, ajouter :

   | Nom | Valeur |
   |---|---|
   | `MONGO_URL` | `${{ MongoDB.MONGO_URL }}` |
   | `DB_NAME` | `sg_clone` |
   | `CORS_ORIGINS` | `*` |
   | `TELEGRAM_BOT_TOKEN` | *(votre token)* |
   | `TELEGRAM_CHAT_ID` | *(votre chat id)* |

4. **Settings → Networking → Generate Domain**

C'est tout. Le `Dockerfile` à la racine du repo s'occupe de **builder le frontend ET le backend** automatiquement.

### Pour mettre à jour

Poussez sur GitHub → Railway redéploie tout seul. 🚀

---

## Structure du projet

```
/
├── Dockerfile           ← Railway construit tout via ce fichier
├── railway.json         ← Indique à Railway d'utiliser le Dockerfile
├── .dockerignore
├── backend/             ← FastAPI (sert aussi le React buildé)
└── frontend/            ← React (CRA + Craco)
```

FROM node:20-alpine
WORKDIR /app
COPY backend/package.json ./
RUN npm install --production
COPY backend/ ./
COPY index.html styles.css data.js app.js manifest.json sw.js icon-192.png icon-512.png favicon.png ./
EXPOSE 3000
ENV NODE_ENV=production
ENV FRONTEND_DIR=/app
CMD ["node", "server.js"]
" path="sdn-panunggangan-portal/Dockerfile">

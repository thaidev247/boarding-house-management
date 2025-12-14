FROM oven/bun:1.3.3 AS base
WORKDIR /app

# ---------- Dependencies Layer ----------
FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# ---------- Build Layer ----------
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

# ---------- Production Runtime ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["bun", "run", "start"]

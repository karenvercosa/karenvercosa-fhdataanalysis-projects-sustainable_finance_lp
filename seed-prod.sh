#!/bin/bash

# ==============================================================================
# ROLLOUT SCRIPT - Sustainable Finance Seed (Production)
# ==============================================================================

REGISTRY="sustainablefinances/sustainable-finance"
TAG_PREFIX="v1"

echo "🔐 Iniciando login no Docker Registry..."
docker login -u sustainablefinances

echo "🧹 Removendo imagens antigas..."
docker rmi ${REGISTRY}:${TAG_PREFIX}-seed --force 2>/dev/null

echo "🚀 Iniciando Build das imagens..."

# 0. Prisma Seed (Lightweight)
echo "📦 Building Seed Image (v1-seed)..."
docker build -f Dockerfile.migration -t ${REGISTRY}:${TAG_PREFIX}-migration .

echo "📤 Enviando imagens para o repositório..."
docker push ${REGISTRY}:${TAG_PREFIX}-migration

echo "✅ Rollout concluído com sucesso!"
echo "👉 E execute o Job de Seed:"
echo "   kubectl apply -f prisma-job.yaml"

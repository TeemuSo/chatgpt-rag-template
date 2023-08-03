#!/bin/bash
# Build Docker image
docker build -t visit-tampere-chatbot .

# Build and push Docker image to Azure Container Registry
az acr build --registry tuutori --image visit-tampere-chatbot .

# Configure Azure Web App to use the Docker image from Azure Container Registry
az webapp config container set --name visit-tampere-chatbot --resource-group visit-tampere --docker-custom-image-name tuutori.azurecr.io/visit-tampere-chatbot --docker-registry-server-url https://tuutori.azurecr.io

# Restart Azure Web App
az webapp restart --name visit-tampere-chatbot --resource-group visit-tampere
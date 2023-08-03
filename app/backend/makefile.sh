create-resource-group:
    @read -p "Enter a name for the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter the location (e.g., 'westeurope'): " LOCATION; \
    az group create --name $$RESOURCE_GROUP_NAME --location $$LOCATION

create-app-service-plan: create-resource-group
    @read -p "Enter a name for the App Service plan: " APP_SERVICE_PLAN_NAME; \
    read -p "Enter the name of the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter SKU name for the App Service plan (e.g., 'F1'): " SKU_NAME; \
    az appservice plan create --name $$APP_SERVICE_PLAN_NAME --resource-group $$RESOURCE_GROUP_NAME --sku $$SKU_NAME --is-linux

create-web-app: create-app-service-plan
    @read -p "Enter a name for the Azure Web App: " WEB_APP_NAME; \
    read -p "Enter the name of the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter the App Service plan name: " APP_SERVICE_PLAN_NAME; \
    read -p "Enter the Python version (e.g., '3.9'): " PYTHON_VERSION; \
    az webapp create --name $$WEB_APP_NAME --resource-group $$RESOURCE_GROUP_NAME --plan $$APP_SERVICE_PLAN_NAME --runtime "python|$$PYTHON_VERSION"

build-container-image: create-web-app
    @read -p "Enter the name of the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter the name of the Azure Container Registry (ACR): " ACR_REGISTRY_NAME; \
    read -p "Enter the name for the container image: " IMAGE_NAME; \
    read -p "Enter the path to Dockerfile: " DOCKERFILE_PATH; \
    az acr build --resource-group $$RESOURCE_GROUP_NAME --registry $$ACR_REGISTRY_NAME --image $$IMAGE_NAME --file $$DOCKERFILE_PATH

deploy-to-web-app: build-container-image
    @read -p "Enter the name of the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter the name of the Azure Web App: " WEB_APP_NAME; \
    read -p "Enter the name of the Azure Container Registry (ACR): " ACR_REGISTRY_NAME; \
    read -p "Enter the name of the container image: " IMAGE_NAME; \
    read -p "Enter the tag for the container image: " TAG; \
    read -p "Enter the URL of the ACR registry: " ACR_REGISTRY_URL; \
    az webapp config container set --name $$WEB_APP_NAME --resource-group $$RESOURCE_GROUP_NAME --docker-custom-image-name $$IMAGE_NAME:$$TAG --docker-registry-server-url $$ACR_REGISTRY_URL

browse-web-app: deploy-to-web-app
    @read -p "Enter the name of the resource group: " RESOURCE_GROUP_NAME; \
    read -p "Enter the name of the Azure Web App: " WEB_APP_NAME; \
    az webapp browse --name $$WEB_APP_NAME --resource-group $$RESOURCE_GROUP_NAME

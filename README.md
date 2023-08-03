To get started with the template locally, you need to add your own data, and modify few places in the code. Proceed to section "Add your own data" to get started

# Get started locally

## Setting up environment

1. First, you need to create your own Pinecone account at [Pinecone](https://www.pinecone.io/learn/).
2. Create new index for your Pinecone account. The index should have 1536 dimensions. Take note on what is the name of the index, and as well what is the environment.
3. Create new API key at the Pinecone console. Save it in secure place.
4. Create [OpenAI](https://openai.com/) account.
5. After creating account, navigate to https://platform.openai.com/account/api-keys to create a new API key. Save the generated key in secure place.
6. Write the OpenAI API key to variable in `OPENAI_API_KEY` in `.env`. Write the Pinecone API key to `PINECONE_API_KEY` in `.env`.

## Adding data to the Pinecone index

1. Open notebook `add_data.ipynb` from the root folder of this project.
2. Go through the notebook, adding your Pinecone index name and environment as instructed. You can create free index at the Pinecone, and you will be assigned a region, environment for it.
3. The notebook is populated with dummy data that can be tested for running the notebook. In reality you should add your own data. The html key in the data JSON is the content that will be rendered in the application. Make sure to write valid HTML in that html field. 
4. After the notebook has been ran succesfully, you should have data in the Pinecone and you are ready for action.

## Running the application

1. Navigate to `/app/frontend` folder.
2. Assuming you have node installed, run command `npm install` to install all the dependencies that are required to build the frontend.
3. After installation is done, run command `npm run build`. This will build the application to static files, saving them to `/app/backend/static`.
4. Navigate to `/app/backend`.
5. Install dependencies to your Python environment with `python -m pip install -r requirements.txt`. You should use virtual environment, such as [Miniconda](https://docs.conda.io/en/latest/miniconda.html). Feel free to check out tutorials on Python virtual environments before installing the requirements, to make sure you won't install the packages in your global Python interpreter.
6. Run the application with `uvicorn app:app --reload`. Now you can navigate to `http://127.0.0.1:8000`, where the application will be running. 


After creating your account, create a new index, and remember your 

# Deploy the chatbot

1. Create a Resource Group:

```
az group create --name <RESOURCE_GROUP_NAME> --location <LOCATION>
```
Replace `<RESOURCE_GROUP_NAME>` with the desired name for your resource group and `<LOCATION>` with the desired location (e.g., 'westeurope').

2. Create an App Service Plan:

```
az appservice plan create --name <APP_SERVICE_PLAN_NAME> --resource-group <RESOURCE_GROUP_NAME> --sku <SKU_NAME> --is-linux
```
Replace `<APP_SERVICE_PLAN_NAME>` with the desired name for your App Service plan, `<RESOURCE_GROUP_NAME>` with the name of the resource group created in step 1, and `<SKU_NAME>` with the desired SKU name for the App Service plan (e.g., 'F1'). I suggest you to deploy first with the free tier F1, and then change to a bigger ones such as B1, B2...

3. Create a Web App:

```
az webapp create --name <WEB_APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --plan <APP_SERVICE_PLAN_NAME> --runtime "python|<PYTHON_VERSION>"
```
Replace `<WEB_APP_NAME>` with the desired name for your Azure Web App, `<RESOURCE_GROUP_NAME>` with the name of the resource group created in step 1, `<APP_SERVICE_PLAN_NAME>` with the name of the App Service plan created in step 2, and `<PYTHON_VERSION>` with the desired Python version (e.g., '3.10').
Example command:
```
az webapp create --name visit-tampere-chatbot --resource-group visit-tampere --plan visit-tampere-plan --runtime "python|3.10"
```

4. Build Container Image:

```
az acr build --registry <ACR_REGISTRY_NAME> --image <IMAGE_NAME> --file <DOCKERFILE_PATH>
```
Replace `<ACR_REGISTRY_NAME>` with the name of the Azure Container Registry (ACR), `<IMAGE_NAME>` with the desired name for the container image, and `<DOCKERFILE_PATH>` with the path to the Dockerfile.

5. Deploy to Web App:

``` 
az webapp config container set --name <WEB_APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --docker-custom-image-name <IMAGE_NAME>:<TAG> --docker-registry-server-url <ACR_REGISTRY_URL>
```
Replace `<WEB_APP_NAME>` with the name of the Azure Web App created in step 3, `<RESOURCE_GROUP_NAME>` with the name of the resource group created in step 1, `<IMAGE_NAME>` with the name of the container image created in step 4, `<TAG>` with the tag for the container image, and `<ACR_REGISTRY_URL>` with the URL of the ACR registry.

Browse the Web App:

bash
Copy code
az webapp browse --name <WEB_APP_NAME> --resource-group <RESOURCE_GROUP_NAME>
Replace <WEB_APP_NAME> with the name of the Azure Web App created in step 3 and <RESOURCE_GROUP_NAME> with the name of the resource group created in step 1.

# Deploy Flask Web App to Azure Web App using Makefile
This tutorial will guide you through the process of deploying a Flask web app to Azure Web App using a Makefile and the Azure CLI. Please make sure you have the following prerequisites installed:

(Azure CLI)[https://docs.microsoft.com/en-us/cli/azure/install-azure-cli]
(Docker)[https://docs.docker.com/get-docker/]
## Step 1: Install Azure CLI
1. Install Azure CLI by following the instructions provided in the Azure CLI documentation.

2. Once installed, open a terminal and verify that the Azure CLI is working by running the following command:

```
az --version
```
You should see the installed Azure CLI version displayed.

## Step 2: Install Docker
1. Install Docker by following the instructions provided in the Docker documentation.

2. After installation, verify that Docker is working by running the following command:

```
docker --version
```
You should see the Docker version information displayed.

## Step 3: Clone the project and navigate to the directory
1. Clone the repository containing your Flask web app and navigate to the project directory using the following command:

```
git clone <repository-url>
cd <project-directory>
```
Replace `<repository-url>` with the URL of your Git repository and `<project-directory>` with the name of your project directory.

## Step 4: Run the Makefile
The Makefile provided will guide you through the process of deploying the Flask web app to Azure Web App. Open a terminal and navigate to the project directory.

Run the following command to create the resource group, Azure App Service Plan, Azure Web App, build the container image, deploy it to Azure Web App, and browse the deployed web app:

```
make browse-web-app
```
Follow the prompts to provide the necessary information, such as resource group name, location, App Service plan name, etc.

Once the process is complete, the web app will be deployed and you should be able to browse the web app using the provided URL.
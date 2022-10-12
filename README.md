# WhatsappChatbotUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Infra Deployment Steps

** Infra Deployment
set RESOURCE_GROUP_NAME=RG-FedExEurope_DeliveryBot
set APP_SERVICE_PLAN_NAME=asp-chatbot-content-service-frontend
set APP_SERVICE_NAME=chatbot-content-service-frontend
set LOCATION="westeurope"
set LOG_ANALYTICS_WORKSPACE="chatbot-content-service-frontend-workspace"
set APP_INSIGHTS_NAME="chatbot-content-service-frontend-app"

az appservice plan create --name %APP_SERVICE_PLAN_NAME% --resource-group %RESOURCE_GROUP_NAME% --location %LOCATION% --sku F1 

az webapp create --name %APP_SERVICE_NAME% --resource-group %RESOURCE_GROUP_NAME% --plan %APP_SERVICE_PLAN_NAME% --runtime "NODE:16-lts"

az webapp log config --application-logging filesystem --detailed-error-messages true --failed-request-tracing true --resource-group %RESOURCE_GROUP_NAME%  --name %APP_SERVICE_NAME% --level verbose --web-server-logging filesystem

az monitor log-analytics workspace create --resource-group %RESOURCE_GROUP_NAME% -n %LOG_ANALYTICS_WORKSPACE%

az monitor app-insights component create --app %APP_INSIGHTS_NAME% --location %LOCATION% --kind web --resource-group %RESOURCE_GROUP_NAME% --application-type web --workspace %LOG_ANALYTICS_WORKSPACE%

az webapp config appsettings set --name %APP_SERVICE_NAME% --resource-group %RESOURCE_GROUP_NAME% --settings APPINSIGHTS_INSTRUMENTATIONKEY=1a1286a3-ee33-4ab7-adb7-d75e66e59f9c APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=1a1286a3-ee33-4ab7-adb7-d75e66e59f9c ApplicationInsightsAgent_EXTENSION_VERSION=~2


npm install (Run this otherwise BOT will show timeout error )

zip -r "ContentServiceFrontEnd.zip" . 

az webapp deployment source config-zip --resource-group "RG-FedExEurope_DeliveryBot" --name "chatbot-content-service-frontend" --src "ContentServiceFrontEnd.zip"
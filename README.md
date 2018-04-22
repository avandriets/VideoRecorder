# My Video Recorder

## Requirements

- [Node](https://nodejs.org) v6 or later

## Install project

*clone project from github and go to project folder*

```bash
git clone https://github.com/avandriets/VideoRecorder.git test_issue
cd test_issue
```

next install packages

```bash
npm install -g @angular/cli
npm i
```

## To Run Project

There are two variants to run the application:

### Use mock data
Run `ng serve --environment=mock` or `npm run start-use-mock-data` for a dev server. Navigate to `http://localhost:4200/`. The app will use mock data after refresh brouser you lose you saved records.

### Use service to manage your records
Run `ng serve --environment=dev` or `npm run start-use-dev-server` for a dev server. Navigate to `http://localhost:4200/`. The app will use dev server with REST API to save your data.

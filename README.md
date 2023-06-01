# Supa Angular

## Description
Supa Angular is an Angular Supabase template.

### Auth
The project will set up auth by creating triggers for when a sign up is completed in the auth table which will create the profile in the public schema.

### Libraries
 - Tailwind
 - Angular Material
 - Prisma
 - Supabase
 - Angular
 - Jasmine/Karma/Ng-mocks

### Folder Structure
The folders are structured in such a way that the application is in `/web` and has `/docs` and `/infrastructure` for documentation and IaC respectively because this is the beginning of a larger project however before the development begins of the bespoke code, I thought this base may be of use to others.

## Usage
Copy the repo down, run `npm install` in `/web` and populate your `environment.development.ts` then go to town building out your Angular app using Supabase. Ideally, if you have any improvements to this base template, you could push them back up. Sharing is caring.

### Prisma
The project uses Prisma to create the schema and migrations for the Supabase database. You will want to run `npx prisma migrate deploy --schema ./supabase/prisma/schema.prisma` from `/web` to get the database in an initial state ready to play with. Removing this dependency and using standard Supabase migrations is fine and developer preference.

#### .env
You will need to add Prisma .env files next to schema files with `DATABASE_URL` and `SHADOW_DATABASE_URL` variables.

### Supabase
If you are running Supabase locally, don't forget `npx supabase start` otherwise set up your Angular environment files to point to the appropriate place.

#### .env
You will need to set up your .env files for the config.toml to use. Place this in `/web`.

### Angular
Below is the usual Angular README content on how to run the application.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Also available in `.vscode/launch.json` for VS Code users.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Also available in `.vscode/tasks.json` for VS Code users.

## Roadmap
- [ ] Add comments for compodoc
- [ ] Improve test coverage
- [ ] Switch to Jest

## Authors and acknowledgment
Shout to the below for contributing code with their gist for Supabase Auth:

 - Kyle Rummens (https://gist.github.com/kylerummens)

## Feedback
Please give any feedback you might have through PRs, issues or comments.

## License
All code code in this repository is licensed under the [WTFPL license](LICENSE).


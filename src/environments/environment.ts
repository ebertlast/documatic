// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
};

export const app = {
  name: 'Documatic',
  namesmall: 'D+',
  company: 'Depharcol',
  yearlicense: '2017',
  currentuser: 'user',
  // ,apiurl: 'http://localhost:8082/Angular/unidosis/apidosimatic/',
  // apiurl: 'http://dosisunitarias.com/gestion_documental/apidosimatic/',
  // apiurl: 'http://dosisunitarias.com/documatic/documatic.api/',
  apiurl: 'http://depharcol.com/documatic/documatic.api/',
  chatComponent: false
};

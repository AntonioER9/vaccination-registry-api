<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Vaccination Registry API

1. Clonar proyecto
2. Instalar dependencias ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos en contenedor docker
```
docker-compose up -d
```

6. Levantar el proyecto: ```yarn start:dev```
7. Ejecutar los endpoints ya sea en swagger (http://localhost:3000/api) o importarlo en postman (API_Documentation.postman_collection.json)
8. Ejecutar pruebas unitarias:
```
yarn run test:cov
```

yarn run test:cov
yarn run v1.22.21
$ jest --coverage
 PASS  src/auth/tests/auth.service.spec.ts (6.569 s)
 PASS  src/drugs/tests/drugs.service.spec.ts (6.697 s)
 PASS  src/vaccinations/tests/vaccinations.service.spec.ts (6.749 s)
 PASS  src/auth/tests/auth.controller.spec.ts (6.828 s)
 PASS  src/drugs/tests/drugs.controller.spec.ts (6.846 s)
 PASS  src/vaccinations/tests/vaccinations.controller.spec.ts (6.925 s)
-|---------|----------|---------|---------|-------------------
 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-|---------|----------|---------|---------|-------------------
 |   91.58 |    57.69 |   75.51 |    92.6 |
  |      92 |       60 |   88.88 |   95.12 |
   |     100 |      100 |     100 |     100 |
   |   89.18 |       60 |   83.33 |   93.33 | 75-76
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |   84.61 |      100 |       0 |   81.81 |
   |   84.61 |      100 |       0 |   81.81 | 48,53
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |      75 |      100 |       0 |      75 |
   |      75 |      100 |       0 |      75 | 13,21
  |   92.18 |       50 |   92.85 |   94.33 |
   |     100 |      100 |     100 |     100 |
   |   88.09 |       50 |    87.5 |    90.9 | 74,87-88
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |   85.71 |      100 |       0 |   83.33 |
   |   85.71 |      100 |       0 |   83.33 | 29-30
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |   89.47 |    61.53 |   85.71 |   90.76 |
   |     100 |      100 |     100 |     100 |
   |   85.71 |    61.53 |   77.77 |   87.23 | 41,89,100-103
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
  |   83.33 |      100 |       0 |      80 |
   |   83.33 |      100 |       0 |      80 | 20-21
  |     100 |      100 |     100 |     100 |
   |     100 |      100 |     100 |     100 |
-|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 91.58% ( 272/297 )
Branches     : 57.69% ( 15/26 )
Functions    : 75.51% ( 37/49 )
Lines        : 92.6% ( 238/257 )
================================================================================

Test Suites: 6 passed, 6 total
Tests:       42 passed, 42 total
Snapshots:   0 total
Time:        7.932 s, estimated 8 s
Ran all test suites.
✨  Done in 9.12s.

# Sprint 7 y 8  Hermanos - Full Stack Developer - ITBA Grupo 12

El proyecto consiste en un sitio web de e-commerce para una mueblería.  
En estos sprints se implementaron los apartados de inicio de sesión y registro, además de funcionalidades básicas según los roles dentro de la aplicación. Se crearon puntos de acceso protegidos en el servidor, que validan el rol del usuario antes de entregar información o permitir alguna modificación, según corresponda.

## Participantes
[![GitHub](https://img.shields.io/badge/GitHub-Elena%20Irurueta-333333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elenairurueta) [![GitHub](https://img.shields.io/badge/GitHub-Lucas%20Leonel%20Costilla-333333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Lucasleonel4)

_[Aixa Cura](https://github.com/aixancura) |_
_[Elias Morales](https://github.com/elias1-lang) |_
_[Valentín Criado](https://github.com/valencriado) |_

## Tecnologías
**Client:** React  
**Server:** Node, Express, MongoDB

  ![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)
  ![HTML5](https://img.shields.io/badge/-HTML5-333333?style=flat&logo=HTML5)
  ![CSS](https://img.shields.io/badge/-CSS-333333?style=flat&logo=CSS&logoColor=1572B6)
  ![React](https://img.shields.io/badge/React-333333?style=flat&logo=react)
  ![Node.js](https://img.shields.io/badge/Node.js-v22.19.0-43853D?style=flat&logo=nodedotjs&logoColor=white)
  ![npm](https://img.shields.io/badge/npm-v10.9.3-43853D?style=flat&logo=npm&logoColor=white)
  ![Express](https://img.shields.io/badge/-Express-333333?style=flat&logo=express)
  ![MongoDB](https://img.shields.io/badge/-MongoDB-333333?style=flat&logo=MongoDB)
## Links
[![Render](https://img.shields.io/badge/Render-FRONTEND-333333?style=for-the-badge&logo=render&logoColor=white)](https://muebleria-hermanos-jota-k9wj.onrender.com/)
[![Render](https://img.shields.io/badge/Render-BACKEND-333333?style=for-the-badge&logo=render&logoColor=white)](https://hermanos-jota-k7qx.onrender.com/)
> ⚠️ **Atención:** El backend tarda aproximadamente 60 segundos en iniciar por primera vez.

## Instalación

1. **Instalación de Dependencias**

    - **Instalar todas las dependencias del proyecto (desde el directorio raíz):**
      ```bash
      npm run install:all
      ```
    
    - **Instalar solo las dependencias del backend (desde el directorio raíz):**
      ```bash
      cd backend
      npm install
      ```
    
    - **Instalar solo dependencias del cliente (desde el directorio raíz):**
      ```bash
      cd client
      npm install
      ```

2. **Iniciar el servidor backend (desde el directorio raíz):**
    ```bash
    cd backend
    npm run env
    ```
    El servidor backend se ejecutará en `http://localhost:4000`  
    El comando `npm run env` inicia el servidor backend con las variables de entorno (se requiere el archivo `.env`).
   > ⚠️ **Atención:** Por ahora las variables de entorno se incluyen en el proyecto. Próximamente deberán agregarse al `.gitignore`

4. **En una nueva terminal, iniciar el cliente React (desde el directorio raíz):**
    ```bash
    cd client
    npm start
    ```
    El cliente se ejecutará en `http://localhost:3000`

## Mejoras a Implementar
- Separación de componentes en la página de tablero.
- Implementación del modelo vista-controlador en el servidor.
- Mejora de estilos.
- Integración del carrito de compras con el servidor.
- Añadido de ventanas de carga y alertas de errores.

<p align="center">
  <img src="./client/public/favicon.svg" alt="Logo Mueblería" width="200">
</p>

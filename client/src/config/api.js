/* 
    URL_BASE es una variable global que puede tomar dos valores dependiendo si se encuentra el proyecto en modo "DEVELOPMENT" o no.
    
    El proyecto siempre que se ejecute con: npm start, estará en modo DEVELOPMENT, para esos casos URL_BASE será "/api", esto es 
    necesario porque el proyecto tiene configurado un proxy para evitar CORS, simplificando el proxy todas las consultas a ej: "/productos", 
    reemplazandolas automáticamente por "https://hermanos-jota-k7qx.onrender.com/api" + "/productos". Sin embargo, en el build del proyecto
    en servidores de hosting (ej.: netlify, render, etc...) se desprecia el proxy (no se usa). En esos casos, hacer fetch a 
    por ejemplo: "/api/productos", sería un problema si no se pone la ruta completa: "https://hermanos-jota-k7qx.onrender.com/api/productos".
    Entonces para evitar tener que cambiar todos los fetch de forma que se adapten a los servicios de hosting, usar URL_BASE anteponiendo los
    directorios que varían de la API.
    
    Por ejemplo, se quiere hacer fetch a productos de la API:
        - Se combinan URL_BASE y productos
          es decir: `${URL_BASE}/productos`


          En BUILD ese URL_BASE se reemplazará por: https://hermanos-jota-k7qx.onrender.com/api
            -> necesita la url https://hermanos-jota-k7qx.onrender.com/api porque en el build se elimina el proxy o no se tiene en cuenta.

          En DEVELOPMENT ese URL_BASE se reemplazará por: /api
            -> no necesita la url https://hermanos-jota-k7qx.onrender.com/api, porque ya está asignada en el proxy
*/

const URL_BASE = process.env.NODE_ENV == "development"
?"/api":"https://hermanos-jota-k7qx.onrender.com/api";
export default URL_BASE;
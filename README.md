# Encuentros de capacitación en Digital House

Nos juntamos a ver diferentes tema relacionados con la cursada de Node y su implementación en clase

## Episodio 1:  HTML Express y sendfile + Conversión a MVC

¿De que manera podemos mostrar HTML en nuestro servidor con Node?

### [Demo 1: Mostrando HTML y CSS con Express y res.sendFile()](e1-01-html-express-sendfile)

La versión más simple de todas, Express, **express.static()** y **res.sendFile()**, no se necesita mucho más :wink:

### [Demo 2: Organizando el código con una estructura MVC y vistas EJS](e1-02-pasaje-a-mvc)

Partimos del ejemplo anterior, creamos archivos para rutas y controladores.

Luego reemplazamos nuestro **res.sendFile()** por un mucho mejor **res.render()**
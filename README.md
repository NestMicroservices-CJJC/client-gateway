<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Cliente Gateway

El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Si no está ejecutandose, Levanatar el servidor de Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

5. Verificar servidor corriendo:

```
http://localhost:8222/
```

6. Levantar proyecto:

```
npm run start:dev
```

# To view the project enter: https://logicdrawing.herokuapp.com
# Para ver el proyecto, entrar a: https://logicdrawing.herokuapp.com
# Video Heroku: https://youtu.be/HfcH11G_rFw

# Español

*Este proyecto hace parte del curso "Programación con Tecnologías Web" de Ingeniería de Sistemas de la Universidad de los Andes.
Fue desarollado en el periodo 2019-1. El equipo 9 está conformado por:  
James Lake 201531545  
José Daniel Cárdenas 201313488*

## 1) Descripción del projecto.
La aplicación a desarrollar se llamará Logic Drawing. Logic Drawing es un espacio colaborativo de diseño, que iniciará como un canvas blanco similar a paint en el cual los usuarios podrán dibujar de manera colaborativa en una sala privada. 
Logic Drawing parte de la premisa de "Divide y Truinfarás". Nuestro propósito es resolver el problema de "Necesito realizar un dibujo en conjunto con otras personas de manera que pueda compartir en tiempo real este dibujo." Logic Drawing parte de los supuestos que: El dibujo es privado, tiene un administrador que distrubuye tres permisos a los usuarios con los que comparte el dibujo: Read, Write, y Comment, un dibujo debe estar disponible en todos sus estados anteriores, y los usuarios deben ser capaces de comunicarse en alguna forma.
  
Logic Drawing ofrece además la posibilidad de exportar de maneras intuitivas los diseños hechos, ver los cambios que se hicieron como un historial de cambios, comentar y chatear en las salas. Logic Drawing pretende expandirse a otras funcionalidades en el tiempo próximo.

### Este repositorio corresponde al front de nuestra aplicación.

## 2) Decisiones de construcción de aplicación:
Para el desarrollo de nuestra aplicación, estamos usando React y NodeJS. Para las consultas de la base de datos usamos Axios y habilitamos los CORS para poder manejar el front y el back desplados en puertos distintos.

## 3) Despliegue 

#### Para el despliegue de la aplicación, se deben seguir los siguientes pasos: 

#### a) Asegurar tener node en la versión 10.0.0 o mayor, y NPM en la versión 6.0.0 o mayor.

#### b) Clonar el repositorio a su equipo. Los caminos que se usan son relativos a 1 directorio. Deben de estar en el mismo directorio padre el back y el front.

#### c) Instalar las dependencias de Node. Correr el comando npm install. Luego, ejecutar el comando npm run build.

#### d) Abrir terminal, y moverse hacia el directorio en donde se encuentra el proyecto. Luego, inicializar el cliente.
> cd ../Team09-front
> npm start

Esto ejecuta nuestro app en modo de desarrollo.<br>
Abrir la url [http://localhost:3000](http://localhost:3000) para verlo en el browser.


## 4) Funcionalidades de nuestro programa

Nuestro programa por el momento ofrece las siguiente funcionalidades a los usuarios:
- Crear usuarios, manejar su username, email, contraseña y foto de perfil al usuario como desee (cambiarla, etc).
- Dibujar de manera grupal con todos los otros usuarios conectados en un super canvas. Por ahora el manejo de multiples canvas *no* está implementado.
- Comentar en un canvas y ver los comentarios. Editar los comentarios y borrar sus comentarios se permitirá pronto.
- Chatear en un room con los otros usuarios conectados al chat.
- Revisar mis grupos de manera que pueda acceder a cada uno individualmente y ver los usuarios de éste así como sus rooms.
- Crear grupos y asignar nuevos usuarios a los grupos, de modo admin o no admin.
- Revisar sus dibujos más recientes (por ahora sólo aparece el único dibujo que tenemos habilitado).

## 5) Disclaimer

El api de nuestro programa permite hacer mucho más que las funcionalidades implementadas, sin embargo, para el funcionamiento de nuestra aplicación, muchas de las funcionalidades del API No son necesarias. Por ejemplo, al usuario no le interesa borrar su usuario o el canvas, así como no le interesa ver el registro de todos los usuarios sobre un canvas por el momento. Para una entrega futura, quizá sería interesante revisar estos conceptos como "Funcionalidades extra".


## 6) Youtube Video Functioning:

https://youtu.be/IYQK8KBReDg

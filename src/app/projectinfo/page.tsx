export default function ProjectInfo(){
    return(<>
    Links:
https://github.com/ashwin-sridhar/mydogs-react
https://github.com/ashwin-sridhar/mydogs-server
https://github.com/ashwin-sridhar/mydogs-gps-mocker

https://hub.docker.com/repository/docker/ashwinsridhardev/mydogs-server/general
https://hub.docker.com/repository/docker/ashwinsridhardev/gpsmocker/general

https://mydogs-react.vercel.app/

------------------------------------------------------
Project info
- Front end built on NextJS(ReactJS), Typescript, Framer-motion, Chart.js, react leaflet and hosted on vercel
- Backend built on NodeJS with REST API(expressjs) as well as WebSocket 
- Dockerized and running on EC2 Instance behind nginx
- GPS Mocker python script to randomly generate a gps coordinate and then add 500m to it every 45 seconds and send to WebSocket url
- NextJS app connected as client to the WebSocket to display live "mock" gps information
- MySQL DB on AWS RDS
    </>)
}
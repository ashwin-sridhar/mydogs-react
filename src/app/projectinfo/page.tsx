import projectInfoImg from "../../../images/projectinfo.png";
import Image from "next/image";
export default function ProjectInfo(){
    return(<>
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 p-8">
            <h1 className="text-xl text-white">Project Info:</h1>
        <p className="text-xl">Links:<br/></p>
        <ul>
<li><a className="text-2xl text-cyan-500" href="https://github.com/ashwin-sridhar/mydogs-react">mydogs-react on github </a></li>
<li><a className="text-2xl text-cyan-500" href="https://github.com/ashwin-sridhar/mydogs-server">mydogs-server on github </a></li>
<li><a className="text-2xl text-cyan-500" href="https://github.com/ashwin-sridhar/mydogs-gps-mocker">GPS mocker on github </a></li>

<li><a className="text-2xl text-cyan-500" href="https://hub.docker.com/repository/docker/ashwinsridhardev/mydogs-server/general">mydogs server docker image </a></li>
<li><a className="text-2xl text-cyan-500" href="https://hub.docker.com/repository/docker/ashwinsridhardev/gpsmocker/general">GPS mocker python docker image </a></li>
<li><a className="text-2xl text-cyan-500" href="https://mydogs-react.vercel.app/">The app on vercel</a></li>

</ul>



------------------------------------------------------
<p className="text-2xl text-white">
Project info</p>

<ul>
<li>- Front end built on NextJS(ReactJS), Typescript, Framer-motion, Chart.js, react leaflet and hosted on vercel</li>
<li>- Backend built on NodeJS with REST API(expressjs) as well as WebSocket </li>
<li>- Dockerized and running on EC2 Instance behind nginx</li>
<li>- GPS Mocker python script to randomly generate a gps coordinate and then add 500m to it every 45 seconds and send to WebSocket url</li>
<li>- NextJS app connected as client to the WebSocket to display live "mock" gps information</li>
<li>- MySQL DB on AWS RDS</li>
</ul>
<Image src={projectInfoImg} alt="project info diagram"/>
        </div>
        <div className="col-span-1">
            <h1 className="text-2xl">Why me?</h1>
            <ul className="text-2xl list-disc">
                <li>Apart from the my qualification as an Engineer with considerable experience, I am also a professional dog trainer part time being equally crazy about dogs and technology.</li>
                <li>I chanced upon fitbark during a bit of market research when I set out to start off with my own startup on similar lines called packculture.in. Would love to be a part of an already excellent product. Why reinvent the wheel when I can positively contribute to an already great product.</li>
                <li>This would literally be my dream role and hence I would happy to be flexible with roles, timings and compensation and would enjoy the work that I do.</li>
                <li>More than the experience and skillset in relevant skillset, I would never run out of motivation to strive for excellence given this is a great passion of mine. I would be happy to be contribute and be a part of Fitbark in any way possible.</li>
                <li>Beyond the demonstrated skillsets, I am also a Confluent Certified Developer for Apache Kafka as well. </li>
                <li>Greatly looking forward to a conversation with you!</li>
            </ul>
        </div>
    
</div>
    </>)
}
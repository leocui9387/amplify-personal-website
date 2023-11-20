import { Button } from "reactstrap";

export class YouTube {
    static gotoYT(link, timestamp) {

        if (timestamp) {
            window.open(link + "&t=" + timestamp + "s");
        }
        else {
            window.open(link);
        }
    }
    static YoutubeButton({ link, text, time1, modz }) {

        return (<p>
            <Button onClick={() => YouTube.gotoYT(link, time1)} color="danger" outline block {...modz} >
                <img src={"https://basic-bear-engineering.s3.amazonaws.com/images/base-site/youtube.png"} class="icon" alt="" />
                &emsp; {text}
            </Button></p>);
    }

}
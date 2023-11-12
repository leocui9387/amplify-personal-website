import { Button} from "reactstrap";
import youtube_icon from "../images/youtube.png";

export class YouTube {
    static gotoYT(link, timestamp) {

        if (timestamp) {
            window.open(link + "&t=" + timestamp + "s");
        }
        else {
            window.open(link);
        }
    }
    static YoutubeButton({ link, text, time1, modz  }) {

        return (<p>
            <Button onClick={() => YouTube.gotoYT(link, time1)} color="danger" outline block {...modz} >
                <img src={youtube_icon} class="icon" alt="" />
                &emsp; {text}
            </Button></p>);
    }
    
}
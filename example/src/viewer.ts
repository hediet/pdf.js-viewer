import "./styles.scss";
import { PDFPageView, loadViewer } from "../../dist/";

const old = PDFPageView.prototype.draw;
PDFPageView.prototype.draw = function (...args) {
    const result = old.apply(this, args);

    const div = this.div;

    const playButton = document.createElement("div");
    playButton.textContent = "hell";
    div.appendChild(playButton);
    playButton.className = "playButton";
    playButton.style.position = "absolute";
    playButton.style.top = "0";
    playButton.style.right = "0";
    playButton.style.margin = "10px";


    playButton.innerHTML = `
    <svg data-icon="play" width="30" height="30" viewBox="0 0 20 20"><desc>play</desc><path d="M16 10c0-.36-.2-.67-.49-.84l.01-.01-10-6-.01.01A.991.991 0 005 3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1 .19 0 .36-.07.51-.16l.01.01 10-6-.01-.01c.29-.17.49-.48.49-.84z" fill-rule="evenodd"></path></svg>
    `;
    playButton.onclick = () => {
        window.parent.postMessage({ event: "play-from-slide", slide: this.id }, "*");
    };
    
    return result;
}

loadViewer({ pdfUrl: "/sample.pdf" });

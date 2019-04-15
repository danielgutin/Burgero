import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Constants for pdf.
import { logo, opensansFont} from './generate_pdf_const';

// Generate Dynamic Burger SnapShot
// username & ingredients used as content inside.
export default (username, ingredients) => {
    console.log(username, ingredients)
    //convert the Burger element to canvas first.
    html2canvas(document.getElementById('Burger'))
      .then((canvas) => {
        //convert the canvas element to PNG.
        const imgData = canvas.toDataURL('image/png');
        //create PDF Obj.
        const doc = new jsPDF();
        //set the font Size.
        doc.setFontSize(22);
        //add open sans fonts.
        doc.addFileToVFS("open-sans.tff", opensansFont)
        doc.addFont("open-sans.tff", "open-sans", "Bold");
        doc.setFont("open-sans","Bold");
        //add the cover image.
        doc.addImage(logo, 'PNG', 0, 0, 210, 60);
        //pdf head & content
        doc.text(`${username}'s Special Burger`, 10, 75);
        doc.addImage(imgData, 'PNG', 55, 110, 100, 100);
        doc.setFontSize(17);
        doc.text(`ingredients : ${ingredients}`, 10, 95);
        doc.setFontSize(15);
        doc.text("made with love by Daniel Gutin", 10, 290);
        // download the generated PDF file.
        doc.save("Burgero.pdf");  
      });
}
import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import './barcode.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from "react-qr-code";
import {Routes,Route,Link,useLocation,useNavigate} from 'react-router-dom';
var ReactDOM = require('react-dom');
var Barcod = require('react-barcode');

function printDocument() {
    const input = document.getElementById('covidCard');
    console.log("here")
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
}
function Barcode(props) {
    const { state } = useLocation();
    return (
        <div>
            <br/><br/>
            <div id='covidCard'>
              <div>
                <h1>Covid 19 vaccination card</h1>
                <h3>Name: <span>{state.Name}</span></h3>
                <h3>DOB: <span>{state.DOB}</span></h3>
                <h3>Age: <span>{state.Age}</span></h3>
                <h3>Id: <span>{state.Id}</span></h3>
                <h3>Place of Vaccination: <span>{state.Place}</span></h3>
                <h3>date of secod dose: <span>{state.SecondDoseDate}</span></h3>

                <table>
                    <tr>
                        <th>Dose</th>
                        <th>Type</th>
                        <th>Batch number</th>
                        <th>Expiry date</th>
                        <th>Date</th>
                        <th>Sig of Vacc</th>
                    </tr>
                    <tr>
                        <td>Dose 1</td>
                        <td>Sinovac</td>
                        <td>34555555</td>
                        <td>14/23/27</td>
                        <td>15/03/23</td>
                        <td>s nyathi</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <br/><br/><br/>
             </div>
             <div>
                 <br/><br/><br/><br/>
                <h3>comments</h3>
                <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                <QRCode value={state.Id} />
              </div>
            </div>
            <p>generate pdf file for printing</p>
            <button onClick={printDocument} >generate</button>
        </div>
    );
}

export default Barcode;
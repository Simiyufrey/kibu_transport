import jsPDF from "jspdf";
import logo from "../../assets/kibu__logo.png";
import autoTable from "jspdf-autotable";
import { Table } from "react-bootstrap";

const Pdf = (de) => {
  let varh = 0;
  let pdf = new jsPDF("portrait", "px", "a4", false);
  const w = pdf.internal.pageSize.getWidth();
  console.log(de);
  pdf.setFont("Times", "bold", 16);
  varh = 30;
  pdf.text("KIBABII UNIVERSITY TRANSPORT DEPARTMENT ", 30, varh);
  varh = varh + 10;

  pdf.addImage(logo, w / 2 - 50, varh, 100, 100);
  varh = varh + 130;

  pdf.setFont("Times", "normal", 12);
  varh = varh + 30;
  pdf.text(
    "Transport permit for " +
      de.Faculty +
      "To use " +
      de.type +
      " of Number plate  " +
      de.Vehicle_No,
    30,
    varh
  );
  varh = varh + 30;

  var y = 10;
  // bodyData.unshift(headers);

  pdf.setFont("Times", "bold", 14);

  pdf.setLineWidth(2);
  pdf.text(200, (y = y + 30), "");
  pdf.autoTable({
    body: [
      ["From  ", de.place_from],
      ["Destination  ", de.place_to],
      ["Driver   ", de.SurName + "   " + de.OtherNames],
      ["Driver Number", de.Mobile],
      ["No of Passengers  ", de.Passengers],
      ["Departure date  ", de.de_date + "    Time " + de.de_time],
      ["Return Date  ", de.return_date + "   Time " + de.return_time],
    ],
    startY: 200,
    startX: w / 2,
    theme: "grid",
  });

  pdf.save(de.Faculty + "_" + de.SurName + ".pdf");
};

export default Pdf;

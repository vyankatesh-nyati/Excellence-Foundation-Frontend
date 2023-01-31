import React from "react";
import classes from "./Certificate.module.css";
import certificateImg from "../../Assests/certificate.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const pdf = new jsPDF("l", "cm", [29.7, 21], true);

export const addCertificate = (regId) => {
  const input = document.getElementById("certificate");

  html2canvas(input, { scale: 6 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 29.7, 21, "", "FAST");
    pdf.save(`${regId}.pdf`);
  });
};

const Certificate = (props) => {
  const data = props.formData;
  // console.log(data);
  let dd = new Date().getDate();
  let mm = new Date().getMonth() + 1;
  let yy = new Date().getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const date = `${dd}-${mm}-${yy}`;

  const printCertificate = () => {
    const input = document.getElementById("certificate");

    html2canvas(input, { scale: 6 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 29.7, 21, "", "FAST");
      pdf.save(`${data.regId}.pdf`);
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.certificate} id="certificate">
        <img src={certificateImg} alt="Excellence Foundation Certificate" />
        <div className={classes.name}>
          <h2>{data.name}</h2>
        </div>
        <div className={classes.date}>
          <p>DATE - {date}</p>
        </div>
        <div className={classes.reg}>
          <p>REG: {data.regId}</p>
        </div>
      </div>
      <button
        onClick={printCertificate}
        type="button"
        className={classes.print}
      >
        Print
      </button>
    </div>
  );
};

export default Certificate;

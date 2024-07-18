import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./receipt.css";
import sign from "./sign.png";
import top from "./top.png";
import loo from "./loo.png";

function Receipt() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get("id");
    setId(uid);
    axios
      .get(`https://${baseurl}/getStudent/${id}`)
      .then((x) => setData(x.data));
  }, [location.search, id]);

  return (
    <div className="hey">
      <div class="box">
        <div class="heade" style={{ background: "bisque" }}>
          <h1 className="text-4xl">FEE RECEIPT</h1>
        </div>

        <div class="heade">
          <img src={loo} alt="logo" class="logo" />
          <img src={top} alt="logo" class="loga" />
        </div>

        <div class="table-container">
          <table class="table">
            <tr>
              <td>Registration No.</td>
              <td>
                <strong>{data.sid}</strong>
              </td>
              <td>RECEIPT No.</td>
              <td>
                <strong>{data.receipt}</strong>
              </td>
            </tr>
            <tr>
              <td>Name :</td>
              <td colspan="3">{data.name}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td colspan="3">{data.adress}</td>
            </tr>
            <tr>
              <td>Pick Up Point : </td>
              <td>{data.pickuppoint}</td>
              <td>Date :</td>
              <td>{data.date}</td>
            </tr>
            <tr>
              <td>Camp Name :</td>
              <td>ADVENTURE TRAINING CAMP 7 DAYS (2023) </td>
              <td>Batch No :</td>
              <td>ATC23-5</td>
            </tr>
            <tr>
              <td>Camp Date :</td>
              <td>7 Days</td>
              <td>Contact :</td>
              <td>contact</td>
            </tr>
          </table>
        </div>

        <div class="table-container">
          <table class="table">
            <tr>
              <td>trsaction id:</td>
              <td>
                <strong>12345abcde</strong>
              </td>
              <td>Amount</td>
              <td>
                <strong>{data.fees}</strong>
              </td>
            </tr>
            <tr>
              <td colspan="4"></td>
            </tr>
            <tr>
              <td>Particular</td>
              <td>Qty</td>
              <td>Amount</td>
              <td>Total</td>
            </tr>
            <tr>
              <td>{data.camp} camp name</td>
              <td>{data.qty} number</td>
              <td>{data.fees} few thousand dollars</td>
              <td>{data.total} total dollars</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td>discount :</td>
              <td>Lorem ipsum dolor sit amet.</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td>Total Payabel :</td>
              <td>Lorem ipsum dolor sit amet.</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td>Net Paid :</td>
              <td>Lorem ipsum dolor sit amet.</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td>Balance :</td>
              <td> {data.pending_fees}</td>
            </tr>
            <tr>
              <td>in words :</td>
              <td colspan="3">few thousand dollars </td>
            </tr>
          </table>
        </div>

        <div class="terms">
          <div class="headline">
            <strong>Terms & Conditions</strong>
          </div>
          <div class="list">
            <ol>
              <li>Without this Card the Entrance will not be accepted.</li>
              <li>Card will not be accepted if it gets damaged.</li>
              <li>
                Pick Point given is Fixed, Other than these students will not be
                picked up.
              </li>
              <li>Time schedule given is subject to be changed.</li>
              <li>
                If you have any query regarding Pick up Point or want any other
                pick up then contact on the below number.
              </li>
              <li>
                Bring Medical/Fitness Certificate on the first day of Camp,
                dated must be before a maximum of 5 Days.
              </li>
              <li>Without Medical Certificate entry will be prohibited.</li>
            </ol>
          </div>
        </div>

        <div class="terms">
          <div class="headline">
            <strong>Bank Details :</strong>
            <ul>
              <li>Account Number : 102404180001569</li>
              <li>IFSC Code : SVCB0000024</li>
              <li>Account Name : MCF Adventures</li>
              <li>Bank and Branch : SVC BANK, VASHI</li>
            </ul>
          </div>
        </div>

        <div class="signature">
          <img src={sign} class="auth" />
        </div>

        <div class="footer">
          <p>
            Mail us on: <strong>mcfcamp@gmail.com</strong>{" "}
            (mailto:mcfcamp@gmail.com)
          </p>
          <p>
            Cantact Us on : 9604082000/9604084000 / Website URL :
            www.mcfcamp.com (http://mcfcamp.in)
          </p>
        </div>
        <button
          onClick={(e) => window.print()}
          className="no-print bg-blue-500 hover:bg-blue-700 text-white py-1 px-8 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default Receipt;

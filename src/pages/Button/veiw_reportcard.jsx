import React, { useEffect, useState } from "react";
import pic from "./favicon.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../utils/domain";

function ViewReportCard() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get("id");
    setId(uid);
    axios
      .get(`https://${baseurl}/getStudent?sid=${id}`)
      .then((x) => setData(x.data.student));
  }, [location.search, id]);

  const getLabelForRating = (rating) => {
    switch (rating) {
      case "1":
        return "Bad";
      case "2":
        return "Average";
      case "3":
        return "OK";
      case "4":
        return "Good";
      case "5":
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={(e) => window.print()}
        className="no-print bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
      >
        Print
      </button>
      <div className="hey">
        <div class="box">
          <div class="header"></div>

          <div class="inner-box">
            <p>
              Dear<strong> &nbsp; {data.first_name}</strong>
            </p>
            <img
              src="https://source.unsplash.com/random/80x100"
              alt="photo"
              class="photo"
            />
          </div>

          <div class="table-container">
            <table class="table">
              <tr>
                <td>Registration No.</td>
                <td>
                  <strong>{data.sid}</strong>
                </td>
                <td>Chess No.</td>
                <td>
                  <strong>{data.chess_prefix}</strong>
                </td>
              </tr>
              <tr>
                <td>Name :</td>
                <td colspan="3">{data.first_name + " " + data.last_name}</td>
              </tr>
              <tr>
                <td>Camp Name :</td>
                <td>{data.Camp}</td>
                <td>Batch No :</td>
                <td>ATC23-5</td>
              </tr>
              <tr>
                <td>Total days :</td>
                <td>7 Days</td>
                <td>Camp Category :</td>
                <td>{data.camp_category} </td>
              </tr>
              <tr>
                <td>Pick Up Point : </td>
                <td>{data.pick_up_point}</td>
                <td>Pick Up Time :</td>
                <td>{data.Pick_Time}</td>
              </tr>
              <tr>
                <td>In-chanrge Name :</td>
                <td colspan="3">{data.in_charge}</td>
              </tr>
            </table>
          </div>

          <div class="in-box-2">
            <strong>Grading Parameters :- </strong>
          </div>

          <div className="table-container">
            <table className="table ">
              <tr>
                <td>Discipline</td>
                <td>
                  <strong>{getLabelForRating(data.discipline)}</strong>
                </td>
              </tr>
              <tr>
                <td>Physical Fitness</td>
                <td>
                  <strong>{getLabelForRating(data.physical_fitness)}</strong>
                </td>
              </tr>
              <tr>
                <td>Courage</td>
                <td>
                  <strong>{getLabelForRating(data.courage)}</strong>
                </td>
              </tr>
              <tr>
                <td>Leadership</td>
                <td>
                  <strong>{getLabelForRating(data.leadership)}</strong>
                </td>
              </tr>
              <tr>
                <td>Initiative</td>
                <td>
                  <strong>{getLabelForRating(data.initiative)}</strong>
                </td>
              </tr>
              <tr>
                <td>Interpersonal Relation</td>
                <td>
                  <strong>
                    {getLabelForRating(data.interpersonal_relations)}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Team Building</td>
                <td>
                  <strong>{getLabelForRating(data.team_building)}</strong>
                </td>
              </tr>
              <tr>
                <td>Training</td>
                <td>
                  <strong>{getLabelForRating(data.training)}</strong>
                </td>
              </tr>
            </table>
          </div>

          <div class="signature">
            <div class="d-flex">
              <p>sign</p>
              <img src="https://source.unsplash.com/random/50x30" alt="" />
              <p>Camp Commandant</p>
              <p>MCF</p>
            </div>
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
        </div>
      </div>
    </div>
  );
}

export default ViewReportCard;

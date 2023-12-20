import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../css/FestivalDetail.module.css";

function Detail() {
  const location = useLocation();
  const histoty = useNavigate();
  const festival = location.state.item;
  const goBack = () => {
    histoty(-1);
  };
  const formatDate = (dateString) => {
    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2);
    const day = dateString.substr(6, 2);

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className={styles.main}>
      <div className={styles.back}>
        <div className={styles.imageBox}>
          <img src={festival.firstimage} alt="이미지" />
        </div>

        <div className={styles.contentBox}>
          <div>
            <h1>{festival.title}</h1>
            
            <table>
              <tr>
                <th>주소</th>
                <td>{festival.addr1} {festival.addr2}</td>
              </tr>
              <tr>
                <th>행사시작일</th>
                <td>{formatDate(festival.eventstartdate)}</td>
              </tr>
              <tr>
                <th>행사종료일</th>
                <td>{formatDate(festival.eventenddate)}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{festival.tel}</td>
              </tr>
            </table>
          </div>

          <div onClick={goBack} className={styles.backBtn}>
            <div>목록으로</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;

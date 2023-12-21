import { React, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../css/FestivalDetail.module.css";

function Detail() {
  const location = useLocation();
  const festival = location.state.item;
  const [detail, setDetail] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const handleButtonClick = (index) => {
    if (index === 0) {
      setFirst(true);
      setSecond(false);
      setThird(false);
    } else if (index === 1) {
      setFirst(false);
      setSecond(true);
      setThird(false);
    } else {
      setFirst(false);
      setSecond(false);
      setThird(true);
    }
    setActiveButton(index === activeButton ? index : index);
  };

  const formatDate = (dateString) => {
    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2);
    const day = dateString.substr(6, 2);

    return `${year}년 ${month}월 ${day}일`;
  };

  const API_KEY =
    "hvQIg3vORMil2YY1vocfytMyq%2FmkvAvPIS3M5vn0K%2FWYFB7Lq6JV3mOBS0l1jYNs0P3j3cvR89wR592jBTBXxA%3D%3D";
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    fetch(
      `	http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${API_KEY}&_type=json&MobileOS=ETC&MobileApp=festival&contentId=${festival.contentid}&contentTypeId=${festival.contenttypeid}`
    )
      .then((data) => data.json())
      .then((detail) => {
        setDetail(detail.response.body.items.item[0]);
      });
  }, [festival.contentid, festival.contenttypeid]);
  console.log(detail)
  return (
    <div className={styles.main}>
      <div className={styles.back}>
        <div className={styles.imageBox}>
          {festival.firstimage === "" ? (
            <img src={placeholderImage} alt="대체 이미지" />
          ) : (
            <img src={festival.firstimage} alt="이미지" />
          )}
        </div>

        <div className={styles.contentBox}>
          <div>
            <h1>{festival.title}</h1>

            <div>
              <ul className={styles.selectGroup}>
                <li
                  onClick={() => {
                    handleButtonClick(0);
                  }}
                  className={`${activeButton === 0 ? styles.activeButton : ""}`}
                >
                  기본정보
                </li>
                <li
                  onClick={() => {
                    handleButtonClick(1);
                  }}
                  className={`${activeButton === 1 ? styles.activeButton : ""}`}
                >
                  이용안내
                </li>
                <li
                  onClick={() => {
                    handleButtonClick(2);
                  }}
                  className={`${activeButton === 2 ? styles.activeButton : ""}`}
                >
                  상세정보
                </li>
              </ul>
            </div>

            {first ? (
              <div>
                <table>
                  <tr>
                    <th>주소</th>
                    <td>
                      {festival.addr1} {festival.addr2}
                    </td>
                  </tr>
                  <tr>
                    <th>전화명</th>
                    <td>{detail.sponsor1}</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      {festival.tel === "" ? "연락처 없음" : festival.tel}
                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td>
                      {detail.eventhomepage === "" ? "정보 없음" : <a href={detail.eventhomepage}>홈페이지 바로가기</a>}
                    </td>
                  </tr>
                </table>
              </div>
            ) : null}
            {second ? (
              <div>
                <table>
                  <tr>
                    <th>행사시작일</th>
                    <td>{formatDate(festival.eventstartdate)}</td>
                  </tr>
                  <tr>
                    <th>행사종료일</th>
                    <td>{formatDate(festival.eventenddate)}</td>
                  </tr>
                  <tr>
                    <th>공연시간</th>
                    <td>{detail.playtime}</td>
                  </tr>
                  <tr>
                    <th>이용 요금</th>
                    <td>
                      {detail.usetimefestival === ""
                        ? "무료"
                        : detail.usetimefestival}
                    </td>
                  </tr>
                </table>
              </div>
            ) : null}
            {third ? (
              <div>
                <table>
                  <tr>
                    <th>행사 장소</th>
                    <td>{detail.eventplace}</td>
                  </tr>
                  <tr>
                    <th>관람소요시간</th>
                    <td>
                      {detail.spendtimefestival === ""
                        ? "소요시간 없음"
                        : detail.spendtimefestival}
                    </td>
                  </tr>
                  <tr>
                    <th>주관사</th>
                    <td>
                      {detail.sponsor2 === ""
                        ? detail.sponsor1
                        : detail.sponsor2}
                    </td>
                  </tr>
                  <tr>
                    <th>주관사 연락처</th>
                    <td>
                      {detail.sponsor2tel === ""
                        ? "연락처 없음"
                        : detail.sponsor2tel}
                    </td>
                  </tr>
                </table>
              </div>
            ) : null}
          </div>

          <Link to={`/festival`} className={styles.backBtn}>
            <div >
              <div>목록으로</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;

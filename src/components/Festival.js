import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Festival.module.css";

function Festival() {
  const [festival, setFestival] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [activeButton, setActiveButton] = useState(-1);

  const Gu = [
    "전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const ITEMS_PER_PAGE = 8;
  const PAGINATION_NUMBERS = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = Math.ceil(searchResult.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    const start =
      Math.floor((currentPage - 1) / PAGINATION_NUMBERS) * PAGINATION_NUMBERS +
      1;

    for (
      let i = start;
      i < start + PAGINATION_NUMBERS && i <= totalPageCount;
      i++
    ) {
      paginationNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.current : ""}
        >
          {i}
        </button>
      );
    }

    return paginationNumbers;
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = searchResult.slice(startIdx, endIdx);

  const handleButtonClick = (index) => {
    setActiveButton(index === activeButton ? null : index);
  };

  const onChange = (event) => {
    setSearch(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const searchFestival = festival.filter((item) =>
      item.title.includes(search)
    );

    setCurrentPage(1);
    setActiveButton(-1);
    setSearchResult(searchFestival);
    setSearch("");
  };

  const categoryGu = (gu) => {
    if (gu === -1) {
      setSearchResult(festival);
      setActiveButton(-1);
    } else {
      const guResult = festival.filter((item) => item.sigungucode === `${gu}`);

      setSearchResult(guResult);
    }

    setCurrentPage(1);
  };

  const API_KEY =
    "hvQIg3vORMil2YY1vocfytMyq%2FmkvAvPIS3M5vn0K%2FWYFB7Lq6JV3mOBS0l1jYNs0P3j3cvR89wR592jBTBXxA%3D%3D";
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (localStorage.getItem("festival")) {
      const localFestival = JSON.parse(localStorage.getItem("festival"));
      setFestival(localFestival);
      setSearchResult(localFestival);
      return;
    }

    fetch(
      `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${API_KEY}&_type=json&MobileOS=ETC&MobileApp=festival&areaCode=1&eventStartDate=20230101&eventEndDate=20241231&numOfRows=257`
    )
      .then((data) => data.json())
      .then((fe) => {
        setFestival(fe.response.body.items.item);
        setSearchResult(fe.response.body.items.item);
        localStorage.setItem(
          "festival",
          JSON.stringify(fe.response.body.items.item)
        );
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.back4}>
        <div>
          <div className={styles.back1}>
            <h1 onClick={() => categoryGu(-1)}>축제</h1>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={search}
                onChange={onChange}
                placeholder="가고싶은 축제를 찾아보세요!"
                className={styles.search}
              />
              <button type="submit" className={styles.searchBtn}>
                검색
              </button>
            </form>
          </div>
        </div>

        <div className={styles.back}>
          <div>
            <div className={styles.subTitle}>
              <b>시 / 군 / 구</b>
              <span>Category</span>
            </div>
            <div className={styles.categoryBox}>
              <ul>
                {Gu.map((item, idx) => (
                  <li
                    onClick={() => {
                      categoryGu(idx - 1);
                      handleButtonClick(idx - 1);
                    }}
                    className={`${styles.categoryItem} ${
                      activeButton === idx - 1 ? styles.activeButton : ""
                    }`}
                    key={idx}
                  >
                    <button type="button">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.back2}>
              <h3>🔎 전체 결과 : {searchResult.length} 개</h3>
            </div>

            {searchResult.length > 0 ? (
              <div className={styles.back2}>
                {currentItems.map((item, idx) => (
                  <Link to={`/festival/${item.contentid}`} state={{ item }}>
                    <div key={idx} className={styles.item}>
                      {item.firstimage === "" ? (
                        <img
                          src={placeholderImage}
                          alt={item.title}
                          className={styles.image}
                        />
                      ) : (
                        <img
                          src={item.firstimage}
                          alt={item.title}
                          className={styles.image}
                        />
                      )}

                      <div className={styles.festivalName}>{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.noResult}>검색 결과가 없습니다...</div>
            )}

            {totalPageCount > 0 && (
              <div className={styles.pagination}>
                <div className={styles.nav_buttons}>
                  <button onClick={() => handlePageChange(1)}>&lt;&lt;</button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {renderPaginationNumbers()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPageCount}
                  >
                    &gt;
                  </button>
                  <button onClick={() => handlePageChange(totalPageCount)}>
                    &gt;&gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Festival;

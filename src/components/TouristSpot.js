import "../css/TouristSpot.css";
import React, { useState, useEffect } from "react";

function TouristSpot() {
  // 1. 데이터 요청
  const [spots, setSpots] = useState([]); // 관광지 정보를 담을 상태

  // 2. 검색 기능
  const [search, setSearch] = useState(""); // 검색어 상태
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태
  const [selectedGu, setSelectedGu] = useState("전체"); // 선택된 구 상태

  // 3. 상세 정보 Modal
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달을 보여줄지 여부를 결정하는 상태

  // 4. 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 나타내는 상태
  const [spotsPerPage] = useState(15); // 페이지당 보여질 항목 수

  // 1. 데이터 요청
  const API_KEY =
    "yQzzQzErlFsJsvuWyrZcn%2F0tz74qEFUDTgzlYKKX1TWOHAxokQPgtXSqtRI8ox7mJvHXcE8ONpT5vA2KNb8YdA%3D%3D";
  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; // 대체 이미지

  const getData = async () => {
    await fetch(
      `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${API_KEY}&numOfRows=1000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&contentTypeId=12&areaCode=1`
    )
      .then((data) => data.json())
      .then((spots) => {
        const sortedSpots = spots.response.body.items.item.sort((a, b) => {
          if (a.firstimage && !b.firstimage) {
            return -1;
          } else if (!a.firstimage && b.firstimage) {
            return 1;
          }
          return 0;
        });
        setSpots(sortedSpots);
      });
  };

  // 0. Mount
  useEffect(() => {
    getData();
  }, [currentPage]);

  // 2. 검색 기능
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

  const handleSearch = (spot) => {
    setSearch(spot.target.value);
    setCurrentPage(1); // 검색 시 현재 페이지를 1로 초기화
  };

  const hadleSearchSubmit = (event) => {
    event.preventDefault();
    const searchSpots = spots.filter((spot) => spot.title.includes(search));
    setSearchResult(searchSpots);
  };

  const filterSpotsByGu = () => {
    if (selectedGu === "전체") {
      return searchResult.length > 0 ? searchResult : spots;
    } else {
      return searchResult.length > 0
        ? searchResult.filter((spot) => spot.addr1.includes(selectedGu))
        : spots.filter((spot) => spot.addr1.includes(selectedGu));
    }
  };

  const handleGuSelection = (gu) => {
    setSelectedGu(gu);
    setCurrentPage(1); // 구를 선택하면 페이지를 1로 초기화
  };

  // 3. 상세 정보 Modal
  const handleItemClick = (spot) => {
    setSelectedSpot(spot);
    setShowModal(true); // 모달 보이도록 상태 업데이트
  };

  const handleCloseModal = () => {
    setSelectedSpot(null);
    setShowModal(false); // 모달 감추도록 상태 업데이트
  };

  // 4. 페이지네이션
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // 페이지 이동 함수

  const calculatePagination = (filteredSpots) => {
    const totalItems = filteredSpots.length;
    const totalPages = Math.ceil(totalItems / spotsPerPage);

    const indexOfLastSpot = currentPage * spotsPerPage;
    const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;

    const itemsToShow = filteredSpots.slice(indexOfFirstSpot, indexOfLastSpot);

    return { totalItems, totalPages, itemsToShow };
  };

  const { totalItems, totalPages, itemsToShow } = calculatePagination(
    filterSpotsByGu()
  );

  return (
    <div className="TouristSpot">
      {/* 1. 검색 기능 */}
      <form onSubmit={hadleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="가고 싶은 관광지를 찾아보세요!"
        />
        <button type="submit">검색</button>
      </form>

      {/* 2. 각 구 선택 버튼 */}
      <div className="gu-buttons">
        {Gu.map((gu, index) => (
          <button key={index} onClick={() => handleGuSelection(gu)}>
            {gu}
          </button>
        ))}
      </div>

      {/* 3. 관광지 리스트 렌더링 */}
      {search.length > 0 && searchResult.length === 0 ? (
        <div className="search-count">
          <h3>🔎 전체 결과 : 0 개</h3>
        </div>
      ) : (
        <div>
          <div className="search-count">
            <h3>🔎 검색 결과 : {totalItems} 개</h3>
          </div>
          <ul className="spots-list">
            {itemsToShow.map((spot, index) => (
              <li
                key={index}
                className="spot-item"
                onClick={() => handleItemClick(spot)}
              >
                {spot.firstimage ? (
                  <img
                    src={spot.firstimage}
                    alt={spot.title}
                    className="spot-image"
                  />
                ) : (
                  <img
                    src={placeholderImage}
                    alt="No Image"
                    className="spot-image"
                  />
                )}
                <p>{spot.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. 상세 정보 Modal */}
      {selectedSpot && showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <h3>{selectedSpot.title}</h3>
            <h5>
              주소 : {selectedSpot.addr1} {selectedSpot.addr2}
            </h5>
            {selectedSpot.zipcode && <h5>우편번호 : {selectedSpot.zipcode}</h5>}
            {selectedSpot.firstimage && (
              <img
                src={selectedSpot.firstimage}
                alt={selectedSpot.title}
                className="spot-image"
              />
            )}
          </div>
        </div>
      )}

      {/* 5. 페이지네이션 */}
      {search.length > 0 && searchResult.length === 0 ? null : (
        <div className="pagination">
          <div className="nav-buttons">
            <button onClick={() => paginate(currentPage === 1 ? 1 : 1)}>
              &lt;&lt;
            </button>
            <button
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
            >
              &lt;
            </button>

            {Array.from(
              { length: Math.ceil(totalItems / spotsPerPage) },
              (_, i) => {
                const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
                const endPage = Math.min(
                  startPage + 4,
                  Math.ceil(totalItems / spotsPerPage)
                );
                if (i + 1 >= startPage && i + 1 <= endPage) {
                  return (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? "current" : ""}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return null;
              }
            )}

            <button
              onClick={() =>
                paginate(
                  currentPage === Math.ceil(totalItems / spotsPerPage)
                    ? currentPage
                    : currentPage + 1
                )
              }
            >
              &gt;
            </button>
            <button
              onClick={() =>
                paginate(
                  currentPage === Math.ceil(totalItems / spotsPerPage)
                    ? currentPage
                    : Math.ceil(totalItems / spotsPerPage)
                )
              }
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TouristSpot;

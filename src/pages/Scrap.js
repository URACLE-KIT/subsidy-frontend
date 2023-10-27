const Scrap = () => {
    return (
        <>
            <div classname = "container">
                <h2>스크랩 페이지</h2>
            </div>

            <ul classname = "tags">
                <li>#청년</li>
                <li>#소상공인</li>
                <li>#저소득층</li>

                <select>
                    <option value="마감일순">마감일순</option>
                    <option value="제목">제목순</option>
                </select>

                <div className="lists">
                    <h3>제목</h3>
                    <p>제목</p>
                    <p>주관</p>
                    <p>마감일</p>
                </div>
            </ul>
        </>
    );
}

export default Scrap;
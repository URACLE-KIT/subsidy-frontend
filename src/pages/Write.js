const Write = () => {
    return (
        <>
            <div classname = "container">
                <h2>후기 작성</h2>
            </div>

            <div class="post">
                <h4>게시글 제목</h4>
                <input type="text" class="post-title-input" placeholder="제목을 입력하세요" />
                <div class="post-content">
                </div>
            </div>
            <div class="post">
                <h4>내용</h4>
                <input type="text" class="post-title-input" placeholder="내용을 입력하세요" />
                <div class="post-content">
                </div>
            </div>
            <div class="post">
                <h4>사진 첨부</h4>
                <button type="button">클릭</button>
            </div>
        </>
    );
}

export default Write;
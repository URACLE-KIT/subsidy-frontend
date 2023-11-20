import React from "react";

const Download = () => {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            앱을 다운로드 해주세요!
            
            <br />

            <a
                href={process.env.PUBLIC_URL + '/보조알리미.apk'}
                download="보조알리미.apk"
                className="category-button"
            >
                다운로드
            </a>
        </div>
    );
};

export default Download;

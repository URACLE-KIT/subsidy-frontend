import React from "react";
import { FaDownload } from 'react-icons/fa';

const Download = () => {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <p>앱을 다운로드 해주세요!</p>
            
            <br />

            <a
                href={process.env.PUBLIC_URL + '/보조알리미.apk'}
                download="보조알리미.apk"
                className="download-button"
            >
                <FaDownload className="download-icon" />
                다운로드
            </a>
        </div>
    );
};

export default Download;

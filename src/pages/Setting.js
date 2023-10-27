import React from "react";
import { Link } from "react-router-dom";

const Setting = () => {
    return (
        <>
            <div classname = "container">
                <h2>설정</h2>
            </div>
            <br />
            <div className="lists">
                <h3>설정</h3>
                <table>
                <div>
                    <a href="">알림 설정</a>
                </div>
                <div>
                    <a href="">계정 연동</a>
                </div>
                </table>
                
            </div>
            <br />
            <div className="lists">
                <h3>이용 안내</h3>
                <table>
                    <div>
                        <a href="">공지사항</a>
                    </div>
                    <div>
                        <a href="">자주 묻는 질문</a>
                    </div>
                    <div>
                        <a href="">고객 문의</a>
                    </div>
                </table>
            </div>
            <br />
            <div className="lists">
                <h3>이용 정보</h3>
                <table>
                    <div>
                        <a href="">이용 약관</a>
                    </div>
                    <div>
                        <a href="">개인정보 처리방침</a>
                    </div>
                    <div>
                        <a href="">마케팅 이용동의</a>
                    </div>
                    <div>
                        <a href="">로그아웃</a>
                    </div>
                </table>
            </div>


        </>
    )
}

export default Setting;
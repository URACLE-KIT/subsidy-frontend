const Profile = () => {
  return (
    <div className="container">
      <div className="profile-field">
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" placeholder="닉네임을 입력해 주세요." value="홍길동" />
      </div>
      <div className="profile-field">
        <label htmlFor="contact">연락처</label>
        <input type="text" id="contact" placeholder="연락처를 입력해 주세요." value="010-1234-5678" />
      </div>
      <div className="profile-field">
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" value="test@user.com" disabled />
      </div>

      <button className="modify-btn">수정</button>
    </div>
  );
}

export default Profile;

import { FaTimes, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const policiesData = [
  {
    id: 1,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    startDate: "2023-10-26",
    endDate: "2023-12-31",
    category: "서비스(의료)",
    bookmarked: false,
    target: "청년 (12~26세)",
    supportBenefit: "HPV 예방접종 및 의료비 지원",
  },
];

const Modal = ({ isOpen, onClose, children }) => {
  const [policy, setPolicy] = useState(policiesData[0]);
  const [faqOpen, setFaqOpen] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const shareableLink = window.location.href;
  // const shareableLink = `${window.location.origin}/detail?id=${policy.id}`;
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = M.data.storage("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  let modalContent;

  const toggleFAQ = (index) => {
    const updatedFaqOpen = [...faqOpen];
    updatedFaqOpen[index] = !updatedFaqOpen[index];
    setFaqOpen(updatedFaqOpen);
  };

  const handleCopyLink = () => {
    const input = document.createElement("input");
    const link = shareableLink;
    input.value = link;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    M.pop.alert("링크가 복사되었습니다.");
  };

  const handleResetPassword = async () => {
    try {
      const email = resetEmail;

      const response = await axios.get(`/v1/users/find/userId?email=${email}`);
      const id = response.data.id;

      if (id) {
        const resetLink = `http://172.30.124.20:8080/reset?id=${id}`;

        const templateParams = {
          to_email: email,
          to_name: email.split("@")[0],
          reset_link: resetLink,
        };

        await emailjs.send(
          "service_6ivehyn",
          "template_fwqamhr",
          templateParams,
          "3YYSEIx_1W94_6PHN"
        );
        M.pop.alert(
          "비밀번호 재설정 링크를 전송했습니다. 메일함을 확인해주세요."
        );
      } else {
        M.pop.alert("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
      M.pop.alert("사용자를 찾을 수 없습니다.");
    }
  };

  const handleWithdrawal = async () => {
    const storedId = M.data.storage("id");
  
    try {
      await axios.delete(`/v1/users/delete?userId=${storedId}`);
  
      M.data.removeStorage();
      M.pop.alert("회원 탈퇴가 완료되었습니다.");
      navigate("/required");
    } catch (error) {
      console.error(error);
    }
  };  

  const faqItems = [
    {
      question: "1. 보조알리미는 어떤 앱인가요?",
      answer:
        "보조알리미는 사용자 맞춤 카테고리별로 보조금을 한 눈에 볼 수 있도록 하는 서비스로, 보조금을 놓치지 않고 챙겨받을 수 있도록 도와줍니다.",
    },
    {
      question: "2. 앱 이용이 잘 되지 않아요.",
      answer:
        "앱 이용에 문제가 있을 때, claphyeon@kumoh.ac.kr로 이메일을 통해 문의해주시면 답변을 받을 수 있습니다. 가능한 빠르게 도움을 드리도록 노력하겠습니다.",
    },
    {
      question: "3. 회원가입은 어떻게 하나요?",
      answer:
        "앱의 회원가입 페이지로 이동하여 필요한 정보(이름, 이메일, 비밀번호)를 입력하고 가입 버튼을 클릭하면 가입이 완료됩니다. 회원가입 이후에는 앱을 자유롭게 이용할 수 있습니다.",
    },
    {
      question: "4. 비밀번호를 잊어버렸어요. 어떻게 찾을 수 있나요?",
      answer:
        "비밀번호를 잊어버리셨다면 비밀번호 찾기 페이지로 이동하여 가입 시 사용한 이메일 주소를 입력하면, 해당 이메일 주소로 비밀번호 재설정 링크를 보내드립니다. 해당 링크를 클릭하면 새 비밀번호를 설정할 수 있습니다.",
    },
    {
      question: "5. 회원 탈퇴는 어떻게 하나요?",
      answer:
        '회원 탈퇴를 원하신다면 마이페이지 하단에 있는 "회원 탈퇴" 버튼을 클릭하십시오. 탈퇴 절차를 따라가시면 계정이 삭제됩니다. 탈퇴 후에는 관련 정보와 데이터는 복구할 수 없으니 신중히 결정해주시기 바랍니다.',
    },
  ];

  const faqContent = (
    <div>
      {faqItems.map((item, index) => (
        <div key={index} className={`faq ${faqOpen[index] ? "open" : ""}`}>
          <button className="faq" onClick={() => toggleFAQ(index)}>
            {faqOpen[index] ? <FaAngleUp /> : <FaAngleDown />}
            <p className="question">{item.question}</p>
          </button>
          {faqOpen[index] && <div className="answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );

  if (children === "개인정보 처리방침") {
    modalContent = (
      <div className="content">
        <strong>개인정보 처리방침</strong>{" "}
        <p>
          금오공과대학교 2조는 '보조알리미' 앱을 무료로 제공합니다. 이 서비스는
          금오공과대학교 2조에서 무료로 제공하며 본래의 목적대로 사용하기 위해
          제공됩니다.
        </p>{" "}
        <p>
          이 페이지는 방문자들에게 내 서비스의 개인 정보 수집, 사용 및 공개에
          관한 정책을 알리는 데 사용됩니다.
        </p>{" "}
        <p>
          서비스를 이용하려는 경우, 본 정책과 관련한 정보 수집 및 사용에
          동의하는 것으로 간주됩니다. 저는 수집한 개인 정보를 서비스 제공 및
          향상을 위해 사용합니다. 이 개인 정보를 본 개인정보 처리방침에서 설명된
          것과 동일하게 사용할 것이며, 다른 사람과 공유하지 않을 것입니다.
        </p>{" "}
        <p>
          본 개인정보 처리방침에서 사용하는 용어는 본 개인정보 처리방침에서
          정의되지 않은 한 '보조알리미' 앱의 이용 약관에서와 동일한 의미를
          가집니다.
        </p>{" "}
        <p>
          <strong>정보 수집 및 이용</strong>
        </p>{" "}
        <p>
          서비스 이용 시 사용자의 더 나은 경험을 위해 회원가입, 맞춤정보 등과
          같이 개인 식별 정보를 제공해야 할 수 있습니다. 요청한 정보는 사용자의
          기기에 유지되며, 본인이 직접 수집하지 않습니다.
        </p>{" "}
        <div>
          <p>
            앱은 사용자를 식별하는 데 사용되는 정보를 수집할 수 있는 제3자
            서비스를 사용합니다.
          </p>{" "}
          <p>앱에서 사용하는 제3자 서비스 제공업체의 개인정보 처리방침 링크</p>{" "}
          <ul>
            <li>
              <a
                href="https://www.google.com/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play 서비스
              </a>
            </li>
          </ul>
        </div>{" "}
        <p>
          <strong>로그 데이터</strong>
        </p>{" "}
        <p>
          서비스 이용 시 발생하는 앱 오류의 경우, Log Data(로그 데이터)를
          수집합니다. 이 Log Data는 사용자의 기기 IP 주소, 기기 이름, 운영 체제
          버전, 서비스 이용 시 앱 구성, 서비스 이용 시간 및 날짜, 그 외 통계
          정보와 같은 정보를 포함할 수 있습니다.
        </p>{" "}
        <p>
          <strong>쿠키</strong>
        </p>{" "}
        <p>
          쿠키는 일반적으로 익명의 고유 식별자로 사용되는 작은 데이터
          파일입니다. 이러한 쿠키는 사용자가 방문한 웹사이트에서 브라우저로
          전송되며 기기 내부 저장 공간에 저장됩니다.
        </p>{" "}
        <p>
          본 서비스는 명시적으로 이러한 "쿠키"를 사용하지 않습니다. 그러나 앱은
          정보 수집 및 서비스 개선을 위해 "쿠키"를 사용하는 제3자 코드와
          라이브러리를 사용할 수 있습니다. 쿠키를 수락 또는 거부할 수 있는
          옵션이 제공되며, 쿠키가 기기로 전송되는 경우를 알 수 있습니다. 쿠키를
          거부하려면 일부 서비스 일부를 사용할 수 없을 수 있습니다.
        </p>{" "}
        <p>
          <strong>서비스 제공자</strong>
        </p>{" "}
        <p>
          제3자 회사 및 개인을 고용하여 다음과 같은 이유로 사용할 수 있습니다:
        </p>{" "}
        <ul>
          <li>서비스 용이성 제공;</li> <li>저희를 대신하여 서비스 제공;</li>{" "}
          <li>서비스 관련 서비스 수행 또는</li>{" "}
          <li>서비스 사용 방식 분석 지원.</li>
        </ul>{" "}
        <p>
          본 서비스 사용자에게 알립니다. 이러한 제3자는 개인 정보에 액세스할 수
          있습니다. 그 이유는 저희를 대신하여 할당된 작업을 수행하기
          위해서입니다. 그러나 그들은 정보를 다른 목적으로 공개하거나 사용하지
          않도록 의무를 지니다.
        </p>{" "}
        <p>
          <strong>보안</strong>
        </p>{" "}
        <p>
          사용자로부터 개인 정보를 제공받아 신뢰를 가치 있게 생각하고 있으므로
          상업적으로 적절한 방법을 사용하여 보호하고 있습니다. 그러나, 인터넷을
          통한 전송 또는 전자 저장 방법은 100% 안전하고 신뢰성이 있는 것은
          아니며, 절대적인 보안을 보장할 수 없습니다.
        </p>{" "}
        <p>
          <strong>다른 사이트로의 링크</strong>
        </p>{" "}
        <p>
          본 서비스는 다른 사이트로의 링크를 포함할 수 있습니다. 제3자 링크를
          클릭하면 해당 사이트로 이동됩니다. 이러한 외부 사이트는 제가 운영하지
          않습니다. 따라서 해당 웹사이트의 개인 정보 처리 방침을 확인하는 것을
          강력히 권장합니다. 제가 어떠한 외부 사이트 또는 서비스의 콘텐츠, 개인
          정보 처리 방침 또는 관행을 통제하지 않으므로 어떠한 책임도 지지
          않습니다.
        </p>{" "}
        <p>
          <strong>아동의 개인 정보</strong>
        </p>{" "}
        <div>
          <p>
            본 서비스는 13세 미만의 아동을 대상으로 하지 않습니다. 13세 미만
            어린이의 개인 정보를 의도적으로 수집하지 않습니다. 13세 미만
            어린이가 개인 정보를 제공한 경우, 즉시 이를 삭제합니다. 만일 부모
            또는 보호자로서 여러분이 자녀가 개인 정보를 제공한 사실을 알고
            있다면, 저에게 연락하여 필요한 조치를 취할 수 있도록 해주십시오.
          </p>
        </div>{" "}
        <p>
          <strong>개인정보 처리방침의 변경</strong>
        </p>{" "}
        <p>
          본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 따라서 변경
          사항이 있는 경우, 새로운 개인정보 처리방침을 이 페이지에 게시함으로써
          알려드립니다.
        </p>{" "}
        <p>본 정책은 2023-10-31일부터 유효합니다.</p>{" "}
        <p>
          <strong>문의하기</strong>
        </p>{" "}
        <p>
          본 개인정보 처리방침에 관한 질문이나 제안 사항이 있으시면 언제든지
          claphyeon@kumoh.ac.kr 로 연락주십시오.
        </p>{" "}
        <p>
          본 개인정보 처리방침 페이지는{" "}
          <a
            href="https://privacypolicytemplate.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacypolicytemplate.net
          </a>
          에서 생성되었으며,{" "}
          <a
            href="https://app-privacy-policy-generator.nisrulz.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Privacy Policy Generator
          </a>
          에서 수정/생성되었습니다.
        </p>
      </div>
    );
  } else if (children === "자주 묻는 질문") {
    modalContent = <div className="content" style={{ textAlign: 'left' }}>{faqContent}</div>;
  } else if (children === "비밀번호 재설정") {
    modalContent = (
      <div className="content">
        <input
          style={{ width: "calc(100% - 40px)" }}
          placeholder="이메일 주소 입력"
          type="text"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <button style={{ margin: "0 0 20px 0" }} onClick={handleResetPassword}>
          재설정 링크 전송
        </button>
      </div>
    );
  } else if (children === "회원 탈퇴") {
    modalContent = (
      <div className="content">
        <p>정말 탈퇴하시려면 회원 탈퇴 버튼을 눌러주세요.</p>
        <button style={{ margin: "0 0 20px 0" }} onClick={handleWithdrawal}>
          회원 탈퇴
        </button>
      </div>
    );
  } else if (children === "이용 약관") {
    modalContent = (
      <div className="content">
        <p>
          이 앱을 다운로드하거나 사용하는 경우, 이 약관은 자동으로 적용됩니다.
          따라서 앱을 사용하기 전에 반드시 주의하여 읽어보시기 바랍니다. 앱,
          앱의 일부 또는 저희 상표를 어떠한 방식으로도 복사하거나 수정할 수
          없으며, 앱의 소스 코드를 추출하려 시도하거나 앱을 다른 언어로
          번역하거나 파생 버전을 만들려고 시도해서는 안 됩니다. 앱 자체 및 모든
          상표, 저작권, 데이터베이스 권리 및 기타 지적 재산권은 여전히
          금오공과대학교 2조에 속합니다.
        </p>{" "}
        <p>
          금오공과대학교 2조는 이 앱을 가능한 한 유용하고 효율적으로 만들기 위해
          노력하고 있습니다. 그러므로 언제든지 어떠한 이유로든 앱을 변경하거나
          서비스를 유료로 제공하는 권리를 보유합니다. 앱 또는 서비스에 대한
          요금을 청구할 경우, 정확히 어떤 내용에 대한 요금을 지불하는지를
          명확하게 안내하지 않는 한 앱 또는 서비스에 대한 요금을 청구하지 않을
          것입니다.
        </p>{" "}
        <p>
          보조알리미 앱은 사용자가 제공한 개인 데이터를 저장하고 처리하여
          서비스를 제공합니다. 사용자의 핸드폰과 앱에 대한 접근을 안전하게
          유지하는 것은 사용자의 책임입니다. 따라서 핸드폰의 소프트웨어 제한 및
          디바이스의 공식 운영 체제에 부과된 제한을 제거하는 프로세스인
          '젤브레이크' 또는 '루팅'을 하지 않도록 권장합니다. 이는 핸드폰을 악성
          소프트웨어/바이러스/악의적인 프로그램의 공격에 노출시킬 수 있으며
          핸드폰의 보안 기능을 손상시킬 수 있으며, 보조알리미 앱이 제대로
          작동하지 않을 수 있습니다.
        </p>{" "}
        <div>
          <p>이 앱은 자체 이용 약관을 선언하는 제3자 서비스를 사용합니다.</p>{" "}
          <p>앱에서 사용하는 제3자 서비스 제공업체의 이용 약관 링크</p>{" "}
          <ul>
            <li>
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play 서비스
              </a>
            </li>
          </ul>
        </div>{" "}
        <p>
          사용자는 반드시 알아야 할 사항이 있습니다. 앱의 특정 기능은 앱이 활성
          인터넷 연결을 가져야 합니다. 연결은 Wi-Fi로 제공될 수도 있고 사용자의
          이동통신망 제공업체에서 제공될 수도 있지만, 사용자가 Wi-Fi에
          액세스하지 않는 경우나 데이터 할당량이 남아 있지 않은 경우, 앱이
          제대로 작동하지 않을 때, 금오공과대학교 2조는 책임지지 않을 것입니다.
        </p>{" "}
        <p></p>{" "}
        <p>
          Wi-Fi 지역 외에서 앱을 사용하는 경우, 사용자의 이동통신망 제공업체와의
          계약 조건은 여전히 적용됩니다. 결과적으로 앱을 이용하면서 앱에
          액세스하는 동안 연결 기간 동안 데이터 요금 또는 기타 제3자 요금에 대한
          요금을 지불하게 될 수 있습니다. 앱을 사용함으로써 사용자는 이러한
          요금에 대한 책임을 받아들이게 되며, 데이터 로밍을 비활성화하지 않고
          본인의 거주지역(지역 또는 국가) 이외에서 앱을 사용하는 경우 로밍
          데이터 요금을 포함하여 해당 요금에 대한 책임을 받아들이게 됩니다. 앱을
          사용하는 기기의 청구서 지불자가 아닌 경우, 사용자가 앱을 사용하기 위해
          청구서 지불자의 허락을 받았다고 가정합니다.
        </p>{" "}
        <p>
          같은 원칙에 따라, 금오공과대학교 2조는 앱 사용 방법에 대한 책임을
          언제나 져야할 수 없습니다. 디바이스가 방전되어서 서비스를 이용할 수
          없게 되면, 금오공과대학교 2조는 책임을 지지 않습니다.
        </p>{" "}
        <p>
          금오공과대학교 2조는 앱의 사용에 대한 사용자의 책임에 관한 부분에 대해
          고려해야 합니다. 앱을 사용하는 동안 언제나 최신 정보가 제공되도록
          노력하지만, 사용자에게 제공할 정보를 제공하기 위해 제3자에 의존해야
          하는 경우가 있기 때문에 항상 최신 및 정확함을 보장하기 어렵습니다.
          금오공과대학교 2조는 앱의 이 기능을 완전히 의존하는 결과로 발생하는
          직간접적인 손실에 대한 책임을 지지 않습니다.
        </p>{" "}
        <p>
          언젠가 앱을 업데이트하고자 할 수 있습니다. 현재 앱은 Android에서 사용
          가능하며, 앱의 시스템 요구 사항(및 앱을 사용 가능하게 확장하기로
          결정하는 모든 추가 시스템에 대한 요구 사항)은 변경될 수 있으며 앱을
          계속 사용하려면 업데이트를 다운로드해야 할 수 있습니다. 금오공과대학교
          2조는 항상 사용자에게 앱이 사용자에게 적합하고 또는 사용자의
          디바이스에 설치된 Android 버전과 작동하는 것을 약속하지 않습니다.
          그러나 사용자에게 애플리케이션의 업데이트를 항상 수락하도록
          약속합니다. 또한 앱 제공을 중단하고 언제든지 사용을 종료하고 사전 통보
          없이 사용을 종료할 수도 있습니다. 약관에 반대 사항이 없는 한, 종료 시
          (a) 본 약관에 따라 귀하에게 부여된 권리 및 라이센스가 종료됩니다. (b)
          귀하는 앱 사용을 중지하고(필요한 경우) 디바이스에서 앱을 삭제해야
          합니다.
        </p>{" "}
        <p>
          <strong>본 이용 약관의 변경 사항</strong>
        </p>{" "}
        <p>
          본 이용 약관을 수시로 업데이트할 수 있습니다. 따라서 변경 사항이 있는
          경우, 새로운 이용 약관을 이 페이지에 게시함으로써 알려드립니다.
        </p>{" "}
        <p>본 이용 약관은 2023-10-31일부터 유효합니다.</p>{" "}
        <p>
          <strong>문의하기</strong>
        </p>{" "}
        <p>
          이용 약관에 관한 질문이나 제안 사항이 있으시면 언제든지
          claphyeon@kumoh.ac.kr 로 연락하십시오.
        </p>{" "}
        <p>
          본 이용 약관 페이지는{" "}
          <a
            href="https://app-privacy-policy-generator.nisrulz.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Privacy Policy Generator
          </a>
          에 의해 생성되었습니다.
        </p>
      </div>
    );
  } else if (children === "공유하기") {
    modalContent = (
      <div className="content">
        <div className="copy" onClick={() => handleCopyLink(shareableLink)}>
          {shareableLink}
        </div>
      </div>
    );
  } else {
    modalContent = null;
  }

  return (
    <>
      <div className="blur" />
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>{children}</h3>
        {modalContent}
      </div>
    </>
  );
};

export default Modal;

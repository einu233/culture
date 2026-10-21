/**
 * 문화체육관광부 대중문화산업과 웹앱 인터랙션 스크립트 (app.js)
 * 순수 바닐라 자바스크립트 (No framework, Local file friendly)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCounterAnimation();
  initTabNavigation();
  initAccordion();
  initSupportChecker();
});

/* 1. 다크/라이트 테마 토글 (로컬스토리지 보존) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('mcst_theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️ 라이트';
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.textContent = '🌓 모드';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('mcst_theme', 'light');
      toggleBtn.textContent = '🌓 다크';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('mcst_theme', 'dark');
      toggleBtn.textContent = '☀️ 라이트';
    }
  });
}

/* 2. 히어로 숫자 카운트업 애니메이션 */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const runAnimation = () => {
    statNumbers.forEach(numEl => {
      const target = +numEl.getAttribute('data-target');
      const duration = 1200; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          numEl.textContent = target;
          clearInterval(timer);
        } else {
          numEl.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };

  runAnimation();
}

/* 3. 주요 업무 탭 전환 */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // 탭 버튼 active 클래스 토글
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 탭 패널 active 토글
      panes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* 4. 아코디언 (국민 FAQ) */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // 다른 열린 아코디언 닫기
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 5. 1분 상식 퀴즈 검증 함수 (전역 노출) */
window.checkQuiz = function(index) {
  const resultEl = document.getElementById('quizResult');
  const buttons = document.querySelectorAll('.quiz-btn');

  // 버튼 스타일 초기화
  buttons.forEach(btn => {
    btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    btn.style.background = 'rgba(255, 255, 255, 0.08)';
  });

  resultEl.style.display = 'block';

  if (index === 2) {
    // 정답 (3번 프로스포츠 운영은 체육국/스포츠산업과 소관)
    buttons[index].style.borderColor = '#10B981';
    buttons[index].style.background = 'rgba(16, 185, 129, 0.2)';
    resultEl.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
    resultEl.style.color = '#6EE7B7';
    resultEl.innerHTML = '🎉 <strong>정답입니다!</strong> 프로야구·프로축구 등 프로스포츠는 체육국(스포츠산업과) 소관 업무이며, <strong>대중문화산업과는 K-POP, 만화/웹툰, 대중문화예술기획업 및 패션산업</strong>을 총괄 육성합니다!';
  } else {
    // 오답
    buttons[index].style.borderColor = '#EF4444';
    buttons[index].style.background = 'rgba(239, 68, 68, 0.2)';
    resultEl.style.backgroundColor = 'rgba(239, 68, 68, 0.25)';
    resultEl.style.color = '#FCA5A5';
    resultEl.innerHTML = '❌ <strong>아쉽네요!</strong> 선택하신 항목은 대중문화산업과의 핵심 소관 정책입니다. 정답은 <strong>3번(프로스포츠 운영)</strong>입니다!';
  }
};

/* ===================================================
   6. [신규 기능] 나는 어떤 도움을 받을 수 있을까? (Support Checker)
   =================================================== */

// 역할별 체크리스트 질문 및 맞춤형 지원 데이터
const SUPPORT_DATABASE = {
  trainee_artist: {
    roleTitle: "가수·배우 지망생 / 연습생 / 연예인",
    roleDesc: "기획사와의 불공정 계약 방지, 청소년 기본 인권 보호, 법률/심리 케어 지원",
    questions: [
      { id: "art_q1", label: "기획사와 전속계약서를 쓰는데 불리하거나 과도한 위약금 조항이 걱정돼요." },
      { id: "art_q2", label: "청소년/미성년자 연습생이라 야간 활동과 학교 수업(학습권) 보장을 받고 싶어요." },
      { id: "art_q3", label: "불공정 계약 관행이나 정산 미지급 등으로 분쟁이 생겨 무료 법률 상담이 필요해요." },
      { id: "art_q4", label: "불안, 우울, 심리적 스트레스를 극복하기 위한 전문 심리상담을 받고 싶어요." }
    ],
    benefits: [
      {
        title: "문체부 고시 '대중문화예술인 표준전속계약서' 제공",
        badge: "법률 보호",
        desc: "불공정한 장기 계약, 과도한 위약벌 조항을 원천 차단하고 계약 해지 및 정산 기준을 투명하게 규정한 정부 공식 표준계약서를 무료로 다운로드하고 활용할 수 있습니다.",
        actionText: "문체부 표준계약서 안내 바로가기",
        actionUrl: "https://www.mcst.go.kr"
      },
      {
        title: "청소년 대중문화예술인 학습권·휴식권 법적 보호",
        badge: "인권 안전망",
        desc: "밤 10시~오전 6시 야간 활동 원칙적 제한 및 주당 활동 시간 상한선 등 '대중문화예술산업발전법'에 따른 청소년 권익보호 제도의 직접적 보호를 받습니다.",
        actionText: "청소년 권익보호 지침 확인",
        actionUrl: "https://www.korea.kr"
      },
      {
        title: "대중문화예술인지원센터 1:1 법률·회계 무료 상담",
        badge: "무료 서비스",
        desc: "변호사, 공인회계사 등 전문 인력이 계약서 사전 검토 및 정산 분쟁에 대한 1:1 비밀 보장 무료 상담 서비스를 상시 지원합니다.",
        actionText: "콘텐츠 공정상생센터(1566-1114) 연결",
        actionUrl: "https://www.kocca.kr"
      },
      {
        title: "대중문화예술인 전문 심리상담 지원 프로그램",
        badge: "복지 지원",
        desc: "스포트라이트와 악플, 불안정한 신분으로 고통받는 예술인과 연습생을 위해 국가가 전문 심리상담 비용을 전액 지원합니다.",
        actionText: "예술인 복지 지원 안내",
        actionUrl: "https://www.culture.go.kr"
      }
    ]
  },

  creator: {
    roleTitle: "웹툰·만화 작가 / 작사가·작곡가",
    roleDesc: "원천 IP 창작 지원, 2차 사업화 비즈매칭, 불공정 유통 방지",
    questions: [
      { id: "cre_q1", label: "웹툰/스토리 IP를 영상, 애니메이션, 게임으로 확장(2차 사업화)하고 싶어요." },
      { id: "cre_q2", label: "플랫폼 또는 에이전시와의 수익 배분(RS) 및 저작권 양도 계약이 불공정하다고 느껴져요." },
      { id: "cre_q3", label: "신인 작가/창작자로서 안정적인 창작 공간이나 전문가 멘토링이 필요해요." },
      { id: "cre_q4", label: "내 작품이 해외 불법 웹툰/음원 사이트에 무단 복제되어 피해를 보고 있어요." }
    ],
    benefits: [
      {
        title: "만화·웹툰 원천 IP 글로벌 비즈매칭 & 영상화 지원",
        badge: "사업화 지원",
        desc: "국내외 방송사, 영화 제작사, 게임 개발사와의 B2B 투자 마켓 참가 기회 및 피칭 바우처를 제공하여 작품의 가치를 극대화합니다.",
        actionText: "KOCCA 스토리비즈 연계 신청",
        actionUrl: "https://www.kocca.kr"
      },
      {
        title: "웹툰 분야 공정 표준계약서 7종 보급",
        badge: "공정 상생",
        desc: "수익 배분 기준 명시, 2차 저작물 작성권 작가 우선권 보장 등 창작자의 권리를 실질적으로 보호하는 표준계약서를 지원합니다.",
        actionText: "표준계약서 상세 확인",
        actionUrl: "https://www.mcst.go.kr"
      },
      {
        title: "창의인재 동반사업 및 창작 아카데미 지원",
        badge: "인재 양성",
        desc: "현업 정상급 멘토의 1:1 밀착 코칭과 월 창작지원금을 제공하여 차세대 스타 작가로 발돋움하도록 집중 육성합니다.",
        actionText: "창의인재 지원사업 공고",
        actionUrl: "https://www.culture.go.kr"
      },
      {
        title: "해외 불법 복제 사이트 신속 차단 및 저작권 침해 대응",
        badge: "저작권 수호",
        desc: "문체부 특별사법경찰과 저작권보호원이 공조하여 불법 스트리밍 및 웹툰 유통 사이트를 단속하고 접속 차단을 조치합니다.",
        actionText: "불법 복제 신고센터 바로가기",
        actionUrl: "https://www.mcst.go.kr"
      }
    ]
  },

  business: {
    roleTitle: "기획사 대표 / 제작사 / 콘텐츠 스타트업",
    roleDesc: "기획업 적법 등록 지원, K-POP 해외 진출 바우처, 정책 금융 펀드 연계",
    questions: [
      { id: "biz_q1", label: "신규 연예기획사를 창업하려는데 대중문화예술기획업 등록 절차와 필수 교육이 궁금해요." },
      { id: "biz_q2", label: "소속 아티스트의 신규 음반 제작비 및 글로벌 투어/쇼케이스 해외 진출 지원을 받고 싶어요." },
      { id: "biz_q3", label: "뮤직비디오를 빠르게 발매하기 위해 자체등급분류 사업자 지정을 받고 싶어요." },
      { id: "biz_q4", label: "스케일업을 위한 대규모 문화산업 정책 펀드(모태펀드) 투자 유치가 필요해요." }
    ],
    benefits: [
      {
        title: "대중문화예술기획업 등록 요건 가이드 및 법정 교육",
        badge: "행정 지원",
        desc: "합법적인 엔터테인먼트 사업 운영을 위한 필수 등록 절차(경력 산정 및 사전 의무 교육)를 행정적으로 안내하고 지원합니다.",
        actionText: "정부24 기획업 등록 신청",
        actionUrl: "https://www.gov.kr"
      },
      {
        title: "중소기획사 대중음악 해외 진출 및 음반 제작 지원",
        badge: "자금 지원",
        desc: "대형 기획사에 비해 자본이 부족한 유망 중소형 제작사를 대상으로 글로벌 페스티벌 참가 및 음반 제작 바우처를 지급합니다.",
        actionText: "대중음악 지원사업 공고 확인",
        actionUrl: "https://www.kocca.kr"
      },
      {
        title: "뮤직비디오 자체등급분류 사업자 제도 활용",
        badge: "규제 혁신",
        desc: "영등위 심의 대기 없이 기획사/플랫폼이 직접 등급을 분류하여 글로벌 음원 동시 발매의 골든타임을 확보할 수 있습니다.",
        actionText: "음악산업법 개정 가이드라인",
        actionUrl: "https://www.mcst.go.kr"
      },
      {
        title: "K-콘텐츠 IP 펀드 및 문화산업 완성보증 지원",
        badge: "정책 금융",
        desc: "신보·기보와 연계한 대출 보증 및 모태펀드 문화계정을 통해 유망 콘텐츠 프로젝트에 집중 투자를 연계합니다.",
        actionText: "정책브리핑 금융지원 안내",
        actionUrl: "https://www.korea.kr"
      }
    ]
  },

  citizen: {
    roleTitle: "일반 국민 / K-컬처 팬 / 학부모",
    roleDesc: "암표 근절 및 공정 예매, 자녀의 연예 활동 사기 피해 예방, 건전한 대중문화 여가",
    questions: [
      { id: "cit_q1", label: "인기 콘서트 티켓 예매 시 매크로 프로그램을 이용한 암표 거래를 근절하고 싶어요." },
      { id: "cit_q2", label: "자녀가 연예기획사 캐스팅 제안을 받았는데 정상 등록된 안전한 업체인지 확인하고 싶어요." },
      { id: "cit_q3", label: "가족과 함께 안전하고 쾌적하게 즐길 수 있는 대형 공연장·여가 인프라가 확충되었으면 해요." },
      { id: "cit_q4", label: "노래연습장 이용 및 문화 시설 이용에 관한 건전한 제도와 수수료 기준이 궁금해요." }
    ],
    benefits: [
      {
        title: "공연법 개정에 따른 매크로 부정판매(암표) 강력 단속 및 신고 포상",
        badge: "소비자 보호",
        desc: "매크로 프로그램을 이용해 입장권을 부정 판매하는 행위를 전면 금지하며, 문체부 암표통합신고센터를 통해 제보 및 처벌을 진행합니다.",
        actionText: "공연 암표 신고센터 안내",
        actionUrl: "https://www.culture.go.kr"
      },
      {
        title: "정식 등록 대중문화예술기획업체 대국민 공개 조회",
        badge: "사기 예방",
        desc: "미등록 불법 기획사의 길거리 캐스팅 사기 피해를 예방할 수 있도록, 지자체에 적법하게 등록된 정식 엔터테인먼트 기획사 명단을 온라인으로 실시간 조회할 수 있습니다.",
        actionText: "정식 등록 기획사 검색하기",
        actionUrl: "https://www.mcst.go.kr"
      },
      {
        title: "대형 K-POP 전문 공연장(아레나) 확충 정책",
        badge: "문화 인프라",
        desc: "국민과 국내외 팬들이 날씨와 시야 방해 없이 최고의 음향으로 콘서트를 관람할 수 있도록 체육시설의 대중음악 공연 설비 현대화를 추진 중입니다.",
        actionText: "공연 인프라 정책 확인",
        actionUrl: "https://www.korea.kr"
      },
      {
        title: "건전한 여가 문화 및 노래연습장업 제도 개선",
        badge: "여가 안전",
        desc: "청소년 출입 시간 관리 및 주류 판매 금지 등 온 가족이 안심하고 이용할 수 있는 여가 환경을 지속 정비합니다.",
        actionText: "관련 법령 및 국민 안내",
        actionUrl: "https://www.gov.kr"
      }
    ]
  }
};

function initSupportChecker() {
  const roleCards = document.querySelectorAll('.role-card');
  const checklistContainer = document.getElementById('checklistOptions');
  const btnFind = document.getElementById('btnFindSupport');
  const resultBox = document.getElementById('surveyResultBox');
  const resultRoleTitle = document.getElementById('resultRoleTitle');
  const resultRoleDesc = document.getElementById('resultRoleDesc');
  const resultCardsList = document.getElementById('resultCardsList');

  let currentRole = "trainee_artist";

  // 체크리스트 렌더링 함수
  function renderChecklist(roleKey) {
    const data = SUPPORT_DATABASE[roleKey];
    if (!data) return;

    checklistContainer.innerHTML = '';
    data.questions.forEach((q, idx) => {
      const label = document.createElement('label');
      label.className = `check-item ${idx === 0 || idx === 1 ? 'checked' : ''}`;
      label.innerHTML = `
        <input type="checkbox" name="supportCheck" value="${idx}" ${idx === 0 || idx === 1 ? 'checked' : ''}>
        <span>${q.label}</span>
      `;

      // 체크 시 시각적 하이라이트
      const checkbox = label.querySelector('input');
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          label.classList.add('checked');
        } else {
          label.classList.remove('checked');
        }
      });

      checklistContainer.appendChild(label);
    });
  }

  // 초기 렌더링
  renderChecklist(currentRole);

  // 역할 라디오 선택 이벤트
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      radio.checked = true;
      currentRole = radio.value;

      renderChecklist(currentRole);
      resultBox.style.display = 'none'; // 역할 변경 시 이전 결과 닫기
    });
  });

  // '나에게 맞는 문체부 지원 혜택 확인하기' 버튼 클릭
  btnFind.addEventListener('click', () => {
    const data = SUPPORT_DATABASE[currentRole];
    if (!data) return;

    const checkedInputs = document.querySelectorAll('input[name="supportCheck"]:checked');
    let selectedIndices = Array.from(checkedInputs).map(cb => parseInt(cb.value, 10));

    // 아무것도 체크하지 않은 경우 전체 혜택 노출
    if (selectedIndices.length === 0) {
      selectedIndices = [0, 1, 2, 3];
    }

    resultRoleTitle.textContent = `[${data.roleTitle}] 맞춤 지원 리포트`;
    resultRoleDesc.textContent = `${data.roleDesc} - 선택하신 관심 항목에 최적화된 ${selectedIndices.length}개의 정부 지원 프로그램을 안내합니다.`;

    resultCardsList.innerHTML = '';
    selectedIndices.forEach(idx => {
      const benefit = data.benefits[idx];
      if (!benefit) return;

      const card = document.createElement('div');
      card.className = 'res-benefit-card';
      card.innerHTML = `
        <div class="res-benefit-head">
          <h4 class="res-benefit-title">${benefit.title}</h4>
          <span class="res-badge">${benefit.badge}</span>
        </div>
        <p class="res-benefit-desc">${benefit.desc}</p>
        <div class="res-benefit-action">
          <span class="res-dept-tag">소관: 문화체육관광부 대중문화산업과</span>
          <a href="${benefit.actionUrl}" target="_blank" rel="noopener noreferrer" class="res-action-btn">
            ${benefit.actionText} ↗
          </a>
        </div>
      `;
      resultCardsList.appendChild(card);
    });

    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}


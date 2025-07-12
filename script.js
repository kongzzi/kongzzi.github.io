// 페이지 로드 시 애니메이션 효과
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 시 요소들이 나타나는 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 관찰할 요소들
    const elementsToObserve = document.querySelectorAll('.link-card, .skill-item, .timeline-item, .portfolio-item');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 프로필 이미지 클릭 효과
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
        });
    }

    // 링크 카드 호버 효과 개선
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 스킬 아이템 호버 효과 개선
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 스크롤 시 헤더 배경 투명도 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0.8, 1 - scrolled / 500);
        header.style.background = `rgba(255, 255, 255, ${opacity})`;
    });

    // 부드러운 스크롤 효과
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        const linkCards = document.querySelectorAll('.link-card');
        const currentIndex = Array.from(linkCards).findIndex(card => card === document.activeElement);
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % linkCards.length;
                linkCards[nextIndex].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? linkCards.length - 1 : currentIndex - 1;
                linkCards[prevIndex].focus();
                break;
        }
    });

    // 로딩 완료 메시지
    console.log('홍길동님의 개인 웹페이지가 성공적으로 로드되었습니다! 🚀');
});

// 다크 모드 토글 기능 (선택사항)
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // 로컬 스토리지에 설정 저장
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// 페이지 로드 시 다크 모드 설정 복원
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}

// 성능 최적화: 이미지 지연 로딩
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 뷰포트 크기 변경 시 레이아웃 조정
window.addEventListener('resize', function() {
    // 필요한 경우 레이아웃 재조정 로직 추가
    console.log('뷰포트 크기가 변경되었습니다:', window.innerWidth, 'x', window.innerHeight);
});

// 접근성 개선: 포커스 표시
document.addEventListener('focusin', function(e) {
    if (e.target.classList.contains('link-card') || e.target.classList.contains('skill-item')) {
        e.target.style.outline = '2px solid #667eea';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.classList.contains('link-card') || e.target.classList.contains('skill-item')) {
        e.target.style.outline = 'none';
    }
}); 
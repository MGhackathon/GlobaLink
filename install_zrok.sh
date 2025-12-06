#!/bin/bash

# zrok Linux 버전 다운로드 및 설치
echo "zrok 다운로드 중..."

# 최신 버전의 zrok Linux 버전 다운로드
cd /tmp
wget https://github.com/openziti/zrok/releases/download/v1.1.10/zrok_1.1.10_linux_amd64.tar.gz

# 압축 해제
echo "압축 해제 중..."
tar -xzf zrok_1.1.10_linux_amd64.tar.gz

# /usr/local/bin으로 이동 (시스템 전역에서 사용 가능)
echo "설치 중..."
sudo mv zrok /usr/local/bin/

# 실행 권한 부여
sudo chmod +x /usr/local/bin/zrok

# 설치 확인
echo "설치 완료! 버전 확인:"
zrok version

echo ""
echo "✅ zrok 설치가 완료되었습니다!"
echo "이제 'zrok' 명령어를 사용할 수 있습니다."
echo ""
echo "다음 단계:"
echo "1. zrok enable <token> - zrok 계정 활성화"
echo "2. tmux - tmux 세션 시작"

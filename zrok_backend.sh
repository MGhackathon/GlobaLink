#!/bin/bash

# GlobaLink 백엔드 + zrok 세션 스크립트
# 사용법: bash zrok_backend.sh

SESSION_NAME="globalink"
BACKEND_PORT=5000  # Flask 기본 포트

echo "🌍 GlobaLink tmux + zrok 세션 시작"
echo ""

# 백엔드 디렉토리 확인
if [ ! -d "backend" ]; then
    echo "❌ backend 디렉토리를 찾을 수 없습니다."
    echo "현재 위치에서 실행해주세요: /mnt/c/Users/do713/GlobaLink/GlobaLink"
    exit 1
fi

# tmux 세션 생성
tmux new-session -d -s $SESSION_NAME -n 'backend'

# 첫 번째 창: 백엔드 서버
tmux send-keys -t $SESSION_NAME:backend "cd backend" C-m
tmux send-keys -t $SESSION_NAME:backend "echo '📦 Python 가상환경 활성화 및 서버 시작'" C-m
tmux send-keys -t $SESSION_NAME:backend "# source venv/bin/activate  # 가상환경이 있다면" C-m
tmux send-keys -t $SESSION_NAME:backend "# python app.py" C-m

# 두 번째 창: zrok share
tmux new-window -t $SESSION_NAME -n 'zrok'
tmux send-keys -t $SESSION_NAME:zrok "echo '⏳ 백엔드 서버가 시작되면 zrok share를 실행하세요:'" C-m
tmux send-keys -t $SESSION_NAME:zrok "echo 'zrok share public localhost:$BACKEND_PORT --headless'" C-m
tmux send-keys -t $SESSION_NAME:zrok "echo ''" C-m
tmux send-keys -t $SESSION_NAME:zrok "# 자동 실행하려면 아래 주석 해제:" C-m
tmux send-keys -t $SESSION_NAME:zrok "# sleep 5 && zrok share public localhost:$BACKEND_PORT" C-m

# 세 번째 창: 프론트엔드 (선택사항)
tmux new-window -t $SESSION_NAME -n 'frontend'
tmux send-keys -t $SESSION_NAME:frontend "cd frontend" C-m
tmux send-keys -t $SESSION_NAME:frontend "echo '🎨 프론트엔드 서버 (선택사항)'" C-m
tmux send-keys -t $SESSION_NAME:frontend "# npm run dev" C-m

# 네 번째 창: 모니터링/로그
tmux new-window -t $SESSION_NAME -n 'monitor'
tmux send-keys -t $SESSION_NAME:monitor "echo '📊 시스템 모니터링'" C-m
tmux send-keys -t $SESSION_NAME:monitor "zrok status" C-m

# 첫 번째 창으로 이동
tmux select-window -t $SESSION_NAME:backend

echo "✅ tmux 세션 '$SESSION_NAME' 생성 완료!"
echo ""
echo "📌 세션 구조:"
echo "   창 0: backend  - 백엔드 서버"
echo "   창 1: zrok     - zrok share"
echo "   창 2: frontend - 프론트엔드 (선택사항)"
echo "   창 3: monitor  - 모니터링"
echo ""
echo "📌 명령어:"
echo "   Ctrl+B, 0-3     # 창 전환"
echo "   Ctrl+B, D       # 세션에서 나가기"
echo "   tmux attach -t $SESSION_NAME  # 다시 연결"
echo ""

# 세션 연결
tmux attach-session -t $SESSION_NAME

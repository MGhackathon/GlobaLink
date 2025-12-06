#!/bin/bash

# GlobaLink 프론트엔드 + zrok 세션 스크립트
# 사용법: bash frontend_zrok.sh

SESSION_NAME="globalink"
FRONTEND_PORT=5173  # Vite 기본 포트

echo "🌍 GlobaLink Frontend + zrok 세션 시작"
echo ""

# 프론트엔드 디렉토리 확인
if [ ! -d "frontend" ]; then
    echo "❌ frontend 디렉토리를 찾을 수 없습니다."
    echo "현재 위치: $(pwd)"
    echo "올바른 위치에서 실행해주세요: /mnt/c/Users/do713/GlobaLink/GlobaLink"
    exit 1
fi

# tmux 세션 생성
tmux new-session -d -s $SESSION_NAME -n 'frontend'

# 첫 번째 창: 프론트엔드 서버
tmux send-keys -t $SESSION_NAME:frontend "cd frontend" C-m
tmux send-keys -t $SESSION_NAME:frontend "echo '🎨 프론트엔드 서버 시작 중...'" C-m
tmux send-keys -t $SESSION_NAME:frontend "npm run dev" C-m

# 두 번째 창: zrok share
tmux new-window -t $SESSION_NAME -n 'zrok'
tmux send-keys -t $SESSION_NAME:zrok "echo '⏳ 프론트엔드 서버가 시작될 때까지 대기 중...'" C-m
tmux send-keys -t $SESSION_NAME:zrok "echo ''" C-m
tmux send-keys -t $SESSION_NAME:zrok "sleep 5" C-m
tmux send-keys -t $SESSION_NAME:zrok "echo '🚀 zrok share 시작!'" C-m
tmux send-keys -t $SESSION_NAME:zrok "zrok share public localhost:$FRONTEND_PORT --headless" C-m

# 세 번째 창: 모니터링
tmux new-window -t $SESSION_NAME -n 'monitor'
tmux send-keys -t $SESSION_NAME:monitor "echo '📊 시스템 모니터링'" C-m
tmux send-keys -t $SESSION_NAME:monitor "echo ''" C-m
tmux send-keys -t $SESSION_NAME:monitor "echo '프론트엔드: http://localhost:$FRONTEND_PORT'" C-m
tmux send-keys -t $SESSION_NAME:monitor "echo ''" C-m
tmux send-keys -t $SESSION_NAME:monitor "zrok status" C-m

# 첫 번째 창으로 이동
tmux select-window -t $SESSION_NAME:frontend

echo "✅ tmux 세션 '$SESSION_NAME' 생성 완료!"
echo ""
echo "📌 세션 구조:"
echo "   창 0: frontend - Vite 개발 서버 (포트 $FRONTEND_PORT)"
echo "   창 1: zrok     - zrok share (공개 URL 생성)"
echo "   창 2: monitor  - 상태 모니터링"
echo ""
echo "📌 tmux 단축키:"
echo "   Ctrl+B, 0-2    # 창 전환"
echo "   Ctrl+B, D      # 세션에서 나가기 (백그라운드 실행)"
echo "   Ctrl+B, &      # 창 닫기"
echo ""
echo "📌 다시 연결:"
echo "   tmux attach -t $SESSION_NAME"
echo ""
echo "📌 세션 종료:"
echo "   tmux kill-session -t $SESSION_NAME"
echo ""
echo "🔗 zrok 공개 URL은 'zrok' 창에서 확인하세요!"
echo ""

# 세션 연결
tmux attach-session -t $SESSION_NAME

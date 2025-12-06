#!/bin/bash

# 간단한 프론트엔드 + zrok 실행 스크립트 (2개 창만)
# 사용법: bash start_frontend.sh

SESSION="globalink"

echo "🚀 GlobaLink 시작..."

# tmux 세션 생성 - 프론트엔드
tmux new-session -d -s $SESSION -n 'dev'
tmux send-keys -t $SESSION:dev "cd frontend && npm run dev" C-m

# zrok 창
tmux new-window -t $SESSION -n 'zrok'
tmux send-keys -t $SESSION:zrok "sleep 5 && zrok share public localhost:5173" C-m

# 첫 번째 창 선택
tmux select-window -t $SESSION:dev

echo "✅ 시작 완료!"
echo ""
echo "Ctrl+B, 0  → 프론트엔드 개발 서버"
echo "Ctrl+B, 1  → zrok 공개 URL"
echo "Ctrl+B, D  → 세션 나가기"
echo ""

tmux attach-session -t $SESSION

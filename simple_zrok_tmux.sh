#!/bin/bash

# 간단한 tmux + zrok 세션 생성 스크립트
# 사용법: bash simple_zrok_tmux.sh

echo "🚀 tmux + zrok 세션 시작"
echo ""

# tmux 세션 생성 및 연결
tmux new-session -d -s zrok "echo '서버를 시작하세요 (예: cd backend && python app.py)'"

# 새 창 생성: zrok share
tmux new-window -t zrok -n 'zrok-share' "echo 'zrok share 명령을 실행하세요:'; echo 'zrok share public localhost:PORT'; bash"

# 새 창 생성: 모니터링
tmux new-window -t zrok -n 'monitor' "zrok status; bash"

# 첫 번째 창으로 이동
tmux select-window -t zrok:0

echo "✅ tmux 세션 'zrok' 생성 완료!"
echo ""

# 세션 연결
tmux attach-session -t zrok

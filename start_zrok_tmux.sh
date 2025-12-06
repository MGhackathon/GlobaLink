#!/bin/bash

# tmux + zrok 세션 생성 스크립트
# 사용법: bash start_zrok_tmux.sh <session-name> <port>

SESSION_NAME=${1:-"zrok-session"}
PORT=${2:-8080}

echo "🚀 tmux 세션 생성: $SESSION_NAME"
echo "📡 zrok 포트: $PORT"
echo ""

# tmux 세션이 이미 존재하는지 확인
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    echo "⚠️  세션 '$SESSION_NAME'이 이미 존재합니다."
    echo "기존 세션에 연결하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        tmux attach-session -t $SESSION_NAME
        exit 0
    else
        echo "새로운 세션 이름을 입력하세요:"
        read -r SESSION_NAME
    fi
fi

# 새 tmux 세션 생성 (detached 모드)
tmux new-session -d -s $SESSION_NAME

# 창 이름 설정
tmux rename-window -t $SESSION_NAME:0 'zrok-main'

# 첫 번째 패널: 애플리케이션 실행 (예: 웹 서버)
tmux send-keys -t $SESSION_NAME:0 "echo '📦 애플리케이션을 실행하세요. 예: python -m http.server $PORT'" C-m

# 수평 분할: zrok share 실행
tmux split-window -h -t $SESSION_NAME:0
tmux send-keys -t $SESSION_NAME:0.1 "echo '⏳ 잠시 후 zrok share를 실행합니다...'" C-m
tmux send-keys -t $SESSION_NAME:0.1 "sleep 3" C-m
tmux send-keys -t $SESSION_NAME:0.1 "zrok share public localhost:$PORT" C-m

# 수직 분할 추가: 로그/모니터링
tmux split-window -v -t $SESSION_NAME:0.0
tmux send-keys -t $SESSION_NAME:0.2 "echo '📊 모니터링 패널'" C-m
tmux send-keys -t $SESSION_NAME:0.2 "zrok status" C-m

# 레이아웃 조정
tmux select-layout -t $SESSION_NAME:0 main-vertical

# 첫 번째 패널로 포커스
tmux select-pane -t $SESSION_NAME:0.0

echo ""
echo "✅ tmux 세션 '$SESSION_NAME' 생성 완료!"
echo ""
echo "📌 명령어:"
echo "   tmux attach -t $SESSION_NAME     # 세션 연결"
echo "   Ctrl+B, D                        # 세션에서 나가기 (detach)"
echo "   tmux kill-session -t $SESSION_NAME  # 세션 종료"
echo ""
echo "🔧 tmux 단축키:"
echo "   Ctrl+B, \"   # 가로 분할"
echo "   Ctrl+B, %   # 세로 분할"
echo "   Ctrl+B, 방향키  # 패널 이동"
echo "   Ctrl+B, x   # 패널 닫기"
echo ""

# 세션에 자동 연결
tmux attach-session -t $SESSION_NAME

#!/bin/bash

SESSION_NAME="towelie_dev-Development"

# Check if the session already exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "Session "$SESSION_NAME" already exists. Attaching to it."
    tmux attach-session -t "$SESSION_NAME"
else
    # Create a new session and name it
    tmux new-session -d -s "$SESSION_NAME"

    # Editor
    tmux rename-window -t 1 'Editor'
    tmux send-keys -t 1 'cd projects/towelie.dev' C-m
    tmux send-keys -t 1 'vim' C-m

    # Next dev server
    tmux new-window -t "$SESSION_NAME:2" -n 'Next.js'
    tmux send-keys -t 2 'cd projects/towelie.dev' C-m
    tmux send-keys -t 2 'pnpm dev' C-m

    # Prisma studio
    tmux new-window -t "$SESSION_NAME:3" -n 'Primsa'
    tmux send-keys -t 3 'cd projects/towelie.dev' C-m
    tmux send-keys -t 3 'npx prisma studio' C-m

    # Select the first window
    tmux select-window -t "$SESSION_NAME:1"

    # Attach to the created session
    tmux attach-session -t "$SESSION_NAME"

fi

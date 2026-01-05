# frozen_string_literal: true

# =========================
# Environment
# =========================
environment ENV.fetch("RAILS_ENV", "production")

# =========================
# Threads
# =========================
max_threads_count = Integer(ENV.fetch("RAILS_MAX_THREADS", 5))
min_threads_count = Integer(ENV.fetch("RAILS_MIN_THREADS", max_threads_count))
threads min_threads_count, max_threads_count

# =========================
# Bind / Port
# =========================
bind "tcp://127.0.0.1:3000"

# =========================
# Workers
# =========================
workers Integer(ENV.fetch("WEB_CONCURRENCY", 1))
preload_app!

# =========================
# Paths
# =========================
pidfile ENV.fetch("PIDFILE", "tmp/pids/puma.pid")
state_path ENV.fetch("STATE_PATH", "tmp/pids/puma.state")

stdout_redirect "log/puma.stdout.log", "log/puma.stderr.log", true

# =========================
# Worker boot
# =========================
on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
end
import sys, time

# prevents an infinite loop
MAX_STEPS = 20000
MAX_SECONDS = 3.0

# 변수를 보기 좋게 바꾸는 함수 : to improve readability 
def _pretty(v, d=0):
  
  if d > 3:
    return repr(v)
  
  # if Primitive data types just return it
  if isinstance(v, (int, float, str, bool, type(None))):
    return v
  
  # if tuple or list, recursively return their elements
  if isinstance(v, (list, tuple)):
    return [_pretty(x, d + 1) for x in v]
  
  # dict -> key: value
  if isinstance(v, dict):
    return {str(k):_pretty(v[k], d+1) for k in v}
  
  # Leetcode Linked list style
  if hasattr(v, "val") and hasattr(v, "next"):
        out = []
        cur = v
        c = 0
        # 연결 리스트를 순회하며 각 노드의 val을 모은다
        while cur and c < 100:
            out.append(cur.val)
            cur = cur.next
            c += 1
        return {"ListNode": out}
  
  # Leetcode TreeNode 
  if hasattr(v, "val") and hasattr(v, "left") and hasattr(v, "right"):
        def ser(t, depth=0):
            if t is None or depth > 6:
                return None
            return {
                "val": t.val,
                "left": ser(getattr(t, "left", None), depth + 1),
                "right": ser(getattr(t, "right", None), depth + 1),
            }

        return {"TreeNode": ser(v)}
  # 그 외에는 그냥 문자열로 반환
  try:
      return repr(v)
  except Exception:
      return "<unrepr>"
  
  # 실제 실행 추적을 담당하는 메인 함수
def run_with_trace(src: str, entry: str | None = None, args: dict | None = None) :
    args = args or {}
    events = [] # list to store the event at each step
    start = time.time()
    steps = 0
  
    # sys.settrace 에 넘길 tracer 콜백 함수
    def tracer(frame, event, arg):
      nonlocal steps
      # 우리가 관심 있는 이벤트만 필터링
      if event not in ("call", "line", "return", "exception"):
        return tracer
      
      steps += 1
      if steps > MAX_STEPS:
          raise RuntimeError("trace limit exceeded")
      if time.time() - start > MAX_SECONDS:
          raise RuntimeError("time limit exceeded")

      # 현재 함수의 지역 변수들 (locals) 가져오기
      locals_clean = {
          k: _pretty(v)
          for k, v in frame.f_locals.items()
          if not k.startswith("__")  # 내부 변수는 제외
      }    
      rec = {
        "event": event,                      # ex) "line", "call", "return"
        "func": frame.f_code.co_name,        # 실행 중인 함수 이름
        "line": frame.f_lineno,              # 실행 중인 코드 줄 번호
        "locals": locals_clean, 
      }

      # 리턴 이벤트나 예외 이벤트일 경우 추가 정보 기록
      if event == "return":
        rec["return"] = _pretty(arg)
      if event == "exception":
        rec["exception"] = repr(arg[1])
      
      events.append(rec)

      return tracer
    
    code = compile(src, "<user>", "exec")
    g = {"__name__" : "__main__"} # global env

    sys.settrace(tracer) # start tracing 
    try:
        exec(code, g, g)  # 코드 실행 (함수 정의 등)
        res = None
        # entry 함수가 지정되어 있으면 실행
        if entry:
            fn = g.get(entry)
            if not fn:
                raise ValueError(f"entry `{entry}` not found")
            res = fn(**(args or {}))
        return {"ok": True, "result": _pretty(res), "events": events}
    except Exception as e:
          # 오류가 나면 ok=False로 반환
        return {"ok": False, "error": repr(e), "events": events}
    finally:
        # 꼭 추적 종료
        sys.settrace(None)



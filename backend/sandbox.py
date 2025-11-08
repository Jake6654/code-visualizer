# 사용할 수 있는 안전한 내장함수들
SAFE_BUILTINS = {
    "abs": abs,
    "min": min,
    "max": max,
    "range": range,
    "len": len,
    "enumerate": enumerate,
    "sum": sum,
    "print": print,
}

# 절대 포함되면 안 되는 위험한 키워드들
FORBIDDEN = {
    "__import__",
    "open",
    "exec",
    "eval",
    "compile",
    "input",
    "os",
    "sys",
    "subprocess",
    "shutil",
    "pathlib",
    "requests",
}

# 코드 문자열에 위험한 단어가 포함되어 있는지 검사하는 함수
def is_code_safe(src: str) -> bool:
    low = src.lower()
    # 하나라도 포함되어 있으면 False
    return not any(x in low for x in FORBIDDEN)

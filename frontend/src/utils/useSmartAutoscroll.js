import { useRef, useLayoutEffect } from 'react';

export function useSmartAutoscroll(dep) {
  const ref = useRef(null);
  // 이전 scrollHeight 값을 저장하기 위한 ref
  const prevScrollHeightRef = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { scrollHeight, scrollTop, clientHeight } = element;
    
    // 이전 scrollHeight 값을 가져옴
    const prevScrollHeight = prevScrollHeightRef.current;
    
    // 현재 scrollHeight를 다음 렌더링을 위해 저장
    prevScrollHeightRef.current = scrollHeight;

    // 1. 처음 렌더링될 때 (prevScrollHeight가 null일 때)는 무조건 맨 아래로 스크롤
    // 2. 새로운 메시지가 추가되기 전, 사용자가 맨 아래에 있었을 경우에만 맨 아래로 스크롤
    //    (scrollTop + clientHeight >= prevScrollHeight - 10) -> 오차범위 10px
    if (prevScrollHeight === null || scrollTop + clientHeight >= prevScrollHeight - 10) {
      element.scrollTop = scrollHeight;
    }
  }, [dep]); // 의존성 배열(messages)이 변경될 때마다 실행

  return ref;
}
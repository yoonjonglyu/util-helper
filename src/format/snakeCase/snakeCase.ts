function snakeCase(input: string = ''): string {
  return input
    .toLowerCase()
    .replace(/[-_\W]+/g, ' ') // ✅ 하이픈, 언더스코어, 특수문자 전부 공백으로 통일
    .trim() // ✅ 앞뒤 공백 제거
    .replace(/\s+/g, '_'); // ✅ 남은 공백을 언더스코어로 변환
}

export default snakeCase;

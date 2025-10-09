function pascalCase(input: string = ''): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[-_\W]+/g, ' ') // ✅ 하이픈, 언더스코어, 특수문자 전부 공백으로 통일
    .replace(/\s+(.)(\w*)/g, (_$1, $2, $3) => $2.toUpperCase() + $3)
    .replace(/\s/g, '') // ✅ 남은 공백 제거
    .replace(/^\w/, (s) => s.toUpperCase()); // ✅ 첫 글자 대문자
}

export default pascalCase;
const USER_ID_KEY = 'userId';

// 로그인 응답으로 받은 userId를 브라우저에 저장해요. 새로 고침해도 남아 있어요.
export const setUserId = (userId: number) => {
  localStorage.setItem(USER_ID_KEY, String(userId));
};

// 저장된 userId가 없으면 null이에요.
export const getUserId = () => {
  const userId = localStorage.getItem(USER_ID_KEY);

  return userId === null ? null : Number(userId);
};

export const clearUserId = () => {
  localStorage.removeItem(USER_ID_KEY);
};
